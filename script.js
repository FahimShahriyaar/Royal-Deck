// App: Furious Car
// Created By: Fahim Shahriyaar
// Contact: shahriyaar.flash@gmail.com

const img = ['c', 'c++', 'csharp', 'angularjs', 'html', 'java', 'javascript', 'css', 'bootstrap', 'tailwindcss', 'nextjs', 'vuejs', 'nodejs', 'expressjs', 'sass', 'xml', 'json', 'jquery', 'php', 'laravel', 'mssqlserver', 'mysql', 'mongodb', 'postgresql', 'reactjs', 'github', 'python', 'django'];
const match = {};
var prev = null;
var done = [];
var playing = false;
var score=0;
var audio=document.querySelector('audio');

const playButton = document.querySelector('button');
const points= document.querySelector('#score');
playButton.onclick = function () {
    if (!playing) {
        playing=true;
        playButton.textContent='Restart';
        startGame();
    }
    else{
        location.reload();
    }
}




function startGame() {
    const items = document.getElementsByClassName('items');
    const itemsArray = Array.from(items);
    while (itemsArray.length > 0) {
        let [x] = itemsArray.splice(Math.floor(Math.random() * itemsArray.length), 1);
        let [y] = itemsArray.splice(Math.floor(Math.random() * itemsArray.length), 1);
        let [z] = img.splice(Math.floor(Math.random() * img.length), 1);

        match[x.id] = y.id;
        match[y.id] = x.id;

        x.innerHTML = `<div class='content'><div class='front'></div><div class='back' style='background-image:url("./assets/${z}.png")'></div></div>`;
        y.innerHTML = `<div class='content'><div class='front'></div><div class='back' style='background-image:url("./assets/${z}.png")'></div></div>`;
    }


    const container = document.querySelector('.container');
    container.addEventListener('click', fn1);
}


function fn1(e) {
    let x = e.target.closest('.items');
    if (x && !done.includes(x.id)) {
        if (prev == null) {
            prev = x;
            prev.firstChild.style.transform = 'rotateY(180deg)';
        }
        else if (match[x.id] == prev.id) {
            x.firstChild.style.transform = 'rotateY(180deg)';
            done.push(x);
            done.push(prev);
            prev = null;
            score+=1;
            points.textContent=score;

            if(score==12){
                win();
            }
        }
        else {
            prev.firstChild.style.transform = 'rotateY(360deg)';
            prev = x;
            prev.firstChild.style.transform = 'rotateY(180deg)';

        }
    }
}

function win(){
    audio.play();
    const x=document.querySelector('.container img')
    x.classList.add('anmClass');
}