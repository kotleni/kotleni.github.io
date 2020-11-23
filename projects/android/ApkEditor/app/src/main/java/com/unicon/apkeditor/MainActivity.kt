package com.unicon.apkeditor

import android.Manifest
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import brut.androlib.ApkDecoder
import brut.androlib.err.OutDirExistsException
import com.unicon.ApkBackup
import com.unicon.ThreadPoolCallback
import com.unicon.ui.TheadProgressDialog
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File


class MainActivity : AppCompatActivity() {

    var activity: MainActivity = this
    var packages : List<ApplicationInfo>? = null
    var dialog: TheadProgressDialog? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        ActivityCompat.requestPermissions(this,
            arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE),
            1);
    }

    override fun onStart() {
        super.onStart()
        dialog = TheadProgressDialog(this, object: ThreadPoolCallback {
            override fun onStart() {
                dialog!!.setText("Получение списка приложений")
                val pm = packageManager
                packages = pm.getInstalledApplications(PackageManager.GET_META_DATA)
            }

            override fun onEnd() {
                appList.adapter = AppsListAdapter(activity, packages!!)
                dialog!!.dismiss()
            }

        })

        dialog!!.show()

        appList.setOnItemClickListener(object : AdapterView.OnItemClickListener{
            override fun onItemClick(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                openApp(position)
            }
        })
    }

    fun openApp(i: Int){
        var item = packages!!.get(i)
        dialog = TheadProgressDialog(this, object: ThreadPoolCallback {
            override fun onStart() {
                dialog!!.setText("Получение APK")
                var apkPath = ApkBackup.getByPackageName(activity.applicationContext, item.packageName, "/sdcard/")

                dialog!!.setText("Декодирование")
                val decoder = ApkDecoder()
                decoder.setOutDir(File("/sdcard/test/"))
                decoder.setApkFile(File(apkPath))

                try {
                    decoder.decode();
                } catch (ex: OutDirExistsException) {
                    dialog!!.setText(ex.toString())
                }

                dialog!!.setText("OK")
                decoder.close()

            }

            override fun onEnd() {
                //dialog!!.dismiss()
            }

        })

        dialog!!.show()
    }


}
