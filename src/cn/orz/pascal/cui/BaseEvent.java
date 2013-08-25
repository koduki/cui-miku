package cn.orz.pascal.cui;

import android.util.Log;

public abstract class BaseEvent {

	boolean isNotDone = true;

	public BaseEvent() {
		super();
	}

	public String executeTask() {
		Log.d("COLAS", "execute event");
		boolean isRunnable = this.isRunnable();
		if (isRunnable) {
			if (isNotDone) {
				isNotDone = false;
				return execute();
			}
		} else if (isNotDone == false) {
			isNotDone = true;
			Log.d("COLAS", "reset event");
		}
		return null;
	}

	abstract String execute();

	abstract boolean isRunnable();
}