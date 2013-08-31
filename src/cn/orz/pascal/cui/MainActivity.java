package cn.orz.pascal.cui;

import org.apache.cordova.DroidGap;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends DroidGap {
	IntentFilter intentFilter;
	EventBroadcastReceiver receiver;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		if (this.receiver == null) {
			receiver = new EventBroadcastReceiver();
			receiver.mainActivity = this;
			intentFilter = new IntentFilter();
			intentFilter.addAction("MY_ACTION");
			registerReceiver(receiver, intentFilter);

			Intent intent = new Intent(MainActivity.this, EventService.class);
			startService(intent);
		}
		super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	protected void onResume() {
		super.onResume();
		Log.d("COLAS", "onResume ");
		Intent intent = this.getIntent();
		String result = intent.getStringExtra("event-result");
		if (result != null) {
			super.loadUrl("javascript:alert('" + result + "')");
		}
	}

	@Override
	protected void onPause() {
		// TODO Auto-generated method stub
		super.onPause();
		unregisterReceiver(receiver);
	}

}