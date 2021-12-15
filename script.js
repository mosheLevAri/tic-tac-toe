function player(name, img, ) {
    return {
        name,
        img
    }
};

function submit() {
    let p1Value =document.getElementById("p1").value
    let p2Value =document.getElementById("p2").value
    p1 =new player(p1Value,"x");
    p2 = new player(p2Value, "o", ) 
     currentPlayer = p1;  
};

let p1;
let p2;
let currentPlayer ;

function turnPlayer() {
    currentPlayer = (currentPlayer == p1) ? p2: p1;
}
let gameoverHTML =document.getElementsByClassName("win")
let table = document.getElementById("table");
let clsBox = document.getElementsByClassName("box");
let gameoverimg = document.getElementsByClassName("gameover");

let record = 10;
let count = 0;
let step = [];
let item = [];

let WinItem = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

table.addEventListener("click", click);


function click(event) {
    let target = event.target;
    let index = Number(target.id.slice(1))
    if(p1===undefined||p2===undefined){
        alert("put user Name ")
        return
    }

    if (target.id === "table" || target.classList.contains("row") || item[index] ) {
        return
    }

    item[index] = currentPlayer.img; // save backend

    target.classList.add(currentPlayer.img); // change UI

    step.push(index); // save steps

    count++;

    let winner = CheckWiner(index)
    if (!winner && count == 9) {
        alert("its tie")
    };

    turnPlayer()
};

function CheckWiner(index) {
    let arr = WinItem.filter(v => v.includes(index));
    for (i of arr) {
        // i = [6,7,8]
        // i[0] == 6
        // i[1] == 7
        // i[2] == 8
        if (i.every(v => item[v] == currentPlayer.img)) {
          winning()
          table.removeEventListener("click", click);
            return true
        }
    }
    return false
};

function winning() {
    if (count <= record) {
        record = count;
        localStorage.record = JSON.stringify(record)
    };
    localStorage.removeItem("item");
    localStorage.removeItem("step");
    localStorage.removeItem("count");

    const start = () => {
        setTimeout(function() {
            confetti.start()
        }, 100); 
    };
    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 6000);
    };
    start();
    stop();  
        gameoverimg[0].classList.add("win");
        gameoverimg[0].innerHTML=`<h2>${currentPlayer.name}</h2><h2>is the winner !!!</h2>`; 
};

function newGame() {
   
    for (i = 0; i < item.length; i++) {
        if (item[i]) {
            clsBox[i].classList.remove("x", "o");
        }
    }
    count = 0;
    item = [];
    step = [];
    gameoverHTML[0].innerHTML="";
    gameoverimg[0].classList.remove("win");
    localStorage.removeItem("item");
    localStorage.removeItem("step");
    localStorage.removeItem("count");
    table.addEventListener("click", click);
    
};

function stepBack() {
    if (count > 0) {
        let idStep = Number(step[step.length - 1]);

        clsBox[idStep].classList.remove("x", "o"); // change UI

        item[idStep] = undefined; // save backend

        step.splice(step.length - 1, 1); //  remove img  

        count--; //// count -1

        turnPlayer() ///  change turn (Because deletion)

        return
    }
};

function ShowRecord() {
    let oldRecord = JSON.parse(localStorage.record);
alert(`the recod is : ${oldRecord} step `)

};

function UpdateLS() {
    localStorage.item = JSON.stringify(item);
    localStorage.step = JSON.stringify(step);
    localStorage.count = JSON.stringify(count);

};

function loudLS() {
    let LSitem = JSON.parse(localStorage.item);
    let LSstep = JSON.parse(localStorage.step);
    let LScount = JSON.parse(localStorage.count);
    item = LSitem;
    step = LSstep;
    count = LScount;
    for (i = 0; i < item.length; i++) {
        if (item[i]) {
            clsBox[i].classList.add(`${item[i]}`)
        }
    }
    return
};



