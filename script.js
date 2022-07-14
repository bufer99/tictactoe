function init(){
    

    let player1Indicator = document.querySelector("#p1Div");
    let player2Indicator = document.querySelector("#p2Div");
    player1Indicator.innerHTML = `${p1.value} <br> <img src="piros.PNG">`;
    player2Indicator.innerHTML = `${p2.value} <br> <img src="sarga.PNG">`;
    let player1TimeDiv = document.querySelector("#p1Time");
    let player2TimeDiv = document.querySelector("#p2Time");
    
    let time = document.querySelector("#time");

    let player1Time;
    let player2Time;
    if(time.value>0){
        player1TimeDiv.innerText = `${time.value*60}s`;
        player2TimeDiv.innerText = `${time.value*60}s`;
        player1Time = time.value*60;
        player2Time = time.value*60;
        countdown = setInterval(timer,1000);
    }

    function updateTime(){
        player1TimeDiv.innerText = `${player1Time}s`;
        player2TimeDiv.innerText = `${player2Time}s`;
    }

    let PLAYER = p1.value;
    
    function timer(){
        if(PLAYER === p1.value){
            if(player1Time === 0) {
                clearInterval(countdown);
                vege = true;
                return;
            }
            player1Time -= 1;
        }else{
            if(player2Time === 0) {
                clearInterval(countdown);
                vege = true;
                return;
            }
            player2Time -= 1;
        }
        updateTime();
    }
    

    saveBtn.toggleAttribute('disabled');
    updateStorageNames();
    startBtn.blur();

    settings.style.display = "none";
    const canvas = document.querySelector('#jatek');
    const ctx = canvas.getContext('2d');
    canvas.classList.add("canvas");

    ctx.fillStyle = 'rgb(68, 173, 199)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cell = {
        w: 130,
        h: 122,
    }

    const kepek = {
        cella : new Image(),
    };


    kepek.cella.src = 'cell4.png';
    kepek.cella.onload = function(){
        
        
    };

    

    let dontetlen = false;
    let vege = false;
    let index = 0; 
   
    buttonHandler();
    
    function buttonHandler(){
        canvas.addEventListener('click',canvasClick);
        window.addEventListener('keydown',keyListener);
        canvas.addEventListener('mousemove',function(e){
            console.log(e)
            cursor_x = e.offsetX;
        });
        followCursor = setInterval(korongDobas, 10);
    }

    function canvasClick(e){
        korongStartFalling(e.offsetX);
        if(PLAYER === p1.value) PLAYER = p2.value;
        else PLAYER = p1.value;
    }

    function keyListener(e){
        console.log("arrow");
        if(e.key === "ArrowLeft"){
            cursor_x -= 15;
        }else if(e.key === "ArrowRight"){
            cursor_x += 15;
        }else if(e.key === " ") {
            korongStartFalling(cursor_x);
            if(PLAYER === p1.value) PLAYER = p2.value;
            else PLAYER = p1.value;
        };
    }

    function korongDobas(){
        if(index<42){
            korongok[index].x = cursor_x;
            korongok[index].y = 65;
            korongok[index].color = c;
            korongok[index].active = true;
        }
    }



    function korongStartFalling(e){

        if(!korongok[index].active) return;
        
        if(e<=130) {
            korongok[index].x = 65;
            if(getLastCellInColumn(0) === -1) return;
            else tabla[getLastCellInColumn(0)][0] = korongok[index].color;  
        }
        else if(e<=260) {
            korongok[index].x = 195;
            if(getLastCellInColumn(1) === -1) return;
            else tabla[getLastCellInColumn(1)][1] = korongok[index].color;
        }
        else if(e<=390) {
            korongok[index].x = 325;
            if(getLastCellInColumn(2) === -1) return;
            else tabla[getLastCellInColumn(2)][2] = korongok[index].color;
        }
        else if(e<=520) {
            korongok[index].x = 455;
            if(getLastCellInColumn(3) === -1) return;
            else tabla[getLastCellInColumn(3)][3] = korongok[index].color;
        }
        else if(e<=650) {
            korongok[index].x = 585;
            if(getLastCellInColumn(4) === -1) return;
            else tabla[getLastCellInColumn(4)][4] = korongok[index].color;
        }
        else if(e<=780) {
            korongok[index].x = 715;
            if(getLastCellInColumn(5) === -1) return;
            else tabla[getLastCellInColumn(5)][5] = korongok[index].color;
        }
        else if(e<=910) {
            korongok[index].x = 845;
            if(getLastCellInColumn(6) === -1) return;
            else tabla[getLastCellInColumn(6)][6] = korongok[index].color;
        }
        clearInterval(followCursor);

        console.log(tabla)
        korongok[index].canFall = true;
        index++;
        if(c === 'red') c = 'yellow';
        else c = 'red'; 
        setTimeout(buttonHandler,1000);
        console.log("korongok járékban:",activeKorongok());
        if(findWinner() !== 'o' && activeKorongok() < 42){setTimeout(function(){vege = true},3000)}
        else if(findWinner() === 'o' && activeKorongok() == 42){setTimeout(function(){
            vege = true; 
            dontetlen = true;},3000)}
    }
    
    
    
    function jatek(){
        
        update();
        draw();

        if(!vege)requestAnimationFrame(jatek);
        else if(vege && dontetlen) noSetDialog(false);
        else noSetDialog(true);
    }

    function update(){

        korongok.forEach(e => {
            if(e.active && e.canFall){
                if(!e.stuck){
                    collide(e);
                    e.y += 5;
                }
            }
        })
    }

    function draw(){
    
        hatterRajzolas();
        
        korongEses();
        
        tablaRajzolas();
        
    }

    jatek();


    function tablaRajzolas(){

        for(let i = 1; i<=6; i++){
            for(let j = 0; j<7; j++){
                ctx.drawImage(kepek.cella,j*cell.w,i*cell.h+30,cell.w,cell.h);
            }
        }
    }

    function hatterRajzolas(){
        ctx.fillStyle = 'rgb(68, 173, 199)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function korongEses(){
        
        for (let i = 0; i < 42; i++) {
            k = korongok[i];
            if(!k.active) return;
            if(k.y > (canvas.height-k.radius)-2.5) k.stuck = true;
            ctx.beginPath();
            ctx.arc(k.x, k.y, k.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = k.color;
            ctx.fill();
          }
         
    }


    
    function updateStorageNames(){ // update names
        let s = false;
        Array.from(pairs.children).forEach(e => {
            let array = Array.from(p1.value);
            array.push(':');
            let name1 = array.join('');
            let array2 = Array.from(p2.value);
            array2.push(':');
            let name2 = array2.join('');

            s = s || (e.innerText.split(' ')[0] === name1 &&
                e.innerText.split(' ')[3] === name2);
        })

        if(s) return;
        var retrievedObject = PlayersListStorage.getItem('stats');
        let obj = JSON.parse(retrievedObject);
        console.log("retrieved obj: ",obj);
        let PairList = obj;
        PairList.push(addPair(p1.value,p2.value));
        console.log(PairList);
        PlayersListStorage.setItem('stats', JSON.stringify(PairList));
    }

    

    
    
    
function addPair(player1, player2){
    let stats = { 
        'player1': player1, 
        'player2': player2,
        'p1' : 0,
        'p2': 0,
        'draw': 0 
    };
    return stats;
}


}

var Korong = function(){
    this.x = null;
    this.y = null;
    this.color = null;
    this.radius = 62;
    this.active = false;
    this.stuck = false;
    this.canFall = false;
}

let korongok = [];
for(let i=0; i<42; i++){
    korongok.push(new Korong());
}


function collide(korong){
    korongok.forEach(e => {
        if(e.active && notEquals(e,korong)){
                if(distance(korong,e) <= korong.radius*2) korong.stuck = true;
            }
    });
    return false;
}

function notEquals(a,b){
    return !(a.x === b.x && b.y === a.y);
}

function distance(a,b){
    let d = Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
    return d-5;
}


let tabla =[
            ['o','o','o','o','o','o','o'],
            ['o','o','o','o','o','o','o'],
            ['o','o','o','o','o','o','o'],
            ['o','o','o','o','o','o','o'],
            ['o','o','o','o','o','o','o'],
            ['o','o','o','o','o','o','o']
        ];
function oszloUtolsoSzabad(oszlopIndex){
    let oszlop = [];
    for(let i=0; i<tabla.length;i++){
        oszlop.push(tabla[i][oszlopIndex]);
    }

    oszlop.reverse();
    let empty = oszlop.findIndex( e => e === 'o');
    return empty;
}

function getLastCellInColumn(index){
    let retval = oszloUtolsoSzabad(index);
    if( retval === -1) return retval;
    else return tabla.length-retval-1;
}


function findWinner(){
    ///VERTICAL
    let n=0;
    for(let i=0; i<tabla[0].length; i++){
        let winner = tabla[0][i];
        n = 1;
        for(let j=1; j<tabla.length; j++){
            if(winner == tabla[j][i]){
                n++;
            }
            else {
                winner = tabla[j][i];
                n = 1;
            }
            if(n==4 && winner !== 'o'){
                return winner;
            }
        }
    }

    ///HORIZONTAL
    n=0;
    for(let i=0; i<tabla.length; i++){
        let winner = tabla[i][0];
        n = 1;
        for(let j=1; j<tabla[0].length; j++){
            if(winner == tabla[i][j]){
                n++;
            }
            else {
                winner = tabla[i][j];
                n = 1;
            }
            if(n==4 && winner !== 'o'){
                return winner;
            }
        }
    }

     ///DIAGONAL LEFT TO RIGHT
     n=0;
     let l;
     let winner = tabla[0][0];
     for( let k = 1 ; k <= tabla[0].length + tabla.length - 2; k++ ) {
         l=0;
        for( let j = 0 ; j <= k ; j++ ) {
            let i = k - j;
                        
            if( i < tabla.length && j < tabla[0].length ) {
                l++;
                if(l==1)winner = tabla[i][j];
                if(winner == tabla[i][j]){
                    n++;
                }
                else{
                    winner = tabla[i][j];
                    n=1;
                }
                if(n==4 && winner !== 'o'){
                    return winner;
                }
            }
        }
        n=0;
     }


     ///DIAGONAL RIGHT TO LEFT
        
     n=0;
     winner = tabla[0][0];
     for( let k = 1 ; k <= tabla[0].length + tabla.length - 2; k++ ) {
         l=0;
        for( let j = 0 ; j <= k ; j++ ) {
            let i = k - j;
                        
            if( i < tabla.length && j < tabla[0].length ) {
                l++;
                if(l==1)winner = tabla[reverse(i)][j];
                if(winner == tabla[reverse(i)][j]){
                    n++;
                }
                else{
                    winner = tabla[reverse(i)][j];
                    n=1;
                }
                if(n==4 && winner !== 'o'){
                    return winner;
                }
            }
        }
     n=0;
    }


    return 'o';
}

function reverse(i){
        
    i = tabla.length-1-i;

    return i;
}

let followCursor;
    var cursor_x = 65;
    let c = 'red'; // kezdő szín
const startBtn = document.querySelector("#start");
const settings = document.querySelector("#settings");
startBtn.addEventListener('click',init);


let countdown;


const EndDialog = document.querySelector('#endDialog');

function noSetDialog(boolean) {
    clearInterval(countdown);
    if (boolean) {
        let text;
        if(findWinner() === 'red'){updateStoragePoints('p1'); text = `${p1.value} has won!`;}
        else {updateStoragePoints('p2'); text = `${p2.value} has won!`}
        EndDialog.style.display = "block";
        EndDialog.children[0].children[0].innerText = text;

    }else{
        updateStoragePoints('draw');
        EndDialog.style.display = "block";
        EndDialog.children[0].children[0].innerText = "DRAW!";
    }
    document.querySelector("#confirmEndBtn").addEventListener("click", () => {
        EndDialog.style.display = "none";
        location.reload();
    })
}


function activeKorongok(){
    let j = 0;
            korongok.forEach(e => {
                if(e.active) j++;
            });
    return j;            
}



// Put the object into storage
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let emptyBtn = document.querySelector("#empty");
let saveBtn = document.querySelector("#save");
let clearBtn = document.querySelector('#clrgms');
let savedGamesUL = document.querySelector('#savedGames');

emptyBtn.addEventListener('click',() => {clearStorage(); location.reload();});
saveBtn.addEventListener('click',saveToStorage);
clearBtn.addEventListener('click',() => {clearGameStorage();location.reload();});

PlayersListStorage = window.localStorage;
SavedGamesStorage = window.localStorage;

if(PlayersListStorage.getItem('stats') === null){
    savedPairs = [];
    PlayersListStorage.setItem('stats',JSON.stringify(savedPairs));
}

if(SavedGamesStorage.getItem('savedGames') === null){
    savedGames = [];
    SavedGamesStorage.setItem('savedGames',JSON.stringify(savedGames));
}


function clearGameStorage(){
    var retrievedObject = SavedGamesStorage.getItem('savedGames');
    let obj = JSON.parse(retrievedObject);
    obj.length = 0;
    SavedGamesStorage.setItem('savedGames', JSON.stringify(obj));
}

function saveToStorage(){
    var retrievedObject = JSON.parse(SavedGamesStorage.getItem('savedGames'));
    let obj = retrievedObject;
    console.log(obj);
    let gameList = obj;
    gameList.push(addGame());
    SavedGamesStorage.setItem('savedGames',JSON.stringify(gameList));
}


function addGame(){
    let d = new Date().toISOString().slice(0, 10);
    session = {
        game : tabla,
        date : d.toLocaleString(),
        ratio : ((activeKorongok()-1)/42).toFixed(3)*100
    }
    return session;
}


function updateStoragePoints(result){
    let nodes = Array.from(pairs.children);
    
    var retrievedObject = PlayersListStorage.getItem('stats');
    let obj = JSON.parse(retrievedObject);
    let PairList = obj;

    //console.log(PairList);
    //console.log(nodes);
    
    if(Pindex == null){
        for(let i = 0; i< PairList.length; i++){

            if(PairList[i].player1 === p1.value &&
            PairList[i].player2 === p2.value) Pindex = i;
            
            console.log(PairList[i].player1 + " === " + p1.value + " && "+
            PairList[i].player2 + " === " + p2.value);
        }
        
    }

    if(result === 'p1') PairList[Pindex].p1 = PairList[Pindex].p1*1 + 1;
    else if(result === 'p2') PairList[Pindex].p2 = PairList[Pindex].p2*1 + 1;
    else PairList[Pindex].draw = PairList[Pindex].draw*1 + 1; 

    PlayersListStorage.setItem('stats', JSON.stringify(PairList));
}

function clearStorage(){
    var retrievedObject = PlayersListStorage.getItem('stats');
    let obj = JSON.parse(retrievedObject);
    obj.length = 0;
    PlayersListStorage.setItem('stats', JSON.stringify(obj));
}

let pairs = document.querySelector('#pairs');
pairs.addEventListener('click',selectPair);


let Pindex = null;
function selectPair(e){
    const name = e.target.innerText.split(' ');
    let n1 = Array.from(name[0]);
    n1.splice(-1,1);
    p1.value = n1.join('');
    let n2 = Array.from(name[3]);
    n2.splice(-1,1);
    p2.value = n2.join('');
    let li = e.target.closest('li');
    let nodes = Array.from(pairs.children);
    Pindex = nodes.indexOf(li); // localstorage indexe
    
}

function fillPairList(){
    var retrievedObject = PlayersListStorage.getItem('stats');
    let obj = JSON.parse(retrievedObject);
    let li = "";
    obj.forEach((e) => {
        li = `<li>${e.player1}: ${e.p1} || ${e.player2}: ${e.p2} || draws: ${e.draw}</li>`;
        pairs.innerHTML += li;
    });
}

function fillSavedGamesList(){
    var retrievedObject = PlayersListStorage.getItem('savedGames');
    let obj = JSON.parse(retrievedObject);
    let li = "";
    obj.forEach((e) => {
        li = `<li>${e.date}, ${e.ratio}%</li>`;
        savedGamesUL.innerHTML += li;
    });
}
fillPairList();
fillSavedGamesList();
