const questions = [{
    "image": "./img/rules.jpg",
    "question": "Aus wie vielen Zeichen besteht der Hex Color Code?",
    "answer1": "6",
    "answer2": "7",
    "answer3": "5",
    "answer4": "8",
    "rightAnswer": "1"
}, {
    "image": "./img/blur.jpg",
    "question": "Mit welchem Befehl kann man in dem Bild zu sehenden Effekt umsetzten ?",
    "answer1": "blur()",
    "answer2": "brightness()",
    "answer3": "saturate()",
    "answer4": "sepia()",
    "rightAnswer": "1"
}, {
    "image": "./img/rules.jpg",
    "question": "Was ist der Unterschied zwischen Grid und Flexbox ?",
    "answer1": "Flexbox ist 2-Dimensional nutzbar",
    "answer2": "Flexbox ist vielseitiger",
    "answer3": "Grid ist besser bei Überlappungen nutzbar",
    "answer4": "Flexbox verwendet man für Layouts",
    "rightAnswer": "3"
}, {
    "image": "./img/box-shadow.jpg",
    "question": "Wie setzt man einen Box-shadow-bottom?",
    "answer1": "box-shadow: 0 5px 3px -3px",
    "answer2": "box-shadow: 5px 0 3px -3px",
    "answer3": "box-shadow: 0 -5px -3px -3px",
    "answer4": "box-shadow: -5px 0 3px -3px",
    "rightAnswer": "1",
}, {
    "image": "./img/rules.jpg",
    "question": "Welche Methode kann ich alternative eines For-Loops verweden?",
    "answer1": "keys()",
    "answer2": "forEach()",
    "answer3": "filter()",
    "answer4": "join()",
    "rightAnswer": "2"
}]

let quiz = document.getElementById('quiz');
let nextQuiz = document.getElementById('nextQuiz');
let startEndGame = document.getElementById('startEndGame');
let currentQuestion = 0;
let previousQuestion = -1;
let nextQuestionn = 1;
let questionNumber = 1;
let points = 0;
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');




function startGame() {
    document.getElementById('placeQuiz').classList.remove('d-none');
    startEndGame.classList.add('d-none');

    generateQuiz();
    generateNextQuiz();
    progressBar();
}


function nextQuestion() {
    if (questions.length !== questionNumber) {
        questionNumber++;
        currentQuestion++;
        console.log(currentQuestion)
        generateQuiz();
        progressBar();

    } else {
        loadEndScreen();
    }
    loadPreviousNext();
}


function loadPreviousNext() {
    if (questions.length - 1 !== currentQuestion) {
        nextQuestionn++;
        generateNextQuiz();
    } else {
        document.getElementById('nextQuiz').classList.add('d-none');
    }

    document.getElementById('previousQuiz').classList.remove('quiz_box_transparent');
    previousQuestion++;
    generatePreviousQuiz();
}


function answer(choice) {
    let selectedAnswer = choice.slice(-1);
    let rightAnswerId = `answer${quizTag['rightAnswer']}`;
    let rightAnswer = quizTag['rightAnswer'];

    if (choice === quizTag['answer1'].id) {
        answer2.disable = true;
        answer3.disable = true;
        answer4.disable = true;
    } else if (choice === quizTag['answer2'].id) {
        answer1.disable = true;
        answer3.disable = true;
        answer4.disable = true;
    } else if (choice === quizTag['answer3'].id) {
        answer1.disable = true;
        answer2.disable = true;
        answer4.disable = true;
    } else if (choice === quizTag['answer4'].id) {
        answer1.disable = true;
        answer2.disable = true;
        answer3.disable = true;
    }

    if (rightAnswer === selectedAnswer) {
        points++;
        document.getElementById(choice).classList.add("answer_right");
    } else {
        document.getElementById(choice).classList.add("answer_wrong");
        document.getElementById(rightAnswerId).classList.add("answer_right");
    }
    document.getElementById('nextBtn').disabled = false;
}


function loadEndScreen() {
    document.getElementById('placeQuiz').classList.add('d-none');

    startEndGame.classList.remove('d-none');
    startEndGame.innerHTML = "";
    startEndGame.innerHTML = endScreenHtml();
    document.getElementById('reachedPoints').innerHTML = points;
    document.getElementById('reachedLength').innerHTML = questions.length;
}


function advise() {
    if (points <= 2) {
        return "Keep on practice!";
    } else if (points <= 4) {
        return "Already good work!"
    } else {
        return "Mucho Buenoo!"
    }
}


function progressBar() {
    let progress = document.getElementById('progressbar');
    if (questionNumber == 1) {
        progress.style.width = "1%";
    } else if (questionNumber == 2) {
        progress.style.width = "20%";
        progress.innerHTML = "20%";
    } else if (questionNumber == 3) {
        progress.style.width = "40%";
        progress.innerHTML = "40%";
    } else if (questionNumber == 4) {
        progress.style.width = "60%";
        progress.innerHTML = "60%";
    } else if (questionNumber == 5) {
        progress.style.width = "80%";
        progress.style.borderTopRightRadius = "0.5rem";
        progress.innerHTML = "80%";
    }
}


function generateQuiz() {
    quizTag = questions[currentQuestion];
    quiz.innerHTML = "";
    quiz.innerHTML = quizHtml();

    document.getElementById('counterLength').innerHTML = questions.length;
}


function generateNextQuiz() {
    let nextQuizTag = questions[nextQuestionn];
    nextQuiz.innerHTML = "";
    nextQuiz.innerHTML = nextQuizHtml(nextQuizTag);
}


function generatePreviousQuiz() {
    let previousQuiz = document.getElementById('previousQuiz');
    let preQuizTag = questions[previousQuestion];
    previousQuiz.innerHTML = "";
    previousQuiz.innerHTML = preQuizHtml(preQuizTag);
}


function endScreenHtml() {
    return `
    <div class="box_start_end_game">
        <img class="start_end_game_img" src="./img/done.jpg">
        <div>
            <p class="counter_question game_end_points"> You have answered <span id="reachedPoints" class="counter"></span>  out of <span class="counter" id="reachedLength"></span> questions correctly</p>
            <p class="game_end_text">${advise()}</p>
        </div>
    </div>`
}


function quizHtml() {
    return `
    <div class="box_progressbar" >
        <div id="progressbar" class="progressbar"></div>
    </div>
     <img class="box_img_top" src="${quizTag['image']}">
            <div class="box_question">
                <p class="question_text">${quizTag['question']}</p>
            </div>
            <div class="box_place_answers">
                <button id="answer1" onclick="answer('answer1')" class="answer">
                    <div class="answer_num">A</div>
                    <div class="answer_text">
                        ${quizTag['answer1']}
                    </div>
                </button>
                <button id="answer2" onclick="answer('answer2')" class="answer">
                    <div class="answer_num">B</div>
                    <div class="answer_text">
                        ${quizTag['answer2']}
                    </div>
                </button>
                <button id="answer3" onclick="answer('answer3')" class="answer">
                    <div class="answer_num">C</div>
                    <div class="answer_text">
                        ${quizTag['answer3']}
                    </div>
                </button>
                <button id="answer4" onclick="answer('answer4')" class="answer">
                    <div class="answer_num">D</div>
                    <div class="answer_text">
                        ${quizTag['answer4']}
                    </div>
                </button>
            </div>
            <div class="place_back_next">
              <div>
                <p class="counter_question"><span id="currentCounter"   class="counter">${questionNumber}</span>out of<span id="counterLength" class="counter"></span>Questions
                </p>
              </div>
                <button id="nextBtn" onclick="nextQuestion()" disabled class="btn_back_next">
                    Next
                </button>
            </div>`
}


function nextQuizHtml(nextQuizTag) {
    return `
    <div class="overlay">
       <img class="box_img_top img_small" src="${nextQuizTag['image']}">
       <div class="box_question_s">
           <p class="question_text_s">${nextQuizTag['question']}</p>
       </div>
       <div class="box_place_answers_s">
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${nextQuizTag['answer1']}
               </div>
           </div>
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${nextQuizTag['answer2']}
               </div>
           </div>
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${nextQuizTag['answer3']}
               </div>
           </div>
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${nextQuizTag['answer4']}
               </div>
           </div>
       </div>
   </div>`
}


function preQuizHtml(preQuizTag) {
    return `
    <div class="overlay">
       <img class="box_img_top img_small
       " src="${preQuizTag['image']}">
       <div class="box_question_s">
           <p class="question_text_s">${preQuizTag['question']}</p>
       </div>
       <div class="box_place_answers_s">
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${preQuizTag['answer1']}
               </div>
           </div>
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${preQuizTag['answer2']}
               </div>
           </div>
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${preQuizTag['answer3']}
               </div>
           </div>
           <div class="answer_s">
               <div class="answer_num_s">A</div>
               <div class="answer_text_s">
                   ${preQuizTag['answer4']}
               </div>
           </div>
       </div>
   </div>`
}