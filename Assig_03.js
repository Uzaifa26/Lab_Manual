document.addEventListener("DOMContentLoaded", function(){
    var startArea = document.getElementById("startArea");
    var quizArea = document.getElementById("quizArea");
    var resultArea = document.getElementById("resultArea");

    var startBtn = document.getElementById("startBtn");
    var nextBtn = document.getElementById("nextBtn");
    var restartBtn = document.getElementById("restartBtn");

    var qTitle = document.getElementById("qTitle");
    var optionsArea = document.getElementById("optionsArea");
    var scoreBox = document.getElementById("scoreBox");
    var msgBox = document.getElementById("msgBox");

    var qIndex = 0;
    var score = 0;

    var quizData = [
        {
            question: "HTML stands for?",
            options: ["Hyper Text Markup Language", "High Task Model", "Home Tool Machine"],
            answer: 0
        },
        {
            question: "CSS is for?",
            options: ["Styling", "Hardware", "Servers"],
            answer: 0
        },
        {
            question: "JavaScript can change HTML content.",
            options: ["True", "False"],
            answer: 0
        },
        {
            question: "Flexbox is used for?",
            options: ["Layout", "Videos", "Backend"],
            answer: 0
        },
        {
            question: "DOM refers to?",
            options: ["Document Object Model", "Data Online Matrix", "Digital Object Map"],
            answer: 0
        }
    ];

    startBtn.addEventListener("click", function(){
        startArea.classList.add("hidden");
        quizArea.classList.remove("hidden");
        loadQuestion();
    });

    function loadQuestion(){
        var q = quizData[qIndex];
        qTitle.textContent = q.question;
        optionsArea.innerHTML = "";
        for(var i = 0; i < q.options.length; i++){
            var div = document.createElement("div");
            div.classList.add("opt");
            div.textContent = q.options[i];
            div.addEventListener("click", checkAnswer.bind(null, div, i));
            optionsArea.appendChild(div);
        }
    }

    function checkAnswer(selectedDiv, i){
        var correctIndex = quizData[qIndex].answer;
        if(i === correctIndex){
            selectedDiv.classList.add("correct");
            score++;
        } else {
            selectedDiv.classList.add("wrong");
        }
        var allChoices = document.querySelectorAll(".opt");
        for(var j = 0; j < allChoices.length; j++){
            allChoices[j].style.pointerEvents = "none";
        }
        nextBtn.classList.remove("hidden");
    }
    nextBtn.addEventListener("click", function(){
        qIndex++;
        if(qIndex < quizData.length){
            nextBtn.classList.add("hidden");
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult(){
        quizArea.classList.add("hidden");
        resultArea.classList.remove("hidden");
        scoreBox.textContent = score + " / " + quizData.length;
        if(score >= 4){
            msgBox.textContent = "Excellent Work!";
        } else if(score >= 2){
            msgBox.textContent = "Good Try!";
        } else {
            msgBox.textContent = "Try Again!";
        }
    }

    restartBtn.addEventListener("click", function(){
        qIndex = 0;
        score = 0;
        resultArea.classList.add("hidden");
        quizArea.classList.remove("hidden");
        nextBtn.classList.add("hidden");
        loadQuestion();
    });
});