const form = document.querySelector("#form");
const input = document.querySelector("#input");
const area = document.querySelector("#area");
let draggedLetter = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value;

  renderText(text);
});

function renderText(text) {
  area.innerHTML = "";
  const letters = text.replaceAll(" ", "").split('')

  letters.forEach(function (symbol) {
    const letter = document.createElement("span");
    letter.classList.add("letter");
    letter.textContent = symbol;
    letter.setAttribute("draggable", "true");

    letter.addEventListener("dragstart", function (e) {
      draggedLetter = letter;
    });

    letter.addEventListener("dragend", function (e) {
        draggedLetter = null;
    });

    area.appendChild(letter);
  });
}

area.addEventListener("dragover", function (e) {
  e.preventDefault();
});

area.addEventListener("drop", function (e) {
  e.preventDefault();

  if (!draggedLetter) {
    return;
  }

  area.appendChild(
    draggedLetter
  );
});
