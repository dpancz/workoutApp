//BUTTON2

const buttonColor = document.querySelector(".buttonColor");
const dot = document.querySelector(".dot");
const slide = document.querySelector(".slide");

const dayMode = document.querySelector('#dayMode');

let clickedButtonColor = dayModeData;
setDayMode();

if (dayModeData == true){
    dot.classList.toggle("active");
    slide.classList.toggle("active");
    setDayMode();
}

buttonColor.addEventListener("click", () => {
    dot.classList.toggle("active");
    slide.classList.toggle("active");
    if(!clickedButtonColor){
        clickedButtonColor = true;
        displayOfSave();
        setDayMode();
    } else {
        clickedButtonColor = false;
        displayOfSave();
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
        case true:
            dayMode.value = 'true';
            break;
        case false:
            dayMode.value = 'false';
            break;
    }
}

//BUTTON 3

const option1 = document.querySelector(".option.option1");
const option2 = document.querySelector(".option.option2");
const slider = document.querySelector(".slider");

const language = document.querySelector('#language');

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
    displayOfSave();
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
    displayOfSave();
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
            language.value = 'English';
            break;
        case 2:
            language.value = 'Polish';
    }
}

//SAVE BUTTON

const saveBtn = document.querySelector('.saveBtn');
const userID = document.querySelector('#userID');

userID.value = id;
displayOfSave();

function saveBtnShow(){
    saveBtn.style.display = 'block';
}

function saveBtnHide(){
    saveBtn.style.display = 'none';
}

function displayOfSave(){
    if (currentOption != languageData || clickedButtonColor != dayModeData){
        saveBtnShow();
    } else {
        saveBtnHide();
    }
}