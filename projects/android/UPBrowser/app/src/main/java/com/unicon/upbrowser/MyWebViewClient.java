package com.unicon.upbrowser;

import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.*;
import android.content.*;
import java.util.zip.*;
import android.view.*;
import android.widget.*;

class MyWebViewClient extends WebViewClient {

	MainActivity main;
	
	public MyWebViewClient(MainActivity m){
		this.main = m;
	}
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        Uri uri = Uri.parse(url);
        if (uri.getHost() != null && uri.getHost().contains("example.com")) {
            return false;
        }
        view.loadUrl(url);
        return true;
    }

	@Override
	public void onPageFinished(WebView view, String url)
	{
		super.onPageFinished(view, url);
		this.main.edittext.setHint(view.getTitle());
		//view.destroy();
		
		
	}
	
	

	@Override
	public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error)
	{
		view.loadUrl("file:///android_asset/error.html");
		//System.out.println(error);
		super.onReceivedError(view, request, error);
	}
	
	
	
	
}
