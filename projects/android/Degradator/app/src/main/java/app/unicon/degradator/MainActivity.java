package app.unicon.degradator;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Updater upd = new Updater(new UpdaterListener() {
            @Override
            public void onUpdated() {

            }

            @Override
            public void onFailed() {

            }
        });
    }
}
