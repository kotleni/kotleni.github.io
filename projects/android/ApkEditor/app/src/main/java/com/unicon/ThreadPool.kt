package com.unicon

import android.os.Handler
import android.os.Looper

object ThreadPool {
    @kotlin.jvm.JvmStatic
    public fun new(callback: ThreadPoolCallback) {
        Thread(Runnable {
            callback!!.onStart()
            Handler(Looper.getMainLooper()).post {
                callback!!.onEnd()
            }
        }).start()
    }
}