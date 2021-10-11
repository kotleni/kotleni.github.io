const lang = "Пидорский (faggot)";
const pagename = "Дрочильня УИПА";
const addtoname = " на бутылке";
const priv = "Подвал";
const aboutuser = "О торчке";
const result = "Доходы";
const chat = "Мессенджер";
const settings = "Пойти на стройку";
const intimes = "Надо сделать";
const online = "Сидят на бутылке";

document.getElementsByClassName("dropdown-toggle nav-link")[0].innerText = lang;
document.getElementsByClassName("dropdown-item")[0].innerText = lang;
document.getElementsByClassName("site-name d-none d-md-inline")[0].innerText = pagename;
document.getElementsByClassName("usertext mr-1")[0].innerText += addtoname;
document.getElementsByClassName("menu-action-text")[1].innerText = priv;
document.getElementsByClassName("menu-action-text")[1].innerText = aboutuser;
document.getElementsByClassName("menu-action-text")[2].result = settings;
document.getElementsByClassName("menu-action-text")[3].result = chat;
document.getElementsByClassName("menu-action-text")[4].innerText = settings;
document.getElementsByClassName("card-title d-inline")[2].innerText = intimes;
document.getElementsByClassName("card-title d-inline")[4].innerText = online;

document.getElementsByClassName("card ")[0].style["display"] = "none";
