const containers = document.querySelectorAll('.container');
const cards = document.querySelectorAll('.card');

let currentCard = null;

// Drag and drop events
cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

containers.forEach(container => {
  container.addEventListener('dragover', dragOver);
  container.addEventListener('dragenter', dragEnter);
  container.addEventListener('dragleave', dragLeave);
  container.addEventListener('drop', drop);
});

function dragStart() {
  currentCard = this;
  setTimeout(() => {
    this.style.display = 'none';
  }, 0);
}

function dragEnd() {
  currentCard = null;
  this.style.display = 'block';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.backgroundColor = 'lightgray';
}

function dragLeave() {
  this.style.backgroundColor = 'gray';
}

function drop() {
  this.appendChild(currentCard);
  this.style.backgroundColor = 'gray';
}
