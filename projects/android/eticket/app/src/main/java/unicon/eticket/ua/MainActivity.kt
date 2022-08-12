package unicon.eticket.ua

import android.app.PendingIntent
import android.app.ProgressDialog
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.IsoDep
import android.nfc.tech.NfcA
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.afollestad.materialdialogs.LayoutMode
import com.afollestad.materialdialogs.MaterialDialog
import com.afollestad.materialdialogs.bottomsheets.BottomSheet
import com.afollestad.materialdialogs.customview.customView
import com.afollestad.materialdialogs.customview.getCustomView
import org.w3c.dom.Text
import kotlin.concurrent.thread


class MainActivity : AppCompatActivity() {
    private var materialDialog: MaterialDialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onResume() {
        val pendingIntent = PendingIntent.getActivity(
                this,
                0,
                Intent(this, javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
                0
        )
        NfcAdapter.getDefaultAdapter(this)
                .enableForegroundDispatch(this, pendingIntent, null, null)

        super.onResume()
    }

    override fun onPause() {
        NfcAdapter.getDefaultAdapter(this).disableForegroundDispatch(this)

        super.onPause()
    }

    override fun onNewIntent(intent: Intent?) {
        if(intent == null) return
        if(NfcAdapter.ACTION_TAG_DISCOVERED != intent.action
                && NfcAdapter.ACTION_NDEF_DISCOVERED != intent.action) return
        if(materialDialog != null) materialDialog!!.hide()

        val tag: Tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)!!
        if(tag.id.toHexString().length != 14) return

        val eticketCard = EticketCard.fromTag(tag)
        if(eticketCard != null) {
            materialDialog = MaterialDialog(this, BottomSheet(LayoutMode.WRAP_CONTENT)).show {
                customView(R.layout.dialog_card)

                getCustomView().findViewById<TextView>(R.id.card_number).text = formatNumber(eticketCard.id.toHexString())
                getCustomView().findViewById<TextView>(R.id.key).text = eticketCard.key.toHexString()
            }
        } else {
            Toast.makeText(this, "Это не Eticket!", Toast.LENGTH_SHORT).show()
        }

        super.onNewIntent(intent)
    }


}