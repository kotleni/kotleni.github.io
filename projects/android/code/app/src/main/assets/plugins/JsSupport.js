function initPlugin() {
    API.initRegex("(function (.*)\\()", "#0098d5", 8, 1);
    API.initRegex("\\/\\*((.|\n)*?)\\*\\/", "#656e77", 0, 0);
    API.initRegex("(\\/\\/(.*)\\b)", "#656e77", 0, 0);
    API.initRegex("\\b(function|var|this|if|else|break|case|try|catch|while|return|switch)\\b", "#cc7832", 0, 0);
}

function openFile(path) {
    return path.endsWith(".js");
}