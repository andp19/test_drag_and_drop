const form = document.querySelector("#form");
const input = document.querySelector("#input");
const area = document.querySelector("#area");

let draggedLetter = null;
let draggedLetters = [];
let selectedLetters = [];
let selecting = false;
let selectionArea = null;
let startX = 0;
let startY = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value;

  renderText(text);
});

function renderText(text) {
  const letters = text.split("");

  area.innerHTML = "";
  selectedLetters = [];

  letters.forEach(function (symbol) {
    const letter = document.createElement("span");

    letter.classList.add("letter");
    letter.textContent = symbol;
    letter.setAttribute("draggable", "true");

    letter.addEventListener("dragstart", function () {
      draggedLetter = letter;

      if (selectedLetters.includes(letter)) {
        draggedLetters = [...selectedLetters];
      } else {
        draggedLetters = [letter];
      }
    });

    letter.addEventListener("dragend", function () {
      draggedLetter = null;
      draggedLetters = [];
    });

    area.appendChild(letter);
  });
}

area.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("letter")) {
    return;
  }

  selecting = true;

  const areaRect = area.getBoundingClientRect();

  startX = e.clientX - areaRect.left;
  startY = e.clientY - areaRect.top;
  selectionArea = document.createElement("div");
  selectionArea.classList.add("selected-area");

  area.appendChild(selectionArea);
});

area.addEventListener("mousemove", function (e) {
  if (!selecting) {
    return;
  }

  const areaRect = area.getBoundingClientRect();
  const currentX = e.clientX - areaRect.left;
  const currentY = e.clientY - areaRect.top;
  const left = Math.min(startX, currentX);
  const top = Math.min(startY, currentY);
  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);

  selectionArea.style.left = `${left}px`;
  selectionArea.style.top = `${top}px`;
  selectionArea.style.width = `${width}px`;
  selectionArea.style.height = `${height}px`;

  document.querySelectorAll(".letter").forEach(function (letter) {
    const letterRect = letter.getBoundingClientRect();
    const letterLeft = letterRect.left - areaRect.left;
    const letterTop = letterRect.top - areaRect.top;
    const letterRight = letterLeft + letterRect.width;
    const letterBottom = letterTop + letterRect.height;
    const inside = letterLeft < left + width && letterRight > left && letterTop < top + height && letterBottom > top;

    if (inside && !selectedLetters.includes(letter)) {
      selectedLetters.push(letter);

      letter.classList.add("selected");
    }
  });
});

document.addEventListener("mouseup", function () {
  if (!selecting) {
    return;
  }

  selecting = false;

  if (selectionArea) {
    selectionArea.remove();
    selectionArea = null;
  }
});

area.addEventListener("dragover", function (e) {
  e.preventDefault();
});

area.addEventListener("drop", function (e) {
  e.preventDefault();

  if (!draggedLetter) {
    return;
  }

  draggedLetters.forEach(function (letter) {
    area.appendChild(letter);
  });
});
