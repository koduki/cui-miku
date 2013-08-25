package cn.orz.pascal.cui;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.util.Log;

public class TimerEvent extends BaseEvent {
	@Override
	String execute() {
		String msg = "Hello - its currently ";
		Log.d("COLAS", msg);
		return msg;
	}

	@Override
	boolean isRunnable() {
		SimpleDateFormat df = new SimpleDateFormat("HH:mm");
		String now = df.format(new Date(System.currentTimeMillis()));

		Config config;
		try {
			config = Config.load(new File("/storage/sdcard0/COLAS/config.tsv"));
			String target = config.get("config.event.alerm.time");
			Log.d("COLAS", "check event: target=" + target + ", now=" + now);
			return target.equals(now);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return false;

	}
}
