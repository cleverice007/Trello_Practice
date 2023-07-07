

// 大卡片裡面新增小卡片
const containers = document.querySelectorAll('.container');
const cards = document.querySelectorAll('.card');


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-card')) {
    const addCardButton = event.target;
    const container = addCardButton.closest('.container');
    if (container) {
      // 創造卡片
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('draggable', true);
      container.insertBefore(card, addCardButton);
      //給 card unique id
      const cardId = Math.floor(Math.random() * 100000);
      card.setAttribute('id', cardId);
      //新卡片要增加的高度
      let cardHeight = card.clientHeight;
      let addButtonHeight = addCardButton.clientHeight;
      container.style.height = `${container.clientHeight + cardHeight + addButtonHeight}px`;
      // card title 可供輸入
      card.setAttribute('contenteditable', true);
      card.focus();

      card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          const title = card.textContent;
          card.innerHTML = `<div class="card-title">${title}</div>`;
          card.setAttribute('contenteditable', false);
          card.blur();
        }
      });

      card.addEventListener('dragstart', dragStart);
      card.addEventListener('dragend', dragEnd);
    }
  }
});



// 大卡片旁邊新增大卡片
const adding_list = document.querySelector('.adding-list');

adding_list.addEventListener('click', () => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.classList.add('container');

  const input = document.createElement('input');
  input.classList.add('card-input');
  input.placeholder = 'Enter a title...';

  const addButton = document.createElement('button');
  addButton.classList.add('add-card');
  addButton.textContent = '+ Add a card';

  container.appendChild(input);
  container.appendChild(addButton);
  body.insertBefore(container, adding_list);
  container.addEventListener('dragover', dragOver);
  container.addEventListener('dragenter', dragEnter);
  container.addEventListener('dragleave', dragLeave);
  container.addEventListener('drop', drop);

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const title = input.value;
      const titleElement = document.createElement('div');
      titleElement.classList.add('card-title');
      titleElement.textContent = title;
      container.insertBefore(titleElement, input);
      input.style.display = 'none';
    }
  });
});

// 第一個container的input
const input = document.querySelector('.card-input');

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const container = document.querySelector('.container');
    const title = input.value;
    const titleElement = document.createElement('div');
    titleElement.classList.add('card-title');
    titleElement.textContent = title;
    container.insertBefore(titleElement, input);
    input.style.display = 'none';
  }});

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


// create modal
function createModal(cardId, cardTitle) {
  const modalId = `modal-${cardId}`;
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', modalId);

  // 添加標題元素
  const titleElement = document.createElement('h2');
  titleElement.textContent = cardTitle;
  modal.appendChild(titleElement);

  // 添加描述區域
  const descriptionTextarea = document.createElement('textarea');
  descriptionTextarea.classList.add('description');
  descriptionTextarea.setAttribute('placeholder', 'Enter description...');
  modal.appendChild(descriptionTextarea);

  // 添加評論區域
  const commentTextarea = document.createElement('textarea');
  commentTextarea.classList.add('comment');
  commentTextarea.setAttribute('placeholder', 'Enter comment...');
  modal.appendChild(commentTextarea);

  return modal;
}









