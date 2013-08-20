package cn.orz.pascal.cui;

import android.util.Log;

public abstract class BaseEvent {

	boolean isNotDone = true;

	public BaseEvent() {
		super();
	}

	public void executeTask() {
		Log.d("COLAS", "execute event");
		boolean isRunnable = this.isRunnable();
		if (isRunnable) {
			if (isNotDone) {
				isNotDone = false;
				execute();
			}
		} else if (isNotDone == false) {
			isNotDone = true;
			Log.d("COLAS", "reset event");
		}
	}

	abstract void execute();

	abstract boolean isRunnable();
}