package cn.orz.pascal.cui;

import java.util.ArrayList;
import java.util.List;

import android.app.Service;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.IBinder;
import android.util.Log;

public class EventService extends Service {
	 EventOpenHelper helper;
	 SQLiteDatabase db;

	public EventService() {

	}

	@Override
	public IBinder onBind(Intent intent) {
		// TODO: Return the communication channel to the service.
		throw new UnsupportedOperationException("Not yet implemented");
	}

	@Override
	public void onStart(Intent intent, int startId) {
		super.onStart(intent, startId);

		Log.d("COLAS", "サービスが起動しました。");
		
		this.helper = new EventOpenHelper(this);
		this.db = helper.getReadableDatabase();
		
		Thread eventTimer = new Thread(null, eventTimerThread, "BYTimerService");
		eventTimer.start();
	}

	private Runnable eventTimerThread = new Runnable() {
		@Override
		public void run() {
			List<BaseEvent> events = new ArrayList<BaseEvent>();
			events.add(new TimerEvent());

			while (true) {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				for (BaseEvent event : events) {
						Cursor c = db.query("EVENT", new String[] { "time" }, null, null, null, null, null);
						c.moveToFirst();
						String time = c.getString(0);
						Log.d("COLAS", time);

					event.executeTask();
				}
			}
		}
	};

}
