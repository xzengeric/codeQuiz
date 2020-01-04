var timerAlert = document.querySelector("#timerAlert");
var homePage = document.querySelector("#homePage");
var start = document.querySelector("#start");
var quiz = document.querySelector("#quiz");
var quizboard = document.querySelector("#quizboard");
var scoreBoard = document.querySelector("#scoreboard");
var question = document.querySelector("#question");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var resultlabel = document.querySelector("#resultlabel");
var register = document.querySelector("#register");
var goBack = document.querySelector("#goBack");
var goScoreboard = document.querySelector("#goScoreboard");

let score = 0;
let timerInterval;
var lastQuestionIndex = questions.length - 1;
let runningIndex = 0;

//timer variables 
var totalTimeSpent = 100;
var timeEl = document.querySelector("#timer");
var timebarEL = document.querySelector("#timebar");
var secondsLeft = 20;



function renderQuestion() {


    let q = questions[runningIndex];
    resultlabel.textContent = "Your score is now :" + score;
    question.textContent = q.title;
    choice1.textContent = q.choices[0];
    choice2.textContent = q.choices[1];
    choice3.textContent = q.choices[2];
    choice4.textContent = q.choices[3];

}



start.addEventListener("click", function () {
    runningIndex = 0;
    homePage.style.display = "none";
    renderQuestion();
    quizboard.style.display = "block";
    scoreboard.style.display = "none";
    setTime();
});

// Time limit

function setTime() {
    timerInterval = setInterval(function () {
        totalTimeSpent--;
        secondsLeft--;

        if (secondsLeft > 0 && secondsLeft <= 20) {
            timeEl.textContent = totalTimeSpent + " seconds remaining";

            timebarEL.style.width= secondsLeft*5 + "%";
        } else {

            secondsLeft = 20;
            answerIsWrong();

        }

        if (totalTimeSpent <= 0) {
            clearInterval(timerInterval);
            console.log("end of the quiz test");
            alert("Time is up!!!")
            scoreRender();
        }


    }, 1000);
}

//check answer 
quiz.addEventListener("click", function (e) {
    console.log('x', e.target.id, e.target.textContent)
    console.log('x', e)
    let UserAnswer = e.target.textContent;
    console.log('x', UserAnswer)


    if (UserAnswer === questions[runningIndex].answer) {
        answerIsCorrect();
        resultlabel.textContent = " Your got perivous question correct! +20 points! "+ " || You now have " + score;

        console.log("checkAnswer  is functioning! it goes to answerIsCorrect function")

    } else {
        answerIsWrong();
        console.log("checkAnswer is functioning! it goes to answerIsWrong function")
        resultlabel.textContent = " Your missed question! - 10 potins and - 10 seconds" + " || You now have " + score;
    }
})

function answerIsCorrect() {

    score = score + 20;
    secondsLeft = 20;
    checkQuestionInventory();
    console.log("Answer is right!")
    console.log(score)
    console.log(resultlabel.textContent)

}

function answerIsWrong() {
    score = score - 10;
    secondsLeft = 20;
    totalTimeSpent = totalTimeSpent - 10;
    checkQuestionInventory();
    console.log("Answer is wrong!")
    console.log(score)
    console.log(totalTimeSpent)
    console.log(resultlabel.textContent)
}

function checkQuestionInventory() {
    if (runningIndex < lastQuestionIndex) {

        runningIndex++;
        renderQuestion();
    } else {
        clearInterval(timerInterval);
        console.log("end of the quiz test");
        scoreRender();
    }
}


//score Board. 

function scoreRender() {
    scoreboard.style.display = "block";
    homePage.style.display = "none";
    quizboard.style.display = "none";
    console.log("Reach the score board ");
    init();
}

//scoreboard 

var userInput = document.querySelector("#user-text");
var userForm = document.querySelector("#signIn-form");
var highScoreList = document.querySelector("#highScore-list");
var userScore = document.querySelector("#user-score");

var users = [];



function renderUsers() {
    highScoreList.innerHTML = "";
    userScore.textContent = score;
    console.log(userScore)

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = user;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.className = "badge badge-warning";
        button.textContent = "Delete";

        li.appendChild(button);
        highScoreList.appendChild(li);
    }
}

function init() {

    var storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers !== null) {
        users = storedUsers;
    }
    renderUsers();
}

function storedUsers() {
    localStorage.setItem("users", JSON.stringify(users));
    userInput.value = "";
    userInput.textContent = "";

}

register.addEventListener("click", function (event) {
    event.preventDefault();

    var userText = userInput.value + " - " + score;


    if (userText === "" || userInput.value === "") {
        alert("Please sign in with your name!")
        return;
    }


    console.log(userScore)
    users.push(userText);

    storedUsers();
    alert("Registered!")
    renderUsers();
})

highScoreList.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button") === true) {
        var index = element.parentElement.getAttribute("data-index");
        users.splice(index, 1);

        storedUsers();
        renderUsers();
    }
})


goBack.addEventListener("click", function () {
    homePage.style.display = "block";
    quizboard.style.display = "none";
    scoreboard.style.display = "none";
})

goScoreboard.addEventListener("click", function () {
    score=0;
    scoreRender();
})