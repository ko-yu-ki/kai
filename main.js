const score = document.querySelector('.score'),
    startStop = document.querySelector('.startStop'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
    
car.classList.add('car');

//start.onclick = function(){  //onclick устарел 
//    start.classList.add('hide');
//}

startStop.addEventListener('click', startStopGame);
document.addEventListener('keydown', moveCar);
document.addEventListener('keyup', stopCar);

const keys = {  // объект keys и его свойства в {}
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

const setting = { 
    start: false,
    score: 0,
    speed:3
};

function startStopGame(){
    if (startStop.textContent === 'Старт!'){ //мой тюнинг
        startStop.textContent = 'Стоп!';        //мой тюнинг
        requestAnimationFrame(playGame); // запрос анимации функции в скобках на следующем кадре
        setting.start = true;
        car.classList.remove('hide'); //мой тюнинг
        gameArea.appendChild(car);
    }
    else {
        startStop.textContent = 'Старт!';    //мой тюнинг
        setting.start = false;               //мой тюнинг
        car.classList.add('hide');           //мой тюнинг
    }
}


function playGame(){
    console.log('playgame');
    if (setting.start){
        requestAnimationFrame(playGame); // чтобы игра не прерывалась - перезапуск функции из самой себя
    }
}

function moveCar(){   //moveCar(event)
    event.preventDefault();
    keys[event.key] = true; 
//при нажатии клавиши будет передаваться в функцию старт ран. в объекте кейс свойству по имени клавиши присвоят true
}

function stopCar(){
    event.preventDefault();
    keys[event.key] = false;
}
