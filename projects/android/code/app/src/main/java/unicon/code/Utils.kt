package unicon.code

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.provider.MediaStore
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import androidx.core.content.IntentCompat
import unicon.code.activity.MainActivity
import kotlin.concurrent.thread


fun Activity.hideKeyboardFrom(view: View) {
    val imm: InputMethodManager = this.getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.hideSoftInputFromWindow(view.windowToken, 0)
}

fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
        }

        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
        }

        override fun afterTextChanged(editable: Editable?) {
            afterTextChanged.invoke(editable.toString())
        }
    })
}

fun loop(lam: () -> Unit) {
    thread {
        while (true) {
            lam()
        }
    }
}

fun Activity.getPath(uri: Uri): String? {
    val projection = arrayOf(MediaStore.Images.Media.DATA)
    val cursor = contentResolver.query(uri, projection, null, null, null) ?: return null
    val column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA)
    cursor.moveToFirst()
    val s = cursor.getString(column_index)
    cursor.close()
    return s
}