//! DOM ACCESS
const start = document.querySelector("#start");
const loginscreen = document.querySelector("#quiz-login");
const questioncard = document.querySelector("#question");
const completebutton = document.querySelector("#complete");
const resultpanel = document.querySelector("#resultscreen");
const quizAnswers = document.querySelector(".answers");
const giftimage = document.querySelector("#giftimg");
const gifttitle = document.querySelector("#congralutations-title");
//! DOM ACCESS
let correctanswer = [
  "1921",
  "Max Planck",
  "Nikola Tesla",
  "String Theory",
  "Sputnik 1",
  "Magnetic induction",
  "Visible",
  "Quantum superposition",
  "Speed ​​of light",
  "total energy",
];
let correct = 0;
let wrong = 0;
let point = 0;
let times = 300;
class questions {
  constructor(question, select1, select2, select3, select4) {
    this.question = question;
    this.select1 = select1;
    this.select2 = select2;
    this.select3 = select3;
    this.select4 = select4;
  }
}
const questionlist = [
  new questions(
    "When did albert einstein receive the nobel prize?",
    "1923",
    "1922",
    "1921",
    "1924"
  ),
  new questions(
    "Who discovered black body radiation?",
    "Albert Einstein",
    "Niels Bohr",
    "Marie Curie",
    "Max Planck"
  ),
  new questions(
    "Who is the person who discovered alternating current?",
    "Hendrik Lorentz",
    "Michael Faraday",
    "Nikola Tesla",
    "Thomas Edison"
  ),
  new questions(
    "What is the name of the theory in particle physics that combines quantum mechanics and Einstein's theory of general relativity?",
    "Field Theory",
    "String Theory",
    "Quantum Field Theory",
    "Special Relativity Theory"
  ),
  new questions(
    "What was the name of the first man-made satellite launched by the Soviet Union in 1957?",
    "Sputnik 1",
    "Sputnik X",
    "Explorer 1",
    "Alouette 1"
  ),
  new questions(
    "What is the name given to the phenomenon that occurs in a conductor wire moving in a magnetic field?",
    "Electrolysis",
    "Magnetic induction",
    "Piezoelectric effect",
    "Electromagnetism"
  ),
  new questions(
    "Which region of the electromagnetic spectrum contains visible light?",
    "Infared",
    "Ultraviyole",
    "Gamma rays",
    "Visible"
  ),
  new questions(
    "What concept is Schrödinger's cat thought experiment used to explain?",
    "Particle wave-behavior",
    "Quantum superposition",
    "Massless particles",
    "Electron configuration"
  ),
  new questions(
    "Planck's constant is directly proportional to which of the following?",
    "Mass energy of the electron",
    "Diameter of the electron's orbit",
    "Speed ​​of light",
    "Mass number of the nucleus of the atom"
  ),
  new questions(
    "According to the law of conservation of energy, what is the energy in a system equal to?",
    "Kinetic energy",
    "Potential energy",
    "total energy",
    "work energy"
  ),
];
class questionArray {
  constructor(QuestionList) {
    this.QuestionList = QuestionList;
    this.index = 0;
  }
  getName() {
    return this.QuestionList[this.index];
  }
  next() {
    this.index++;
  }
  prev() {
    this.index--;
  }
}
const quizlist = new questionArray(questionlist);
let minute;
let second;
let updatedsecond;
let time = "5:00";
let questionselectedvalue = [];
let answers = [];
//! Soru süresini ayarlar.Eğer süre bitmişse sonuç ekranını gösterir.
function timer() {
  times = times - 1;
  minute = Math.floor(times / 60);
  second = Math.floor(times % 60);
  updatedsecond = second < 10 ? `0${second}` : second;
  time = `${minute}:${updatedsecond}`;
  document.querySelector("#time").textContent = `${minute}:${updatedsecond}`;
  if (time == "0:00") UI.showResult();
}
//! Eğer kazanılmışsa bir ödül onun resim kaynağını ve tebrikler yazısını ayarlar
function gift(imageSrc, gifttext) {
  giftimage.src = imageSrc;
  gifttitle.textContent = gifttext;
}

class UI {
  //! Quiz sonuçları ,kazanılan ödülü ve hangi sorulara ne cevap verildiğini gösterir.
  static showResult() {
    questioncard.style.display = "none";
    resultpanel.classList.remove("d-none");
    UI.checkAnswers(answers);
    if ( point < 0 ) point = 0;
    document.getElementById("correct").textContent = `${correct} correct`;
    document.getElementById("wrong").textContent = `${wrong} wrong`;
    document.getElementById("point").textContent = `${point} point`;
    if (50 <= point && point <= 60)
      gift("4.jpg", "Congralutations!Win Keyboard");
    else if (60 < point && point <= 75)
      gift("3.png", "Congralutations!Win Earphone");
    else if (75 < point && point <= 90)
      gift("2.png", "Congralutations!Win Tablet");
    else if (90 < point && point <= 100)
      gift("1.png", "Congralutations!Win Telephone");
    else {
      giftimage.style.display = "none";
      gifttitle.textContent = "You haven't gained anything";
    }
    answers.forEach((object) => {
      if (object == correctanswer[answers.indexOf(object)])
        quizAnswers.innerHTML += `<li class="list-group-item d-flex flex-column flex-md-row justify-content-md-between gap-4 bg-success text-light"><div>${
          answers.indexOf(object) + 1
        }. question answers:${
          correctanswer[answers.indexOf(object)]
        }</div><div>Your Answer:${object}</div></li>`;
      else
        quizAnswers.innerHTML += `<li class="list-group-item d-flex flex-column flex-md-row justify-content-md-between gap-4 bg-danger text-light"><div>${
          answers.indexOf(object) + 1
        }. question answers:${
          correctanswer[answers.indexOf(object)]
        }</div><div>Your Answer:${object}</div></li>`;
    });
  }
  //! seçilen seçeneği bir diziye kaydeder.
  static chooseoption(e) {
    for (let i = 1; i <= questionlist.length; i++) {
      if ((quizlist.index + 1) == i) {
        questionselectedvalue[i - 1] = e.target.value;
      }
    }
    answers = questionselectedvalue;
    //console.log(answers);
  }
  //! Önceki sorulara geçildiğinde seçilen cevabın tekrar ekranda görüntülenmesini sağlar.
  static checkAndSetSelectedRadioButtons() {
    document.querySelectorAll(".radio").forEach((items) => {
      for (let i = 1; i <= questionlist.length; i++) {
        if (quizlist.index + 1 == i) {
          if (items.value == questionselectedvalue[i - 1]) {
            items.checked = true;
          }
        }
      }
    });
  }
  //! Soruların ekranda görüntülenmesini sağlar
  static display() {
    questioncard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">Question ${quizlist.index + 1}</h5>
    <p class="card-text">${quizlist.getName().question}</p>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <input class="radio form-check-input me-2 correct"  onclick="UI.chooseoption(event)"    type="radio" name="radioNoLabel"  value="${
        quizlist.getName().select1
      }" aria-label="...">${quizlist.getName().select1}
    </li>
    <li class="list-group-item">
      <input onclick="UI.chooseoption(event)" class="radio form-check-input me-2 " type="radio" name="radioNoLabel"  value="${
        quizlist.getName().select2
      }" aria-label="...">${quizlist.getName().select2}
    </li>
    <li class="list-group-item">  
      <input  onclick="UI.chooseoption(event)"   class="radio form-check-input me-2" type="radio" name="radioNoLabel"  value="${
        quizlist.getName().select3
      }" aria-label="...">${quizlist.getName().select3}
    </li>
    <li class="list-group-item">  
    <input onclick="UI.chooseoption(event)"    class="radio form-check-input me-2" type="radio" name="radioNoLabel"  value="${
      quizlist.getName().select4
    }" aria-label="...">${quizlist.getName().select4}
    </li>
    </ul>
    <div class="card-body row row-cols-1 row-cols-md-4 justify-content-md-between justify-content-lg-between gap-3 gap-md-0   align-items-md-center">
      <div class="col col-lg-3 order-2 order-md-1 d-flex  justify-content-center justify-content-md-start"><button onclick="UI.prevquestion()"   class="btn btn-primary   ">Prev question</button></div>
      <div class="col col-lg-3 order-3 order-md-2 d-flex  justify-content-center justify-content-md-center"><span id="time" class="badge text-bg-primary ">${time}</span></div>
      <div class="col col-lg-3 order-1 order-md-3 d-flex  justify-content-center justify-content-md-end"><button onclick="UI.nextquestion()"  class="btn btn-primary ">Next question</button></div>
    </div>`;
    if (!(quizlist.index + 1 < questionlist.length)) {
    questioncard.lastElementChild.lastElementChild.innerHTML=`
    <button type="button"  class="btn btn-primary" onclick="UI.nextquestion()" data-bs-toggle="modal" data-bs-target="#exampleModal">Complete Quiz</button>
    `;
    } 
  UI.checkAndSetSelectedRadioButtons();
   
  }
  //! Sonraki sorunun görüntülenmesini sağlar
  static nextquestion() {
      if (quizlist.index + 1 < questionlist.length) quizlist.next();

      UI.display();
  }
  //! Önceki sorunun görüntülenmesini sağlar
  static prevquestion() {
      if (quizlist.index !== 0) quizlist.prev();

      UI.display();
  }
  //! Testi bitirdiğimiz zaman verilen cevaplar dizisi ile doğru cevap dizisini karşılaştırır ve ona göre puan hesaplar.
  static checkAnswers(answerlist) {
    answerlist.forEach((item) => {
      let isCorrect = false;
      correctanswer.forEach((k) => {
        if (item === k) {
          correct++;
          point += 10;
          isCorrect = true;
        }
      });
      if (!isCorrect) {
        wrong++;
        point -= 5;
      }
    });
  }
}
//! Testi başalttığımızda sayacı çalıştırır ve ilk sorunun görüntülenmesini sağlar.
start.addEventListener("click", (e) => {
  e.preventDefault();
  loginscreen.style.display = "none";
  questioncard.classList.remove("d-none");
  UI.display();
  setInterval(timer, 1000);
});
//! Testi bitir butonuna basıldığında sonuç ekranının görüntülenmesini sağlar.
completebutton.addEventListener("click", () => {
  UI.showResult();
});
