package unicon.code.widget

import android.app.Activity
import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Rect
import android.text.Editable
import android.text.Layout
import android.text.Spannable
import android.text.TextWatcher
import android.text.style.ForegroundColorSpan
import android.util.AttributeSet
import androidx.appcompat.widget.AppCompatEditText
import unicon.code.CURRENT_LINE_COLOR
import unicon.code.LINE_NUMBER_COLOR
import unicon.code.other.HighlightSystem
import unicon.code.other.SyntaxHighlightSpan
import unicon.code.plugin.CodeRegex
import unicon.code.plugin.Plugin
import java.io.File
import java.nio.charset.Charset
import java.util.regex.Pattern

class CodeEditor(context: Context, var attrs: AttributeSet) : AppCompatEditText(context, attrs) {
    private val highlightPaint = Paint()
    private val dPaint = Paint()

    private val currentLineColor = Color.parseColor(CURRENT_LINE_COLOR)
    private val lineNumberColor = Color.parseColor(LINE_NUMBER_COLOR)

    private var currentFile: File? = null
    private var savedBuffer = ""

    private var openFileListener: ((file: File) -> Unit)? = null
    private var saveFileListener: ((file: File) -> Unit)? = null
    private val textWatcher = object: TextWatcher {
        override fun afterTextChanged(s: Editable?) {
            if(s != null)
                if(regexs != null)
                    highlightSystem.runTask(s!!)
        }

        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
            highlightSystem.cancelTask()
        }

        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) { }

    }

    var currentPlugin: Plugin? = null

    // подстветка
    private var regexs: ArrayList<CodeRegex>? = null
    private var spans: ArrayList<SyntaxHighlightSpan>? = null
    private var highlightSystem = HighlightSystem()

    init {
        setHorizontallyScrolling(true)

        highlightPaint.color = currentLineColor

        dPaint.textSize = textSize
        dPaint.color = lineNumberColor

        addTextChangedListener(textWatcher)

        highlightSystem.setOnSpansListener {
            (context as Activity).runOnUiThread {
                updateHightlight(it)
            }
        }
    }

    override fun onDraw(canvas: Canvas?) {
        val line = getCurrentLine()
        highlightLine(line, canvas!!)

        for (i in 0 until lineCount) {
            val baseline = getLineBounds(i, null)
            val num = (i + 1).toString()

            canvas.drawText(num, (10 + scrollX).toFloat(), baseline.toFloat(), dPaint)
        }

        val x = scrollX + compoundPaddingLeft - 10
        val y = Math.max(
            lineHeight * lineCount,
            height
        ) + extendedPaddingBottom
        canvas.drawLine(x.toFloat(), 0f, x.toFloat(), y.toFloat(), dPaint)

        super.onDraw(canvas)
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        if(spans != null) updateHightlight(spans!!)
    }

    override fun onScrollChanged(horiz: Int, vert: Int, oldHoriz: Int, oldVert: Int) {
        super.onScrollChanged(horiz, vert, oldHoriz, oldVert)
        if(spans != null) updateHightlight(spans!!)
    }

    override fun getCompoundPaddingLeft(): Int {
        val offset = (textSize / 1.5).toInt()
        return lineCount.toString().length * offset + offset
    }

    fun updatePlugin(pl: Plugin?) {
        println("currentPlugin set to $pl")

        if(pl != null) {
            currentPlugin = pl
            regexs = pl.regexs
            //println("KW $keywords")

            highlightSystem.updatePattern(regexs!!)
        } else {
            currentPlugin = null
            regexs = null
        }
    }

    private fun updateHightlight(spans: ArrayList<SyntaxHighlightSpan>) {
        this.spans = spans.clone() as ArrayList<SyntaxHighlightSpan>

        val textSpans = text!!.getSpans<SyntaxHighlightSpan>(0, text!!.length, SyntaxHighlightSpan::class.java)
        for (span in textSpans) {
            text!!.removeSpan(span)
        }

        val topVisibleLine = getTopVisibleLine()
        val bottomVisibleLine = getBottomVisibleLine()
        val lineStart = layout.getLineStart(topVisibleLine)
        val lineEnd = layout.getLineEnd(bottomVisibleLine)

        for (span in this.spans!!) {
            val isInText = span.start >= 0 && span.end <= text!!.length
            val isValid = span.start <= span.end
            val isVisible = span.start in lineStart..lineEnd
                    || span.start <= lineEnd && span.end >= lineStart
            if (isInText && isValid && isVisible) {
                text!!.setSpan(
                        span,
                        if (span.start < lineStart) lineStart else span.start,
                        if (span.end > lineEnd) lineEnd else span.end,
                        Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
                )
            }
        }
    }

    /* установить текст без события */
    fun processText(newText: String) {
        removeTextChangedListener(textWatcher)
        // undoStack.clear()
        setText(newText)
        addTextChangedListener(textWatcher)
    }

    private fun highlightLine(line: Int, canvas: Canvas) {
        val lineBounds = Rect()
        getLineBounds(line, lineBounds)
        lineBounds.left = 0
        canvas.drawRect(lineBounds, highlightPaint)
    }

    private fun getTopVisibleLine(): Int {
        if (lineHeight == 0) {
            return 0
        }
        val line = scrollY / lineHeight
        if (line < 0) {
            return 0
        }
        return if (line >= lineCount) {
            lineCount - 1
        } else line
    }

    private fun getBottomVisibleLine(): Int {
        if (lineHeight == 0) {
            return 0
        }
        val line = getTopVisibleLine() + height / lineHeight + 1
        if (line < 0) {
            return 0
        }
        return if (line >= lineCount) {
            lineCount - 1
        } else line
    }

    private fun getCurrentLine(): Int {
        val l: Layout? = layout
        return l?.getLineForOffset(selectionStart) ?: -1
    }

    fun setOnOpenFileListener(lam: (file: File) -> Unit) {
        openFileListener = lam
    }

    fun setOnSaveFileListener(lam: (file: File) -> Unit) {
        saveFileListener = lam
    }

    /* открыть файл */
    fun openFile(file: File) {
        currentFile = file

        if(openFileListener != null)
            openFileListener!!.invoke(file)

        if(file.exists()) {
            val content = file.readText(Charset.defaultCharset())

            savedBuffer = content
            setText(content)
        }
    }

    // закрыть файл
    fun closeFile() {
        currentFile = null
        savedBuffer = ""

        setText("")
    }

    // сохранить файл, в ответ возращает результат
    fun saveFile(): Boolean {
        if(currentFile != null) {
            if(saveFileListener != null) saveFileListener!!(currentFile!!)

            currentFile!!.writeText(text.toString(), Charset.defaultCharset())
            savedBuffer = text.toString()

            return true
        }

        return false
    }

    // проверить сохранены ли изменения
    fun isSaved(): Boolean {
        return savedBuffer == text.toString()
    }

    /* получить текущий файл */
    fun getCurrentFile(): File? {
        return currentFile
    }
}