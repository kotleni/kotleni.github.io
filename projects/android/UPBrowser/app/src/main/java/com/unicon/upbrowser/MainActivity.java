package com.unicon.upbrowser;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.*;
import android.view.View.*;
import android.view.*;

public class MainActivity extends Activity {

    WebView mWebView;
	ImageView btnback;
	ImageView btnforw;
	ImageView btnpages;
	ImageView btnreload;
	EditText edittext;
	ImageView btnhome;
	ImageView btnsearch;
	
	String homeurl = "file:///android_asset/index.html";
	String searchurl = "https://google.com/search?q=";
	//String useragent = "UPBrowser/1.0 (Android;) WebView/20100101 UPBrowserAndroid/1.0";

    //@SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
	    
        mWebView = findViewById(R.id.activity_main_webview);
        btnback = (ImageView) findViewById(R.id.btnback);
		btnforw = (ImageView) findViewById(R.id.btnforw);
		btnpages = (ImageView) findViewById(R.id.btnpages);
		btnreload = findViewById(R.id.btnreload);
		edittext = findViewById(R.id.edittext);
		btnhome = findViewById(R.id.btnhome);
		btnsearch = findViewById(R.id.btnsearch);
		
		// webview settings
		//mWebView.setWebViewClient(new WebViewClient());
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
		
		mWebView.setWebViewClient(new MyWebViewClient(this));
		mWebView.addJavascriptInterface(new JSInterface(this), "UPB");
	    mWebView.loadUrl(homeurl);
        //mWebView.getSettings().setUserAgentString(useragent);
		//mWebView.getSettings().setSupportZoom(true);
		
		
		
		
		
		
		// ...
		btnback.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View p1)
				{
					mWebView.goBack();
				}
			});
			
		btnforw.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View p1)
				{
					mWebView.goForward();
				}
			});
			
		btnpages.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View p1)
				{
					
				}
			});
			
		btnreload.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View p1)
				{
					mWebView.reload();
				}
			});
		
		btnhome.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View p1)
				{
					mWebView.loadUrl(homeurl);
				}
			});
		
		btnsearch.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View p1)
				{
					if(edittext.getText().toString().contains("http://")|| edittext.getText().toString().contains("https://")){
					mWebView.loadUrl(edittext.getText().toString());
					}else{
					mWebView.loadUrl(searchurl + edittext.getText().toString());
					}
				}
			});
			
			
			
			
			
			
        }

    @Override
    public void onBackPressed() {
        if(mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
