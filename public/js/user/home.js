const startBtn = document.querySelector('.startBtn');
const bgDiv = document.querySelector('.bgDiv');
//MENU
const menuArrow = document.querySelector('.fa-chevron-down');
const myProfileOption = document.querySelector('.myProfileOption');
const settingsOption = document.querySelector('.settingsOption');
const deleteOption = document.querySelector('.deleteOption');
const logOutOption = document.querySelector('.logOutOption');
const menuList = document.querySelector('.menuList');
//MENU

startBtn.addEventListener('click', () => {
    const workoutLive = document.createElement('div');
    let height = 0;
    let width = 0;
    let top = 50;
    let left = 50;
    workoutLive.style.position = 'absolute';
    workoutLive.style.backgroundColor = '#111111';
    workoutLive.style.height = `${height}%`;
    workoutLive.style.width = `${width}%`;
    workoutLive.style.top = `${top}%`;
    workoutLive.style.left = `${left}%`;

    let timer1 = setInterval(() => {
        let doneTop = false;
        let doneLeft = false;
        if (top >= 0){
            workoutLive.style.height = `${height}%`;
            workoutLive.style.top = `${top}%`;
            console.log(workoutLive.style.top)
            height += 2;
            top--;
        } else {
            doneTop = true;
        }

        if (left >= 0){
            workoutLive.style.width = `${width}%`;
            workoutLive.style.left = `${left}%`;
            width += 2;
            left--;
        } else {
            doneLeft = true;
        }

        if(doneTop && doneLeft){
            clearInterval(timer1);
            window.location.href = '/workout-live/' + id;
            let timer2 = setTimeout(() => {
                workoutLive.remove();
                clearTimeout(timer2);
            }, 100)
        }
    }, 7);
    

    bgDiv.appendChild(workoutLive);
});

//MENU

let menuIsClicked = false;

menuArrow.addEventListener('click', () => {
    if(!menuIsClicked){
        menuArrow.style.animation = 'arrowRotate1 0.7s';
        menuList.style.animation = 'menuList1 0.7s';
        let timer1 = setTimeout(() => {
            menuArrow.style.animation = '';
            menuList.style.animation = '';
            menuArrow.style.transform = 'rotateZ(180deg)';
            menuList.style.height = '200px';
            menuIsClicked = true;
            clearTimeout(timer1);
        }, 700)
    } else {
        menuArrow.style.animation = 'arrowRotate2 0.7s';
        menuList.style.animation = 'menuList2 0.7s';
        let timer2 = setTimeout(() => {
            menuArrow.style.animation = '';
            menuList.style.animation = '';
            menuArrow.style.transform = 'rotateZ(0deg)';
            menuList.style.height = '0px';
            menuIsClicked = false;
            clearTimeout(timer2);
        }, 700)
    }
});

myProfileOption.addEventListener('click', () => {
    window.location.href = '/user/profile/' + id;
});

settingsOption.addEventListener('click', () => {
    window.location.href = '/user/settings/' + id;
});

deleteOption.addEventListener('click', () => {
    window.location.href = '/user/delete/' + id + '/' + false;
});

logOutOption.addEventListener('click', () => {
    window.location.href = '/user/log-out/' + id + '/' + ip;
});

//MENU