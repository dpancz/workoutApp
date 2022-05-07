//BUTTON2

const buttonColor = document.querySelector(".buttonColor");
const dot = document.querySelector(".dot");
const slide = document.querySelector(".slide");

let clickedButtonColor = checkCookiesDayMode();
setDayMode();

if (clickedButtonColor == 'true'){
    dot.classList.toggle("active");
    slide.classList.toggle("active");
    setDayMode();
}

buttonColor.addEventListener("click", () => {
    dot.classList.toggle("active");
    slide.classList.toggle("active");
    if(clickedButtonColor == 'false'){
        clickedButtonColor = 'true';
        setDayMode();
    } else {
        clickedButtonColor = 'false';
        setDayMode();
    }
});

buttonColor.addEventListener("mouseover", () => {
    dot.style.backgroundColor = "#cccccc";
});

buttonColor.addEventListener("mouseout", () => {
    dot.style.backgroundColor = "#dddddd";
});

function setDayMode(){
    switch(clickedButtonColor){
        case 'true':
            document.cookie = "dayMode=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            document.cookie = "dayMode=true; expires: Sun, 14 Oct 2040 12:00:00 UTC; path=/";
            break;
        case 'false':
            document.cookie = "dayMode=true; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            document.cookie = "dayMode=false; expires: Sun, 14 Oct 2040 12:00:00 UTC; path=/";
            break;
    }
    document.cookie = "dayMode=true; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    wholeCookies('partials/leftMenu.css');
    wholeCookies('user/homeSettings.css');
}

//BUTTON 3

const option1 = document.querySelector(".option.option1");
const option2 = document.querySelector(".option.option2");
const slider = document.querySelector(".slider");

let interval1;
let pixels = 140;
let currentOption = languageData;// 1 - English, 2 - Polski

if(languageData == 1){
    interval1 = setInterval(option1slide, 1);
}

setLanguage();


option1.addEventListener("click", () => {
    interval1 = setInterval(option1slide, 1);
});

option2.addEventListener("click", () => {
    interval1 = setInterval(option2slide, 1);
});

function option1slide(){
    currentOption = 1;
    setLanguage();
    if ( pixels > 20 ){
        pixels-=3;
        slider.style.left = `${pixels}px`;
    } else {
        clearInterval(interval1);
    }
    option1.style.color = "#222222";
    option2.style.color = "lightcoral";
}

function option2slide(){
    currentOption = 2;
    setLanguage();
    if ( pixels < 140 ){
        pixels+=3;
        slider.style.left = `${pixels}px`;
    } else {
        clearInterval(interval1);
    }

    option1.style.color = "lightcoral";
    option2.style.color = "#222222";
}

function setLanguage(){
    switch(currentOption){
        case 1:
            
            break;
        case 2:
            
    }
}