package cn.orz.pascal.cui;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import java.io.File;
import java.io.IOException;

import org.junit.Test;

public class ConfigTest {

	@Test
	public void testLoad1() {
		String input = "config.externalApi.googleCalendar.enable\ttrue\nconfig.etc.tts.enable\ttrue\nconfig.event.alerm.time\t01:00";
		Config config = Config.load(input);

		assertThat(config.get("config.externalApi.googleCalendar.enable"),
				is("true"));
		assertThat(config.get("config.etc.tts.enable"), is("true"));
		assertThat(config.get("config.event.alerm.time"), is("01:00"));
	}

	@Test
	public void testLoad2() {
		String input = "config.externalApi.googleCalendar.enable\ttrue\nconfig.etc.tts.enable\tfalse\nconfig.event.alerm.time\t02:00";
		Config config = Config.load(input);

		assertThat(config.get("config.externalApi.googleCalendar.enable"),
				is("true"));
		assertThat(config.get("config.etc.tts.enable"), is("false"));
		assertThat(config.get("config.event.alerm.time"), is("02:00"));
	}

	@Test
	public void testLoad3() {
		String input = "config.externalApi.googleCalendar.enable\tfalse\nconfig.etc.tts.enable\ttrue\nconfig.event.alerm.time\t01:00";
		Config config = Config.load(input);

		assertThat(config.get("config.externalApi.googleCalendar.enable"),
				is("false"));
		assertThat(config.get("config.etc.tts.enable"), is("true"));
		assertThat(config.get("config.event.alerm.time"), is("01:00"));
	}

	@Test
	public void testLoadFromFile1() throws Exception {
		File input = new File("./test/resoureces/config-test/config.tsv.1");
		Config config = Config.load(input);

		assertThat(config.get("config.externalApi.googleCalendar.enable"),
				is("true"));
		assertThat(config.get("config.etc.tts.enable"), is("true"));
		assertThat(config.get("config.event.alerm.time"), is("01:00"));
	}

	@Test
	public void testLoadFromFile2() throws Exception {
		File input = new File("./test/resoureces/config-test/config.tsv.2");
		Config config = Config.load(input);

		assertThat(config.get("config.externalApi.googleCalendar.enable"),
				is("false"));
		assertThat(config.get("config.etc.tts.enable"), is("false"));
		assertThat(config.get("config.event.alerm.time"), is("01:03"));
	}
}
