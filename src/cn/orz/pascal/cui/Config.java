package cn.orz.pascal.cui;

import java.util.HashMap;
import java.util.Map;

public class Config {
	private Map<String, String> data;

	public static Config load(String input) {
		Config config = new Config();
		config.data = new HashMap<String, String>();
		String[] lines = input.split("\n");

		for (String line : lines) {
			String[] values = line.split("\t");
			config.data.put(values[0], values[1]);
		}
		return config;
	}

	public String get(String key) {
		return data.get(key);
	}
}
