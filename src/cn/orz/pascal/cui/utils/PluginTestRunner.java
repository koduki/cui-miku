package cn.orz.pascal.cui.utils;

import java.io.FileNotFoundException;
import java.io.FileReader;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class PluginTestRunner {
	ScriptEngineManager manager = new ScriptEngineManager();
	ScriptEngine engine = manager.getEngineByName("JavaScript");

	public static void main(String[] args) throws Exception {
		new PluginTestRunner().run(args);
	}

	public void run(String[] args) throws Exception {
		if (engine != null) {
			try {
				this.engine.put("PluginTestRunner", this);
				this.engine
						.eval("function load(filename) { PluginTestRunner.load(filename); }");

				engine.eval(new FileReader(args[0]));
			} catch (ScriptException e) {
				e.printStackTrace();
			}
		}
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
