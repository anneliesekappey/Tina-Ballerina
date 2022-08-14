//console.log('script is connected');//

const gameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  stopTinas: [],
  points: 2,
  arrayQuestions: [
    {
      question: "Downstage is...",
      optionA: "closest to the audience",
      optionB: "to the left",
      optionC: "away from the audience",
      solution: function (question) {
        return question === this.optionA;
      },
    },
    {
      question: "Where was ballet invented?",
      optionA: "In Russia",
      optionB: "In Italy",
      optionC: "In France",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "Plié means...",
      optionA: "to stretch",
      optionB: "to dance",
      optionC: "to bend",
      solution: function (question) {
        return question === this.optionC;
      },
    },
    {
      question: "A first arabesque is...",
      optionA: "both arms in front",
      optionB: "front arm same as supporting leg",
      optionC: "a French piece of funiture",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "What does 'en dehors' mean?",
      optionA: "Outwards",
      optionB: "Backwards",
      optionC: "Inwards",
      solution: function (question) {
        return question === this.optionA;
      },
    },
    {
      question: "Dégagé means...",
      optionA: "to stretch",
      optionB: "to disengage",
      optionC: "to smile",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "When doing tendus at the barre...",
      optionA: "we should cross in front and back",
      optionB: "we should put our arms down",
      optionC: "we should push down and pull up",
      solution: function (question) {
        return question === this.optionC;
      },
    },
    {
      question: "What is the 'en croix' pattern?",
      optionA: "Front, side, back, side",
      optionB: "Front, side, back",
      optionC: "Dance, eat, repeat",
      solution: function (question) {
        return question === this.optionA;
      },
    },
    {
      question: "What is a 3/4 time signature called?",
      optionA: "A ballad",
      optionB: "A waltz",
      optionC: "Pop music",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "What is an adagio?",
      optionA: "An old step we don't use anymore",
      optionB: "A position of the arms",
      optionC: "Slow movement phrases",
      solution: function (question) {
        return question === this.optionC;
      },
    },
    {
      question: "What is a pirouette en dedans?",
      optionA: "When you turn towards the supporting leg",
      optionB: "When you turn away from the supporting leg",
      optionC: "When you turn to the right",
      solution: function (question) {
        return question === this.optionA;
      },
    },
    {
      question: "What is a coda in a story ballet?",
      optionA: "When they dance to Led Zeppelin's music",
      optionB: "Fast choreography that showcases virtuosity",
      optionC: "When the whole group dances together",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "What is the corps de ballet?",
      optionA: "The body that dances ballet",
      optionB: "The people who like watching ballet",
      optionC: "The ensemble of a ballet company",
      solution: function (question) {
        return question === this.optionC;
      },
    },
  ],
  question: false,
  start: function () {
    this.canvas.width = 700;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    cleanStage();
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  score: function () {
    this.context.font = "14px arial";
    this.context.fillStyle = "purple";
    this.context.fillText(`Score: ${this.points}`, 350, 50);
  },
  lightsOut: function () {
    if (this.points <= 0) {
      console.log("Curtains down! Go back to the barre.");
      gameArea.clear();
    }
  },
};

class Component {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
  }

  move() {
    const ctx = gameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveAgain() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  crashInto(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

function stopTina() {
  let x = gameArea.canvas.width;
  let y = gameArea.canvas.height;
  let minHeight = 10;
  let maxHeight = 60;
  let height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));
  let height1 = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));
  let height2 = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));

  let minWidth = 20;
  let maxWidth = 60;
  let width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
  let width1 = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
  let width2 = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));

  let notBallerina = new Component(x, y / 7.5, width, height, "blue");
  gameArea.stopTinas.push(notBallerina);

  let notBallerina1 = new Component(x, y / 2.5, width1, height1, "blue");
  gameArea.stopTinas.push(notBallerina1);

  let notBallerina2 = new Component(x, y / 1.5, width2, height2, "blue");
  gameArea.stopTinas.push(notBallerina2);
}

function throwStopTina() {
  if (gameArea.frames % 180 === 0) {
    stopTina();
  } /*else if (gameArea.frames % 120 === 0) {
        stopTina();
    } else if (gameArea.frames % 80 === 0) {
        stopTina();*/

  for (tina of gameArea.stopTinas) {
    tina.x -= 1;
    tina.move();
  }

  gameArea.stopTinas = gameArea.stopTinas.filter(
    (tina) => tina.x > 0 + tina.width
  );
}

function checkPointQuestion() {
  const crashed = gameArea.stopTinas.some((tina, index) => {
    let crash = ballerina.crashInto(tina);
    if (crash) {
      gameArea.stopTinas.splice(index, 1);
    }
    return crash;
  });
  if (crashed) {
    gameArea.question = true;
  }
}

const ballerina = new Component(0, 240, 80, 80, "pink");

function cleanStage() {
  gameArea.lightsOut();
  gameArea.clear();
  ballerina.moveAgain();
  ballerina.move();
  throwStopTina();
  gameArea.score();

  gameArea.frames += 1;

  function answerRandomQuestion(arrayQuestions) {
    let randomQuestion =
      arrayQuestions[Math.floor(Math.random() * arrayQuestions.length)];
    console.log(randomQuestion);
    let questionBanner = document.getElementById("question");
    let content = [
      `
        <h2>${randomQuestion.question}</h2>
        <ul>
            <li>${randomQuestion.optionA}</li>
            <li>${randomQuestion.optionB}</li>
            <li>${randomQuestion.optionC}</li>
        </ul>`,
    ];
    questionBanner.innerHTML = content;

    let interactWithContent = questionBanner.getElementsByTagName("li");
    /* for (i = 0; i < interactWithContent.length; i +=1) {
        console.log(interactWithContent[i])
        interactWithContent[i].onclick = () => {
        questionBanner.className = 'not-visible'
        gameArea.question = false
        cleanStage()
       } 
    } */

    for (i = 0; i < interactWithContent.length; i += 1) {
      interactWithContent[i].onclick = (event) => {
        if (randomQuestion.solution(event.target.innerText)) {
          gameArea.points += 1;
        } else {
          gameArea.points -= 1;
        }
        questionBanner.className = "not-visible";
        gameArea.question = false;
        cleanStage();
      };
    }
  }

  checkPointQuestion();
  if (!gameArea.question) {
    requestAnimationFrame(cleanStage);
  } else {
    showQuestionBanner();
    answerRandomQuestion(gameArea.arrayQuestions);
  }
}

function showQuestionBanner() {
  let questionBanner = document.getElementById("question");
  questionBanner.className = "";
}

document.addEventListener("keydown", (e) => {
  const key = e.code;
  switch (key) {
    case "ArrowUp":
      ballerina.speedY -= 1;
      break;
    case "ArrowDown":
      ballerina.speedY += 1;
      break;
    case "ArrowRight":
      ballerina.speedX += 1;
      break;
    case "ArrowLeft":
      ballerina.speedX -= 1;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  ballerina.speedX = 0;
  ballerina.speedY = 0;
});

/* let bodyStyle = document.getElementsByTagName('body')
bodyStyle.innerHTLM = margin = "50px 10px"; 

if ((gameArea.points = 0)) {
    console.log("Can't dance anymore!");
  } */
