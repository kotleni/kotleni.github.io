package app.unicon.degradator;

import java.io.IOException;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Updater {
    public String url = "";
    UpdaterListener list;
    public Updater(UpdaterListener list){
        this.list = list;
    }

    public void start(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                load();
            }
        }).start();
    }

    void load(){
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://devunicon.000webhostapp.com/test.txt")
                .build();
        try {
            Response response = client.newCall(request).execute();
            String serverAnswer = response.body().string();
            System.out.println(serverAnswer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
