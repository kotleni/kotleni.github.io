var list = document.getElementsByClassName("dropdown-menu dropdown-menu-right menu align-tr-br")[0];

function addItemToMenu(name, url) {
	list.innerHTML += "<a href=\"" + url + "\" class=\"dropdown-item menu-action\" role=\"menuitem\" data-title=\"logout,moodle\" aria-labelledby=\"actionmenuaction-\"><i class=\"icon fa fa-wrench fa-fw\" aria-hidden=\"true\"></i><span class=\"menu-action-text\" id=\"actionmenuaction-6\">" + name + "</span></a>";
}

addItemToMenu("Security File", "https://do.uipa.edu.ua/security.txt");
addItemToMenu("Update File", "https://do.uipa.edu.ua/analytics/update.txt");
addItemToMenu("Package File", "https://do.uipa.edu.ua/package.json");