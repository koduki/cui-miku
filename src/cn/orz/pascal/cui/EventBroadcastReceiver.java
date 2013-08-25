package cn.orz.pascal.cui;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class EventBroadcastReceiver extends BroadcastReceiver {
	MainActivity mainActivity = null;

	@Override
	public void onReceive(Context context, Intent intent) {

		Bundle bundle = intent.getExtras();
		String message = bundle.getString("message");

		Log.d("COLAS", "onReceive! " + message);
		if (mainActivity != null) {
			Log.d("COLAS", "onReceive2");
			mainActivity.loadUrl("javascript:alert('" + message + "')");
		}

	}

}