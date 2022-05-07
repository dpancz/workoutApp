function newCSS(source){
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/public/css/dayMode/' + source;
    link.id = 'dayCSS';
    head.appendChild(link);
}

function deleteCSS(){
    if (document.getElementById('dayCSS') != null){
        document.getElementById('dayCSS').remove();
    }
}

function checkCookiesDayMode(){
    let name = 'dayMode' + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function wholeCookies(source){
    
    switch(checkCookiesDayMode()){
        case 'true':
            newCSS(source);
            break;
        case 'false':
            deleteCSS();
            break;
    }
}