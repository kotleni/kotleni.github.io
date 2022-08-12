package java.lang;

import java.io.PrintStream;

public class System {
    //public static final InputStream in = null;
    public static final PrintStream out = new PrintStream();
    //public static final PrintStream err = null;

    // NATIVE
    public static native long currentTimeMillis();
} 