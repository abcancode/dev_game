const welcomeBox = document.querySelector(".welcome-box");
const startQuizBtn=document.querySelector(".start-quiz-btn");
const mainBox = document.querySelector(".main-box");
const currentQuestion = document.querySelector(".current-question");
const correctScore = document.querySelector(".correct-score");
const questionBoard = document.querySelector(".question-board");
const choiceBoard = document.querySelector(".choice-board");
const nextBtn = document.querySelector(".next-btn");
const leaveQuizBtn = document.querySelector(".leave-quiz-btn");
const endBox = document.querySelector(".end-box");
const restartQuizBtn = document.querySelector('.restart-quiz-btn');
const homeBtn = document.querySelector(".home-btn");
let questionIndex=0;
let score =0;
let number = 0;
let newArray = [];


questionArray =[
    {
        question:"A computer program that directly executes instructions written in a programming or scripting language, without requiring them previously to have been compiled into a machine language program is called _____",
        choices:["Compiler","Interpreter","Assembler","Source Code"],
        answer: 1,
      },

      {
        question:"Mobile Developers are also seen as front end developers as they develop products for mobile like Android, Iphone and so on. True or False?",
        choices:["True","False","Maybe","I don't really know"],
        answer:0,
      },
      {
        question: "Back-end developers use programming languages like ________ to work with data.",
        choices:["CSS", "Bootstrap","Python","HTML"],
        answer:2,
      },
      {
        question: "Front-end developers use HTML, CSS, JavaScript, and their relevant frameworks like ________",
        choices:["Python","Ruby","Angular","PHP"],
        answer:2,
      },
      {
        question: "___________  is an individual that develops applications or build products for the web.",
        choices:["UI/UX Developer","Mobile App Developer","Web Developer","Fullstack Developer"],
        answer:2,
      }    
]
console.log(questionArray);

function load(){
    number++;
    questionBoard.innerHTML=questionArray[questionIndex].question;
    createChoices();
    scoreBoard();
    currentQuestion.innerHTML = number + "/" + questionArray.length;
 }

 function createChoices(){
    choiceBoard.innerHTML="";
    let animationDelay = 0.2;
    for(let i=0; i<questionArray[questionIndex].choices.length; i++){
        // console.log(myApp[questionIndex].options[i]);
        const choice = document.createElement("div");
        choice.innerHTML=questionArray[questionIndex].choices[i];
        choice.classList.add('choice');
        choice.id=i;
        choice.style.animationDelay=animationDelay + "s";
        animationDelay=animationDelay+0.2;
        choice.setAttribute("onclick", "check(this)");
        choiceBoard.appendChild(choice);
    }
}

function createRandomQuestion(){
    const randomNumber = Math.floor(Math.random() * questionArray.length);
    // console.log(randomNumber);
    // console.log(newArray.length)
    let duplicate = 0;
    if (newArray.length == 0){
        questionIndex = randomNumber;

    }else{
        for(let i=0; i<newArray.length; i++){
            if(randomNumber == newArray[i]){
                duplicate =1;
            }
        }
        if(duplicate ==1){
            createRandomQuestion();
            return;
        } else{
            questionIndex =randomNumber;
        }
    }

    newArray.push(randomNumber);
    // console.log(newArray);
    load();
}

function check(ele){
    const id = ele.id;
    if (id == questionArray[questionIndex].answer){
        ele.classList.add("correct");
        score++;
        scoreBoard();
    } 
    else{
        ele.classList.add("wrong");

        for(let i = 0; i<choiceBoard.children.length; i++){
            if(choiceBoard.children[i].id == questionArray[questionIndex].answer){
                choiceBoard.children[i].classList.add("show-correct");
            }
        }
    }
    disableChoices();
    showNextQuestionBtn();

    if (number == questionArray.length){
        quizOver();
    }
}

function disableChoices(){
    for (let i = 0; i<choiceBoard.children.length; i++){
        choiceBoard.children[i].classList.add("already-answered");
    }
}

function showNextQuestionBtn(){
    nextBtn.classList.add("show");
}

function hideNextQuestionBtn(){
    nextBtn.classList.remove("show");
}

function scoreBoard(){
    correctScore.innerHTML = score;
}

nextBtn.addEventListener("click",nextQuestion);

function nextQuestion(){
    createRandomQuestion();
    hideNextQuestionBtn();
}

function quizResult(){
    document.querySelector(".total-correct").innerHTML =score;
}

function resetQuiz(){
score =0;
number = 0;
newArray = [];
}

function quizOver(){
    nextBtn.classList.remove("show");
    leaveQuizBtn.classList.add("show");
}

leaveQuizBtn.addEventListener("click",()=>{
    mainBox.classList.remove('show');
    leaveQuizBtn.classList.remove('show');
    endBox.classList.add("show");
    quizResult();
    // console.log("hi");
})

restartQuizBtn.addEventListener("click",()=>{
    mainBox.classList.add("show");
    endBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})

homeBtn.addEventListener("click",()=>{
    endBox.classList.remove("show");
    welcomeBox.classList.add("show");
    resetQuiz();
})

startQuizBtn.addEventListener("click",()=>{
    welcomeBox.classList.remove("show");
    mainBox.classList.add("show");
    nextQuestion();
})
