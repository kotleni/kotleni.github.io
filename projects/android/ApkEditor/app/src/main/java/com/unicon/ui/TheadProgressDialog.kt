package com.unicon.ui

import android.content.Context
import android.os.Handler
import android.os.Looper
import android.view.View
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.unicon.ThreadPool
import com.unicon.ThreadPoolCallback
import com.unicon.apkeditor.R
import kotlinx.android.synthetic.main.thread_progressdialog.view.*


class TheadProgressDialog(context: Context, callback: ThreadPoolCallback) {
    var bsd: BottomSheetDialog = BottomSheetDialog(context)
    var infla: View = bsd.layoutInflater.inflate(R.layout.thread_progressdialog, null)

    var callback_: ThreadPoolCallback = callback

    fun show(){
        bsd.setCancelable(false)
        bsd.setContentView(infla)
        bsd.show()

        ThreadPool.new( callback_ )
    }

    fun hide(){
        bsd.hide()
    }

    fun dismiss(){
        bsd.dismiss()
    }

    fun setText(text: String){
        Handler(Looper.getMainLooper()).post {
            infla.message.text = text
        }
    }
}