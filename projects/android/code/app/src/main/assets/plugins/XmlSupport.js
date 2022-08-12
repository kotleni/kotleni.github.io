function initPlugin() {
    API.initRegex("(<(.*?)>||<(.*?) |<(.*?)/>)", "#0098d5", 0, 0);
    API.initRegex("(<!--(.*?)|(.*?)-->)", "#656e77", 0, 0);
}

function openFile(path) {
    return path.endsWith(".xml");
}