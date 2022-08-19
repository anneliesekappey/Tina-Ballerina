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
    {
      question: "What's the translation of 'pas de cheval'?",
      optionA: "Step of the horse",
      optionB: "Step of the eagle",
      optionC: "Step of the pirate",
      solution: function (question) {
        return question === this.optionA;
      },
    },
    {
      question: "What company was founded by George Balanchine?",
      optionA: "American Ballet Theatre",
      optionB: "New York City Ballet",
      optionC: "The Kirov",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "What is 'en face'?",
      optionA: "A lotion for your face",
      optionB: "When you face the barre",
      optionC: "A position of the body in center",
      solution: function (question) {
        return question === this.optionC;
      },
    },
    {
      question: "Croisé means...",
      optionA: "crossed",
      optionB: "open",
      optionC: "cheese",
      solution: function (question) {
        return question === this.optionA;
      },
    },
    {
      question: "A rond de jambe en dehors moves from...",
      optionA: "back to front",
      optionB: "front to back",
      optionC: "New York to Los Angeles",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "A rond de jambe en dedans moves from...",
      optionA: "front to back",
      optionB: "side to side",
      optionC: "back to front",
      solution: function (question) {
        return question === this.optionC;
      },
    },
    {
      question: "Alongé means to...",
      optionA: "elongate",
      optionB: "open",
      optionC: "cheese",
      solution: function (question) {
        return question === this.optionA;
      },
    },
    {
      question: "A third arabesque is...",
      optionA: "the best arabesque",
      optionB: "both arms in front, upstage arm slightly raised",
      optionC: "both arms down, downstage arm towards the back",
      solution: function (question) {
        return question === this.optionB;
      },
    },
    {
      question: "A battement frappé can be... ",
      optionA: "exhausting",
      optionB: "delicious",
      optionC: "en relevé",
      solution: function (question) {
        return question === this.optionC;
      },
    },
    {
      question: "RAD means...",
      optionA: "Royal Academy of Dance",
      optionB: "cool",
      optionC: "Rond Alongé Dehors",
      solution: function (question) {
        return question === this.optionA;
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
    this.context.font = "24px arial";
    this.context.fillStyle = "white";
    this.context.fillText(`Score: ${this.points}`, 30, 50);
  },
  lightsOut: function () {
    this.context.font = "30px arial";
    this.context.fillStyle = "darkgrey";
    this.context.fillText(`Curtains down! Go back to the barre!`, 120, 300);
  },
};

class Component {
  constructor(x, y, width, height, imageSrc) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  move() {
    const ctx = gameArea.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
  let notTina = "./images/NotTina.jpg";
  let x = gameArea.canvas.width;
  let y = gameArea.canvas.height;
  let minHeight = 40;
  let maxHeight = 80;
  let height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));
  let height1 = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));
  let height2 = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));

  let minWidth = 50;
  let maxWidth = 110;
  let width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
  let width1 = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
  let width2 = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));

  let notBallerina = new Component(x, y / 7.3, width, height, notTina);
  gameArea.stopTinas.push(notBallerina);

  let notBallerina1 = new Component(x, y / 2.3, width1, height1, notTina);
  gameArea.stopTinas.push(notBallerina1);

  let notBallerina2 = new Component(x, y / 1.4, width2, height2, notTina);
  gameArea.stopTinas.push(notBallerina2);
}

function throwStopTina() {
  if (gameArea.frames % 180 === 0) {
    stopTina();
  }
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

const tinaImg = "./images/Tina.png";
const ballerina = new Component(0, 240, 85, 85, tinaImg);

function cleanStage() {
  if (gameArea.points <= 0) {
    gameArea.clear();
    gameArea.lightsOut();
  } else {
    gameArea.clear();
    ballerina.moveAgain();
    ballerina.move();
    throwStopTina();
    gameArea.score();

    gameArea.frames += 1;
  }

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

document.addEventListener(
  "keydown",
  (e) => {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener("keyup", (e) => {
  ballerina.speedX = 0;
  ballerina.speedY = 0;
});

document.querySelector(".start-btn").onclick = () => {
  let stage = document.getElementById("game-stage");
  location.href = stage;
  console.log("start");
  gameArea.start();
};

//document.getElementById("#game-stage")//
