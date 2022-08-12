package unicon.code.widget

import android.content.Context
import android.util.AttributeSet
import android.view.MotionEvent
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import unicon.code.adapter.FileMangerAdapter
import java.io.File

class FileManagerView(context: Context, var attrs: AttributeSet) : RecyclerView(context, attrs) {
    private var openFileListener: ((file: File) -> Unit)? = null
    private var changeDirListener: ((dir: File) -> Unit)? = null

    init {
        layoutManager = LinearLayoutManager(context)
        adapter = FileMangerAdapter(this)
    }

    fun getFileManagerAdapter() : FileMangerAdapter {
        return (adapter as FileMangerAdapter)
    }

    fun onItemClick(pos: Int) {
        val file = getFileManagerAdapter().getItem(pos)

        if(file.isDirectory)
            openDir(file)

        if(file.isFile && openFileListener != null)
            openFileListener!!.invoke(file)
    }

    fun onChangeDir(dir: File) {
        if(changeDirListener != null) changeDirListener!!.invoke(dir)
    }

    fun getCurrentDir() : File {
        return getFileManagerAdapter().currentDir
    }

    fun openDir(path: File) {
        getFileManagerAdapter().openDir(path)
    }

    fun reopen() {
        openDir(getFileManagerAdapter().currentDir)
    }

    fun prevDir() {
        getFileManagerAdapter().prevDir()
    }

    fun setOnOpenFileListener(lam: (file: File) -> Unit) {
        openFileListener = lam
    }

    fun setOnChangeDirListener(lam: (dir: File) -> Unit) {
        changeDirListener = lam
    }
}