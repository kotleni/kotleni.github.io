package unicon.code.plugin

import android.graphics.Color
import com.squareup.duktape.Duktape
import java.io.File
import java.util.regex.Pattern

class Plugin(val name: String, val file: File, var isLoaded: Boolean, var error: String, val duktape: Duktape) {
    val regexs = ArrayList<CodeRegex>()

    fun initPlugin() {
        duktape.evaluate("initPlugin();")
    }

    fun openFile(file: File) : Boolean {
        return (duktape.evaluate("openFile('${file.path}');") as Boolean)
    }

    fun initRegex(rstr: String, color: String, cutStart: Int, cutEnd: Int) {
        regexs.add(CodeRegex(Pattern.compile(rstr), Color.parseColor(color), cutStart, cutEnd))
    }

    override fun toString(): String {
        return name
    }
}