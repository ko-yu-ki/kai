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
    speed:3,
    traffic:3 // сложность игры 
};

function getQuantityElements(heightElement) { // вычисляем сколько элементов заданной высоты поместится на странице
    return document.documentElement.clientHeight /heightElement+1; //функция возращает значение по команде return
                        // +1 на всякий случай, мб надо просто округлять?
}



function startStopGame(){
       

    if (startStop.textContent === 'Старт!'){ //мой тюнинг
        startStop.textContent = 'Стоп!';        //мой тюнинг
        gameArea.innerHTML=''; // очистка "дороги" от всего, что внутри
       
        
        
        car.classList.remove('hide'); //мой тюнинг
       
        

        for (let i = 0; i < getQuantityElements(100); i++) {      // добавляем полоски на дорогу
                                                            //console.log(car.offsetHeight); почему не берет высоту???
            const line = document.createElement('div'); // объект
            line.classList.add('line');
            line.style.top = (i * 100) + 'px'; // расстояние между линиями 100px
            line.y = i*100;// в объект линию добавляем новое свойство
            gameArea.appendChild(line);
       }

        for (let i = 0; i < getQuantityElements(112*setting.traffic); i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.y = -112 * setting.traffic * (i + 1);
            enemy.style.top = enemy.y + 'px';
            enemy.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50)) + 'px';
            let carStyle = Math.floor(Math.random()*5)+1;
            enemy.style.background = 'transparent url(./image/enemy'+ carStyle +'.png) center / cover no-repeat';
            gameArea.appendChild(enemy);
        }

        setting.score = 0;
        setting.start = true;
        gameArea.appendChild(car);
        car.style.left = (gameArea.offsetWidth/2)-(car.offsetWidth/2)+'px';
        car.style.top = 'auto';
        car.style.bottom = '100px';
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
        requestAnimationFrame(playGame); // запрос анимации функции в скобках на следующем кадре
    }
    else {
        startStop.textContent = 'Старт!';    //мой тюнинг
        setting.start = false;               //мой тюнинг
        car.classList.add('hide');           //мой тюнинг
        
        gameArea.innerHTML='';
    }
}


function playGame(){

    if (setting.start){
        setting.score+=setting.speed; 
        score.innerHTML = 'Score<br>' + setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x-=setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x+=setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y+=setting.speed;
        }
        if (keys.ArrowUp && setting.y > 95) { //из-за кнопки старт здесь не ноль, а 95
            setting.y-=setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
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

function moveRoad(){
    let lines = document.querySelectorAll('.line'); // получили все линии(элементы с классом line)
    lines.forEach(function(line, i){ //?! 
        line.y += setting.speed;
        line.style.top = line.y +'px';
      //  if (line.y > gameArea.offsetHeight){ мой вариант - некоторые линии длиннее и местами расстояние не то
      //      line.y = 0;
      //  }
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100; // чтобы линия выезжала из-за экрана
        }

    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach (function(item, i){
        let carRect = car.getBoundingClientRect(); // получаем прямоугольник машинки
        let enemyRect = item.getBoundingClientRect(); // получаем прямоугольники врагов
        
        if ((carRect.top <= enemyRect.bottom)&&   
            (carRect.left<=enemyRect.right)&&
            (carRect.right>=enemyRect.left)&&
            (carRect.bottom >= enemyRect.top)) {
            startStop.textContent = 'Старт!';    //мой тюнинг
            setting.start = false;    
            console.warn('crash');
           // startStop.classlist.remove('hide'); // если убирать мой тюнинг про старт и стоп
           // startStop.style.top = score.offsetHeight; // если убирать мой тюнинг про старт и стоп
        }
        item.y += setting.speed / 2;
        item.style.top = item.y +'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic; // чтобы машина выезжала из-за экрана
            item.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50)) + 'px'; 
            
        }
         
    });
    
}