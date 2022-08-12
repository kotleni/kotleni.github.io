package unicon.code.dialog

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.media.Image
import android.view.*
import android.widget.ImageView
import android.widget.TextView
import unicon.code.R
import unicon.code.loop


class SplashDialog(var act: Activity) : Dialog(act, R.style.SplashDialog) {
    private lateinit var appicon: ImageView
    private lateinit var title: TextView

    init {
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        setCancelable(false)

        val customLayout: View = layoutInflater.inflate(R.layout.dialog_splash, null)
        setContentView(customLayout)

        val wlp = window!!.attributes
        wlp.gravity = Gravity.CENTER
        wlp.flags = wlp.flags and WindowManager.LayoutParams.FLAG_BLUR_BEHIND.inv()
        window!!.attributes = wlp

        window!!.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT)

        customLayout.setBackgroundColor(Color.WHITE)
        appicon = customLayout.findViewById(R.id.appicon)
        title = customLayout.findViewById(R.id.title)
    }

    fun animate() {
        loop {
            act.runOnUiThread {
                appicon.rotation = 0f
                appicon.animate().also {
                    it.duration = 700
                    it.rotation(360f)

                    it.start()
                }
            }

            Thread.sleep(1500)
        }

        appicon.animate().also {
            it.duration = 700
            it.scaleX(1f)
            it.scaleY(1f)

            it.start()
        }
    }

    fun setProgressMessage(str: String) {
        title.text = str
    }
}