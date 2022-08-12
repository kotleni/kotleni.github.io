package java.lang;

public interface CharSequence {
    int length();
    char charAt(int index);

    default boolean isEmpty() {
        return this.length() == 0;
    }

    CharSequence subSequence(int start, int end);

    public String toString();
}
