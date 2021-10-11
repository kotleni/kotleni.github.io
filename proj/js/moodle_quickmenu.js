var listA = document.getElementsByClassName("list-group")[0].getElementsByClassName("list-group-item list-group-item-action")
var listB = document.getElementsByClassName("dropdown-menu dropdown-menu-right menu align-tr-br")[0];

function addItemToMenu(name, url) {
	listB.innerHTML += "<a href=\"" + url + "\" class=\"dropdown-item menu-action\" role=\"menuitem\" data-title=\"logout,moodle\" aria-labelledby=\"actionmenuaction-\"><i class=\"icon fa fa-wrench fa-fa\" aria-hidden=\"true\"></i><span class=\"menu-action-text\" id=\"actionmenuaction-6\">" + name + "</span></a>";
}

for(var i = 4; i < listA.length; i++) {
	var item = listA[i];
	addItemToMenu(item.getElementsByClassName("media-body")[0].innerText, item.href);
}