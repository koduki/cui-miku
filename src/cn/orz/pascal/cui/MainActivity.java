package cn.orz.pascal.cui;

import org.apache.cordova.DroidGap;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends DroidGap {
	private boolean isResumed;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		Log.d("COLAS", "onCreate");

		super.onCreate(savedInstanceState);

		this.isResumed = false;
		Intent intent = new Intent(MainActivity.this, EventService.class);
		startService(intent);

		super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	protected void onNewIntent(Intent intent) {
		Log.d("COLAS", "onNewIntent(" + this.isResumed + ")");

		super.onNewIntent(intent);
		setIntent(intent);
		// now getIntent() should always return the last received intent
	}

	@Override
	protected void onResume() {
		super.onResume();

		Intent intent = this.getIntent();
		String result = intent.getStringExtra("event-result");
		Log.d("COLAS", "onResume(" + result + ")");
		if (result != null && !result.equals("")) {
			super.loadUrl("javascript:alert('" + result + "')");
			intent.putExtra("event-result", "");
		}
	}

}