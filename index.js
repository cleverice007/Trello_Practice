

// 大卡片裡面新增小卡片
const containers = document.querySelectorAll('.container');
const cards = document.querySelectorAll('.card');


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-card')) {
    const addCardButton = event.target;
    const container = addCardButton.closest('.container');
    if (container) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('draggable', true);
      container.insertBefore(card, addCardButton);


      // 調整容器的高度，包括新增的卡片和 add-a-card 按鈕
      let cardHeight = card.clientHeight;
      let addButtonHeight = addCardButton.clientHeight;
      container.style.height = `${container.clientHeight + cardHeight + addButtonHeight}px`;

      card.addEventListener('dragstart', dragStart);
      card.addEventListener('dragend', dragEnd);
    }
  }
});



// 大卡片旁邊新增大卡片
const adding_list = document.querySelector('.adding-list');

adding_list.addEventListener('click', () => {
  const body = document.querySelector('body');
  const container = document.createElement('container');
  container.classList.add('container');


  const addCardButton = document.createElement('button');
  addCardButton.classList.add('add-card');
  addCardButton.textContent = '+ Add a card';
  container.addCardButton = addCardButton; // 將按鈕參考存儲在容器的自定義屬性中


  container.appendChild(addCardButton);
  body.insertBefore(container, adding_list);
  container.addEventListener('dragover', dragOver);
  container.addEventListener('dragenter', dragEnter);
  container.addEventListener('dragleave', dragLeave);
  container.addEventListener('drop', drop);
});

// draging card function

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

function drop(event) {
  const container = event.target;
  const addCardButton = container.querySelector('.add-card'); // 使用 querySelector 查找 add-card 按鈕
  container.insertBefore(currentCard, addCardButton);
  container.style.backgroundColor = 'gray';
}









