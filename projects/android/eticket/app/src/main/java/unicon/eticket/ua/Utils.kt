package unicon.eticket.ua

import android.app.Activity
import android.view.View
import kotlin.concurrent.thread

fun ByteArray.toHexString() : String {
    return (asUByteArray().joinToString("") { it.toString(16).padStart(2, '0') })
            .toUpperCase()
}

fun String.decodeHex(): ByteArray {
    return chunked(2)
            .map { it.toInt(16).toByte() }
            .toByteArray()
}

fun Byte.toPositiveInt() = toInt() and 0xFF

fun formatNumber(str: String) : String {
    val line = StringBuilder()

    line.append("${str[0]}${str[1]}${str[2]}${str[3]} ")
    line.append("${str[4]}${str[5]}${str[6]}${str[7]} ")
    line.append("${str[8]}${str[9]}${str[10]}${str[11]} ")
    line.append("${str[12]}${str[13]}")

    return line.toString().toUpperCase()
}