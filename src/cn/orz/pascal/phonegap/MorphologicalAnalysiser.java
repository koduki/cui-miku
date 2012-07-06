package cn.orz.pascal.phonegap;

import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.view.Gravity;
import android.widget.Toast;

import cn.orz.pascal.cui.MainActivity;

import com.phonegap.api.Plugin;

public class MorphologicalAnalysiser extends Plugin {

	/**
	 * Executes the request and returns PluginResult.
	 * 
	 * @param action
	 *            The action to execute.
	 * @param args
	 *            JSONArry of arguments for the plugin.
	 * @param callbackId
	 *            The callback id used when calling back into JavaScript.
	 * @return A PluginResult object with a status and message.
	 */
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		final MainActivity c = (MainActivity) this.ctx;
		final String message = action;
		JSONObject result = new JSONObject();
		try {
			result.put("id", 1);
			result.put("message", "hello");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return new PluginResult(PluginResult.Status.OK, result);
	}

}
