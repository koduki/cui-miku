import static org.junit.Assert.*;

import org.junit.Test;
import net.reduls.sanmoku.Tagger;
import net.reduls.sanmoku.Morpheme;
import net.reduls.sanmoku.FeatureEx; // 追加

public class MorphologicalAnalysiser {

    @Test
    public void test() {
	analyze("近くのラーメン屋を探して");
	analyze("近くにあるラーメン屋を探して");
	analyze("ラーメンが食べたい");
	analyze("ラーメン屋ある");
	analyze("近くのラーメン屋を探して");
	analyze("近くにあるラーメン屋を探して");
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
