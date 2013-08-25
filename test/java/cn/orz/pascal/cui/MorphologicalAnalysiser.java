package cn.orz.pascal.cui;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.Test;
import net.reduls.sanmoku.Tagger;
import net.reduls.sanmoku.Morpheme;
import net.reduls.sanmoku.FeatureEx; // 追加

public class MorphologicalAnalysiser {
	public static void main(String[] args) {
		System.out.println("Hello World.");
		new MorphologicalAnalysiser().test();
	}

	@Test
	public void test() {
		System.out.println("Hello World.");
		analyze("近くのラーメン屋を探して");
		analyze("近くにあるラーメン屋を探して");
		analyze("近くのラーメン屋を教えて");
		analyze("近くにあるラーメン屋を教えて");
		analyze("ラーメン屋が近くにある？");
		analyze("ラーメンが食べたい");
		analyze("近くにあるラーメン屋を教えてください");
		analyze("近くにあるラーメン屋を探して欲しい");
		analyze("近くにあるラーメン屋を調べろ");
		analyze("今日はラーメンを食べた");
		analyze("近くにある美味しいラーメン屋さんを探して");
		analyze("近くのラーメン探して");
	}

	@Test
	public void test2() {
		// System.out.println(search("近くのラーメン屋を探して"));
		// String keyword = new Template().with("近く").and("探す")
		// .result(type("名詞").and("一般").and(not("接尾"))).apply();
	}

	public class Template {
		public Template with(String name) {
			return this;
		}

		public Template and(String name) {
			return this;
		}

		public Template and(Template template) {
			return this;
		}

		public Template result(Template template) {
			return this;
		}

		public String apply() {
			return "";
		}
	}

	public static Template type(String text) {
		return null;
	}

	public static Template not(String text) {
		return null;
	}

	private String search(String text) {
		boolean flag1 = false;
		boolean flag2 = false;
		String keyword = null;
		Map<String, Boolean> baseforms = new HashMap<String, Boolean>();
		baseforms.put("近く", false);
		baseforms.put("探す", false);

		Map<String, Boolean> keywordPredicate = new HashMap<String, Boolean>();
		keywordPredicate.put("名詞", true);
		keywordPredicate.put("一般", true);
		keywordPredicate.put("接尾", false);

		for (Morpheme m : Tagger.parse(text)) { // 形態素解析
			FeatureEx fe = new FeatureEx(m); // 解析結果の形態素インスタンスから、追加の素性データを取得

			if (baseforms.containsKey(fe.baseform)) {
				baseforms.put(fe.baseform, true);
			}

			keyword = applyKeyword(keywordPredicate, m);
		}

		if (flag1 && flag2 && keyword != null) {
			return keyword;
		} else {
			return null;
		}
	}

	private String applyKeyword(Map<String, Boolean> keywordPredicate,
			Morpheme m) {
		for (Entry<String, Boolean> predicate : keywordPredicate.entrySet()) {
			if ((m.feature.indexOf(predicate.getKey()) == -1) == predicate
					.getValue()) {
				return "";
			}
		}
		return m.surface;
	}

	private void analyze(String text) {
		for (Morpheme m : Tagger.parse(text)) { // 形態素解析
			FeatureEx fe = new FeatureEx(m); // 解析結果の形態素インスタンスから、追加の素性データを取得

			// 結果表示
			System.out.println(m.surface + "\t" + m.feature + "," + fe.baseform
					+ "," + fe.reading + "," + fe.pronunciation);

		}
		System.out.println("================");
	}

}
