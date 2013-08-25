package cn.orz.pascal.cui;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Config {
	private Map<String, String> data;

	public static Config load(String input) {
		Config config = new Config();
		config.data = new HashMap<String, String>();
		String[] lines = input.split("\n");

		for (String line : lines) {
			if (line.isEmpty()) {
				continue;
			}
			String[] values = line.split("\t");
			config.data.put(values[0], values[1]);
		}
		return config;
	}

	public static Config load(File input) throws IOException {
		StringBuilder sb = new StringBuilder();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(input));
			for (String line = br.readLine(); line != null; line = br
					.readLine()) {
				sb.append(line + "\n");
			}
		} finally {
			br.close();
		}
		return load(sb.toString());
	}

	public String get(String key) {
		return data.get(key);
	}
}
