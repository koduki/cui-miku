package cn.orz.pascal.cui;

import java.util.ArrayList;
import java.util.List;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

public class EventService extends Service {
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
					event.executeTask();
				}
			}
		}
	};

}
