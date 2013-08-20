package cn.orz.pascal.cui;

import java.text.SimpleDateFormat;
import java.util.Date;

import android.util.Log;

public class TimerEvent extends BaseEvent {
	@Override
	void execute() {
		String msg = "Hello - its currently ";
		Log.d("COLAS", msg);
	}

	@Override
	boolean isRunnable() {
		SimpleDateFormat df = new SimpleDateFormat("HH:mm");
		String now = df.format(new Date(System.currentTimeMillis()));
		return "21:13".equals(now);
	}
}
