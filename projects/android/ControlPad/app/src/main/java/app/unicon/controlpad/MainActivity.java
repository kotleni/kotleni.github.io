package app.unicon.controlpad;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.app.DownloadManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.view.textclassifier.ConversationActions;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Toast;

import org.json.simple.JSONArray;
//import org.json.JSONException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    LinearLayout linear;
    LinearLayout linear2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (Build.VERSION.SDK_INT >= 23) {
            ActivityCompat.requestPermissions(MainActivity.this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                    1);
        }

        linear = findViewById(R.id.linear);
        linear2 = findViewById(R.id.linear1);


        final String json = readFile(this.getApplicationContext(), "pad.json");
        JSONArray js = null;
        try {
            js = (JSONArray) new JSONParser().parse(json);
        } catch (ParseException e) {
            Toast.makeText(this, e.toString(), Toast.LENGTH_LONG).show();}

        for(int n = 0; n < 2; n++) {
            JSONArray js2 = (JSONArray) js.get(n);
            for (int i = 0; i < js2.size(); i++) {
                JSONObject btn = (JSONObject) js2.get(i);
                final String url = (String) btn.get("url");
                ImageButton v = addButton((n==0)? linear: linear2, (long) btn.get("height"), (String) btn.get("img"));

                final MainActivity m = this;
                v.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Call(url, m);
                    }
                });
            }
        }

        // Thread

    }
    void Call(final String url, final MainActivity m){
        new Thread(new Runnable() {
            @Override
            public void run() {
                OkHttpClient client = new OkHttpClient();
                Request request = new Request.Builder()
                        .url(url)
                        .build();
                try {
                    Response response = client.newCall(request).execute();
                    //String serverAnswer = response.body().string();
                    m.runOnUiThread(new Runnable() {
                        public void run() {
                            Toast.makeText(m, "OK", Toast.LENGTH_LONG).show();
                        }
                    });

                } catch (IOException e) {
                    e.printStackTrace();

                    m.runOnUiThread(new Runnable() {
                        public void run() {
                            Toast.makeText(m, e.toString(), Toast.LENGTH_LONG).show();
                        }
                    });
                }
            }
        }).start();
    }

    ImageButton addButton(LinearLayout view, long height, String base64){
        ImageButton bt = new ImageButton(this);
        if(base64!="") {
            byte[] decodedString = Base64.decode(base64, Base64.DEFAULT);
            Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
            bt.setImageBitmap(decodedByte);
        }
        bt.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                (int)height));
        view.addView(bt);

        return bt;
    }

    public static String pathRoot = "/sdcard/";
    public static String readFile(Context contect, String nameFile) {
        String aBuffer = "";
        try {
            File myFile = new File(pathRoot + nameFile);
            FileInputStream fIn = new FileInputStream(myFile);
            BufferedReader myReader = new BufferedReader(new InputStreamReader(fIn));
            String aDataRow = "";
            while ((aDataRow = myReader.readLine()) != null) {
                aBuffer += aDataRow;
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return aBuffer;
    }
}
