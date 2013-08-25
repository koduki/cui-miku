package cn.orz.pascal.phonegap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.reduls.sanmoku.FeatureEx;
import net.reduls.sanmoku.Morpheme;
import net.reduls.sanmoku.Tagger;

public class MorphologicalAnalysiser {

	public List<Map<String, String>> analyse(final String text) {
		List<Map<String, String>> morphemes = new ArrayList<Map<String, String>>();
		for (Morpheme m : Tagger.parse(text)) {
			FeatureEx fe = new FeatureEx(m);
			Map<String, String> morpheme = new HashMap<String, String>();

			morpheme.put("feature", m.feature);
			morpheme.put("surface", m.surface);
			morpheme.put("baseform", fe.baseform);
			morpheme.put("reading", fe.reading);
			morpheme.put("pronunciation", fe.pronunciation);

			morphemes.add(morpheme);
		}
		return morphemes;
	}
}
