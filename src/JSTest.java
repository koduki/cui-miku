import sun.org.mozilla.javascript.internal.Context;
import sun.org.mozilla.javascript.internal.Function;
import sun.org.mozilla.javascript.internal.Scriptable;

public class JSTest {

	public static void main(String[] args) throws Exception {

		Context context = Context.enter();

		try {
			Scriptable scope = context.initStandardObjects();
			context.evaluateString(scope,
					"function helloworld(arg){return 'hello ' + arg;}",
					"<cmd>", 1, null);

			Object fObj = scope.get("helloworld", scope);

			if (!(fObj instanceof Function)) {
				System.out.println("f is undefined or not a function.");
			} else {
				Object functionArgs[] = { "world" };
				Function f = (Function) fObj;
				Object result = f.call(context, scope, scope, functionArgs);
				String report = "helloworld('world') = "
						+ Context.toString(result);
				System.out.println(report);
			}

		} catch (Exception e) {
			throw e;
		}
	}
}