package unicon.eticket.ua

import android.nfc.Tag
import android.nfc.tech.IsoDep

class EticketCard(
        var id: ByteArray, // Tag ID
        var key: ByteArray, // 0x3C00

        var magicNumber: ByteArray, // 0x60
        var magicNumber2: ByteArray, // 0x78
        var magicNumber3: ByteArray, // 0xF0
) {
    fun isVerify() : Boolean {
        return (magicNumber3[0] == (0x90).toByte())
                && (magicNumber3[1] == (0x01).toByte())
                && (magicNumber3[2] == (0x06).toByte())
                && (magicNumber3[3] == (0xa0).toByte())
                && (magicNumber3[4] == (0x07).toByte())
    }

    companion object {
        fun fromTag(tag: Tag) : EticketCard? {
            val isoDep = IsoDep.get(tag)
            if(isoDep == null) return null

            isoDep.connect()

            val key = isoDep.transceive(byteArrayOf((0x3C).toByte(), (0x00).toByte()))

            val magicNumber2 = isoDep.transceive("78".decodeHex())
            val magicNumber = isoDep.transceive("60".decodeHex())
            val magicNumber3 = isoDep.transceive("F0".decodeHex())

            isoDep.close()

            return EticketCard(tag.id, key, magicNumber, magicNumber2, magicNumber3)
        }
    }
}