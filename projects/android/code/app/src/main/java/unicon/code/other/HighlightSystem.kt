package unicon.code.other

import android.graphics.Color
import android.net.sip.SipSession
import android.text.Editable
import android.text.Spannable
import android.text.TextPaint
import android.text.style.CharacterStyle
import android.text.style.ForegroundColorSpan
import unicon.code.plugin.CodeRegex
import java.util.regex.Pattern
import kotlin.concurrent.thread

class HighlightSystem() {
    private var spansListener: ((spans: ArrayList<SyntaxHighlightSpan>) -> Unit)? = null
    private var syntaxHighlightSpans: ArrayList<SyntaxHighlightSpan> = ArrayList()

    private var regexs: ArrayList<CodeRegex>? = null
    private var state = false

    fun runTask(text: Editable) {
        if(regexs == null) return

        state = true
        syntaxHighlightSpans.clear()

        thread {
            regexs!!.forEach {
                val matcher = it.pattern.matcher(text)
                matcher.region(0, text!!.length)
                while (matcher.find() && state) {
                    syntaxHighlightSpans.add(SyntaxHighlightSpan(
                            it.color,
                            matcher.start(),
                            matcher.end()
                    ))
                }
            }

            // Thread.sleep(250)
            if(spansListener != null)
                spansListener!!.invoke(syntaxHighlightSpans)
        }

    }

    fun cancelTask() { state = false }

    fun updatePattern(_regexs: ArrayList<CodeRegex>?) {
        regexs = _regexs
    }

    fun setOnSpansListener(lam: (spans: ArrayList<SyntaxHighlightSpan>) -> Unit) {
        spansListener = lam
    }
}

data class SyntaxHighlightSpan(private val color: Int, val start: Int, val end: Int) : CharacterStyle() {
    override fun updateDrawState(textPaint: TextPaint?) {
        textPaint?.color = color
    }
}