var btn = document.getElementsByTagName("paper-button");
btn[1].click(); # жмем кнопку отписатся

setTimeout(() => {
        var btn2 = document.getElementsByClassName("style-scope yt-button-renderer style-blue-text size-default");
        var tourl = document.getElementsByClassName("yt-simple-endpoint style-scope ytd-guide-entry-renderer")[10].href; # получаем ссылку на вторую подписку в списке
        window.open(tourl,"_self"); # открываем ссылку
btn2[0].click();
    }, 1000);
