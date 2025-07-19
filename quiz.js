const quizzes = [
  {
    id: 1,
    title: "Préparer une salade",
    correctSteps: [
      "Ecrire('Laver les légumes')",
      "Ecrire('Couper les légumes')",
      "Ecrire('Ajouter l’assaisonneme')",
      "Ecrire('Mélanger le tout')"
    ],
    availableSteps: [
      "Ecrire('Couper les légumes')",
      "Ecrire('Ajouter l’assaisonneme')",
      "Ecrire('Laver les légumes')",
      "Ecrire('Mélanger le tout')"
    ]
  },
  {
    id: 2,
    title: "Brosser les dents",
    correctSteps: [
      "Ecrire('Prendre la brosse à dents')",
      "Ecrire('Mettre du dentifrice')",
      "Ecrire('Se brosser les dents')",
      "Ecrire('Se rincer la bouche')"
    ],
    availableSteps: [
      "Ecrire('Prendre la brosse à dents')",
      "Ecrire('Mettre du dentifrice')",
      "Ecrire('Se brosser les dents')",
      "Ecrire('Se rincer la bouche')"
    ]
  },
  {
    id: 3,
    title: "Faire pousser une plante",
    correctSteps: [
      "Ecrire('Planter une graine')",
      "Ecrire('Arroser régulièrement')",
      "Ecrire('Exposer au soleil')",
      "Ecrire('Observer la croissance')"
    ],
    availableSteps: [
      "Ecrire('Observer la croissance')",
      "Ecrire('Arroser régulièrement')",
      "Ecrire('Exposer au soleil')",
      "Ecrire('Planter une graine')"
    ]
  },
  {
    id: 4,
    title: "Convertir des minutes en secondes",
    correctSteps: [
      "lire(n1)",
      "n2 ← n1 * 60",
      "Ecrire(n2)"
    ],
    availableSteps: [
      "Ecrire(n2)",
      "n2 ← n1 * 60",
      "lire(n1)",
      "Ecrire(angleB)"
    ]
  },
  {
    id: 5,
    title: "Calcul de la surface d’un triangle",
    correctSteps: [
      ["lire(hauteur)", "lire(base)"],
      ["lire(hauteur)", "lire(base)"],
      "surface ← hauteur * base / 2",
      "Ecrire(surface)"
    ],
    availableSteps: [
      "lire(hauteur)",
      "lire(base)",
      "surface ← hauteur * base / 2",
      "Ecrire(surface)",
      "lire(angleA)"
    ]
  },
  {
    id: 6,
    title: "Calculer la vitesse",
    correctSteps: [
      ["lire(temps)", "lire(distance)"],
      ["lire(distance)", "lire(temps)"],
      "vitesse ← distance / temps",
      "Ecrire(vitesse)"
    ],
    availableSteps: [
      "lire(distance)",
      "lire(temps)",
      "vitesse ← distance / temps",
      "Ecrire(vitesse)"
    ]
  },
  {
    id: 7,
    title: "Angle d’un triangle isocèle",
    correctSteps: [
      "lire(angleA)",
      "angleB ← (180 - angleA) / 2",
      "Ecrire(angleB)"
    ],
    availableSteps: [
      "Ecrire(angleB)",
      "angleB ← (180 - angleA) / 2",
      "lire(angleA)"
    ]
  },
  {
    id: 8,
    title: "Former un entier abH",
    correctSteps: [
      ["lire(n1)", "lire(h)"],
      ["lire(h)", "lire(n1)"],
      "lire(n1)",
      "lire(h)",
      "n2 ← n1 * 10 + h",
      "Ecrire(n2)"
    ],
    availableSteps: [
      "lire(n1)",
      "lire(h)",
      "n2 ← n1 * 10 + h",
      "Ecrire(n2)"
    ]
  },
  {
    id: 9,
    title: "Moyenne annuelle pondérée",
    correctSteps: [
      "lire(note1)",
      "lire(note2)",
      "lire(note3)",
      "moyenne ← (note1 + 2 * note2 + 2 * note3) / 5",
      "Ecrire(moyenne)"
    ],
    availableSteps: [
      "lire(note1)",
      "lire(note2)",
      "lire(note3)",
      "moyenne ← (note1 + 2 * note2 + 2 * note3) / 5",
      "Ecrire(moyenne)"
    ]
  }
];

let score = 0;
let currentQuiz = 0;

function createQuiz(quiz) {
  const container = document.createElement("div");
  container.id = `quiz${quiz.id}`;
  container.className = `quiz ${quiz.id === 1 ? 'active' : ''}`;

  container.innerHTML = `
    <h2>${quiz.title}</h2>
    ${quiz.image ? `<img src="${quiz.image}" alt="Image ${quiz.title}" />` : ''}
    <pre class="algo">
Algorithme ex${quiz.id}
Début
${quiz.correctSteps.map((_, i) => `  <div class="dropzone" data-index="${i}">[...]</div>`).join('\n')}
Fin
    </pre>
    <div class="drag-options">
      ${quiz.availableSteps
        .map(step => `<div class="draggable" draggable="true" data-value="${step}">${step}</div>`)
        .sort(() => 0.5 - Math.random()).join('')}
    </div>
    <button onclick="checkAlgorithm(${quiz.id})">Vérifier</button>
    <div id="result${quiz.id}"></div>
  `;

  document.getElementById("quiz-container").appendChild(container);

  container.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart);
  });

  container.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', dropItem);
  });
}

quizzes.forEach(q => createQuiz(q));

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.value);
}

function dragOver(e) {
  e.preventDefault();
}

function dropItem(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  e.target.textContent = data;
  e.target.dataset.value = data;
}

function checkAlgorithm(quizNum) {
  const quiz = quizzes.find(q => q.id === quizNum);
  const drops = document.querySelectorAll(`#quiz${quizNum} .dropzone`);
  const userAnswers = Array.from(drops).map(d => d.dataset.value);
  const correct = quiz.correctSteps;
  const result = document.getElementById(`result${quizNum}`);

  const allCorrect = userAnswers.every((ans, i) => {
    const expected = correct[i];
    if (Array.isArray(expected)) {
      return expected.includes(ans);
    } else {
      return expected === ans;
    }
  });

  if (allCorrect) {
    result.textContent = "✅ Bonne réponse !";
    result.style.color = "green";
    score++;
    setTimeout(() => {
      document.getElementById(`quiz${quizNum}`).classList.remove("active");
      const next = document.getElementById(`quiz${quizNum + 1}`);
      if (next) {
        next.classList.add("active");
      } else {
        document.getElementById("final").style.display = "block";
        document.getElementById("scoreDisplay").textContent = `Ton score final : ${score} / ${quizzes.length}`;
      }
    }, 1000);
  } else {
    result.textContent = "❌ Mauvaise réponse. Essaie encore.";
    result.style.color = "red";
  }
}
