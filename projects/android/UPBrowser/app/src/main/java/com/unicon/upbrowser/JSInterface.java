package com.unicon.upbrowser;
import android.webkit.*;
import android.widget.*;

public class JSInterface{
	MainActivity main;
	
	public JSInterface(MainActivity m){
		this.main = m;
	}
	
	@JavascriptInterface
	public void toast(String str){
		Toast.makeText(main.getApplicationContext(), str, Toast.LENGTH_SHORT).show();
	}
	
}
