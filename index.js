//兩個bug 新的 container 跟後來新增高度的container 一樣高
// drag and drop 有bug ，應該是把 card title 改成 input title 有關
// 少一個 navbar 跟 sidebar

// 大卡片裡面新增小卡片
const containers = document.querySelectorAll('.container');
const cards = document.querySelectorAll('.card');

// create modal
function createModal(cardId, cardTitle, card) {
  const modalId = `modal-${cardId}`;
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', modalId);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const titleElement = document.createElement('h2');
  titleElement.setAttribute('contenteditable', true);
  titleElement.textContent = cardTitle;

  const descriptionElement = document.createElement('textarea');
  descriptionElement.placeholder = 'Enter description...';
  const descriptionSaveButton = document.createElement('button');
  descriptionSaveButton.textContent = 'Save';
  descriptionSaveButton.addEventListener('click', function() {
    localStorage.setItem(`description-${cardId}`, descriptionElement.value);
  });
  descriptionElement.value = localStorage.getItem(`description-${cardId}`) || '';

  const commentElement = document.createElement('textarea');
  commentElement.placeholder = 'Enter comment...';
  const commentSaveButton = document.createElement('button');
  commentSaveButton.textContent = 'Save';
  commentSaveButton.addEventListener('click', function() {
    localStorage.setItem(`comment-${cardId}`, commentElement.value);
  });
  commentElement.value = localStorage.getItem(`comment-${cardId}`) || '';

  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.innerHTML = '&times;';

  modalContent.appendChild(titleElement);
  modalContent.appendChild(descriptionElement);
  modalContent.appendChild(descriptionSaveButton);
  modalContent.appendChild(commentElement);
  modalContent.appendChild(commentSaveButton);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  titleElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      card.innerHTML = `<div class="card-title">${titleElement.textContent}</div>`;
      titleElement.blur();
    }
  });

  closeButton.addEventListener('click', function() {
    card.innerHTML = `<div class="card-title">${titleElement.textContent}</div>`;
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      card.innerHTML = `<div class="card-title">${titleElement.textContent}</div>`;
      modal.style.display = 'none';
    }
  });

  modal.style.display = 'block';
  return modal;
}



// create card

function createCard(cardId) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('draggable', true);
  card.setAttribute('data-card-id', cardId);

  card.setAttribute('contenteditable', true);
  card.focus();

  card.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const title = card.textContent;
      card.innerHTML = `<div class="card-title">${title}</div>`;
      card.setAttribute('contenteditable', false);
      card.blur();
      card.addEventListener('click', function() {
        createModal(cardId, card.textContent, card);  
    
      });
    }
  });


  

  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);

  return card;
}





document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-card')) {
    const addCardButton = event.target;
    const container = addCardButton.closest('.container');
    if (container) {
      const cardId = Math.floor(Math.random() * 100000);
      const card = createCard(cardId);
      container.insertBefore(card, addCardButton);

      // Adjust container height
      const cardHeight = card.clientHeight;  // Get the actual height of the card
      container.style.height = `${container.clientHeight + cardHeight}px`;
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
  input.classList.add('container-input');
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
      titleElement.classList.add('container-title');
      titleElement.textContent = title;
      container.insertBefore(titleElement, input);
      input.style.display = 'none';
    }
  });
});

// 第一個container的input
const input = document.querySelector('.container-input');

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const container = document.querySelector('.container');
    const title = input.value;
    const titleElement = document.createElement('div');
    titleElement.classList.add('container-title');
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










