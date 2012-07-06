package cn.orz.pascal.cui.utils;

import java.io.FileNotFoundException;
import java.io.FileReader;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class PluginTester {
	ScriptEngineManager manager = new ScriptEngineManager();
	ScriptEngine engine = manager.getEngineByName("JavaScript");

	public static void main(String[] args) throws Exception {
		new PluginTester().run(args);
	}

	private void run(String[] args) throws Exception {
		if (engine != null) {
			try {
				this.engine.put("PluginTester", this);
				this.engine
						.eval("function load(filename) { PluginTester.load(filename); }");

				engine.eval(new FileReader(args[0]));
			} catch (ScriptException ex) {
				ex.printStackTrace();
			}
		}
		System.out.println("end");
	}

	public void load(String filename) throws ScriptException {
		try {
			this.engine.eval(new FileReader(filename));
		} catch (FileNotFoundException e) {
			throw new RuntimeException("Error loading javascript file: "
					+ filename, e);
		}
	}
}
