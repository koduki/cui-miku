package cn.orz.pascal.cui;

import org.apache.cordova.DroidGap;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

public class MainActivity extends DroidGap {
	IntentFilter intentFilter;
	EventBroadcastReceiver receiver;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		receiver = new EventBroadcastReceiver();
		receiver.mainActivity = this;
		intentFilter = new IntentFilter();
		intentFilter.addAction("MY_ACTION");
		registerReceiver(receiver, intentFilter);

		Intent intent = new Intent(MainActivity.this, EventService.class);
		startService(intent);

		super.loadUrl("file:///android_asset/www/index.html");
	}

}