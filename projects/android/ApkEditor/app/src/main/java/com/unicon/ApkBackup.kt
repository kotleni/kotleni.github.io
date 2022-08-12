package com.unicon

import android.content.Context
import android.content.pm.PackageManager
import android.preference.PreferenceManager
import android.util.Log
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.nio.channels.FileChannel

object ApkBackup {
    fun getByPackageName(context: Context, packagename: String?, PATH: String) : String{
        var apkPath = ""
        val pm: PackageManager = context.getPackageManager()

        // Получить список установленных приложений
        val sharedPref = PreferenceManager.getDefaultSharedPreferences(context)
        val packages =
            pm.getInstalledApplications(PackageManager.GET_META_DATA)
        for (packageInfo in packages) {
            if (packageInfo.packageName.matches(packagename!!.toRegex())) {
                Log.d(
                    packageInfo.publicSourceDir,
                    packageInfo.packageName + "    " + PATH + packageInfo.packageName
                )
                try {
                    apkPath = PATH.toString() + packageInfo.loadLabel(context.getPackageManager())
                        .toString() + ".apk"
                    copyFile(
                        packageInfo.publicSourceDir,
                        apkPath
                    )
                } catch (e: Exception) {
                }
            }
        }

        return apkPath
    }


    fun copyFile(s: String?, d: String?) {
        val src = File(s)
        val dst = File(d)
        val inChannel: FileChannel = FileInputStream(src).getChannel()
        val outChannel: FileChannel = FileOutputStream(dst).getChannel()
        try {
            inChannel.transferTo(0, inChannel.size(), outChannel)
        } finally {
            if (inChannel != null) inChannel.close()
            if (outChannel != null) outChannel.close()
        }
    }
}