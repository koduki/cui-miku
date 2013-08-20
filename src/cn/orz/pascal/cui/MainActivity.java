package cn.orz.pascal.cui;

import org.apache.cordova.DroidGap;

import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends DroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		Intent intent = new Intent(MainActivity.this, EventService.class);
		startService(intent);

		super.loadUrl("file:///android_asset/www/index.html");
	}

}