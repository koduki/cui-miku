package cn.orz.pascal.cui.utils;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class Result {
	String message;
	List<Map<String, String>> result;

	public Result(String message, List<Map<String, String>> result) {
		this.message = message;
		this.result = result;
	}

	public String getResult() {
		StringBuilder sb = new StringBuilder();
		sb.append("[");
		for (Map<String, String> object : this.result) {
			sb.append("{");
			for (Entry<String, String> property : object.entrySet()) {
				sb.append("'");
				sb.append(property.getKey());
				sb.append("'");

				sb.append(":");

				sb.append("'");
				sb.append(property.getValue());
				sb.append("',");
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("},");
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		return sb.toString();
	}

	public String getMessage() {
		return message;
	}
}