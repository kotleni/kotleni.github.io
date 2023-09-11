const SENS_BOOST = 799;

var keyInput, sensInput;
var genBtn, commandText, tipText;

var onGeneratePressed = function() {
    var key = keyInput.value;
    var sens = sensInput.value;
    var rotValue = SENS_BOOST * sens;

    commandText.innerText = "bind " + key + " \"yaw " + rotValue + " 1 1\"";
    commandText.style.display = "block";
    tipText.innerText = "Enter this command to CS2 console:";
}

onload = function() {
    keyInput = this.document.getElementById("key");
    sensInput = this.document.getElementById("sens");
    genBtn = this.document.getElementById("generate");
    commandText = this.document.getElementById("command");
    tipText = this.document.getElementById("tip");

    genBtn.onclick = onGeneratePressed;
}