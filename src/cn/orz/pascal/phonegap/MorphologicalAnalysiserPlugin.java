package cn.orz.pascal.phonegap;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.apache.cordova.api.Plugin;

public class MorphologicalAnalysiserPlugin extends Plugin {
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
	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		MorphologicalAnalysiser analysiser = new MorphologicalAnalysiser();
		if ("analyse".equals(action)) {
			try {
				final String text = args.getString(0);
				List<Map<String, String>> morphemes = analysiser.analyse(text);
				return new PluginResult(PluginResult.Status.OK,
						toJSON(morphemes));

			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		// Invalid action
		String result = "Unknown action: " + action;
		return new PluginResult(PluginResult.Status.INVALID_ACTION, result);
	}

	private JSONArray toJSON(List<Map<String, String>> morphemes)
			throws JSONException {
		JSONArray jsons = new JSONArray();
		for (Map<String, String> morpheme : morphemes) {
			JSONObject json = new JSONObject();
			for (Entry<String, String> item : morpheme.entrySet()) {
				json.put(item.getKey(), item.getValue());
			}
			jsons.put(json);
		}
		return jsons;
	}

}
