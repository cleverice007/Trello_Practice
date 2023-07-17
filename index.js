// adding-list debug
// modal decoration

// 大卡片裡面新增小卡片
const container = document.querySelector('.container');

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

  const descriptionTitle = document.createElement('h2');
  descriptionTitle.textContent = 'Description';
  descriptionTitle.classList.add('description-title');

  const descriptionElement = document.createElement('textarea');
  descriptionElement.classList.add('textarea');
  descriptionElement.placeholder = 'Enter description...';
  const descriptionSaveButton = document.createElement('button');
  descriptionSaveButton.classList.add('save-button');
  descriptionSaveButton.textContent = 'Save';
  descriptionSaveButton.addEventListener('click', function () {
    localStorage.setItem(`description-${cardId}`, descriptionElement.value);
  });
  descriptionElement.value = localStorage.getItem(`description-${cardId}`) || '';

  const commentTitle = document.createElement('h2');
  commentTitle.textContent = 'Comment';
  commentTitle.classList.add('comment-title');

  const commentElement = document.createElement('textarea');
  commentElement.classList.add('textarea');
  commentElement.placeholder = 'Enter comment...';
  const commentSaveButton = document.createElement('button');
  commentSaveButton.classList.add('save-button');
  commentSaveButton.textContent = 'Save';
  commentSaveButton.addEventListener('click', function () {
    localStorage.setItem(`comment-${cardId}`, commentElement.value);
  });
  commentElement.value = localStorage.getItem(`comment-${cardId}`) || '';

  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.innerHTML = '&times;';

  modalContent.appendChild(titleElement);
  modalContent.appendChild(descriptionTitle);
  modalContent.appendChild(descriptionElement);
  modalContent.appendChild(descriptionSaveButton);
  modalContent.appendChild(commentTitle);
  modalContent.appendChild(commentElement);
  modalContent.appendChild(commentSaveButton);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  titleElement.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      card.innerHTML = `<div class="card-title">${titleElement.textContent}</div>`;
      titleElement.blur();
    }
  });

  closeButton.addEventListener('click', function () {
    card.innerHTML = `<div class="card-title">${titleElement.textContent}</div>`;
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
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

  card.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const title = card.textContent;
      card.innerHTML = `<div class="card-title">${title}</div>`;
      card.removeAttribute('contenteditable');
      card.blur();
      card.classList.add('editable');
      card.addEventListener('click', function () {
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
      let cardHeight = card.clientHeight;
      let addButtonHeight = addCardButton.clientHeight;
      container.style.height = `${container.clientHeight + cardHeight + addButtonHeight}px`;
    }
  }
});




// 大卡片旁邊新增大卡片
const adding_list = document.querySelector('.adding-list');
const content = document.querySelector('.content');

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
  content.insertBefore(container, adding_list);
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
      titleElement.setAttribute('contenteditable', true);
      input.style.display = 'none';
      
      titleElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          titleElement.blur();
        }
      });
    }
  });
  
});

// 第一個container的input
const input = document.querySelector('.container-input');

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const title = input.value;
    const titleElement = document.createElement('div');
    titleElement.classList.add('container-title');
    titleElement.textContent = title;
    container.insertBefore(titleElement, input);
    titleElement.setAttribute('contenteditable', true);
    input.style.display = 'none';
    
    titleElement.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        titleElement.blur();
      }
    });
  }
});


// draging card function

let currentCard = null;

// Drag and drop events

  container.addEventListener('dragover', dragOver);
  container.addEventListener('dragenter', dragEnter);
  container.addEventListener('dragleave', dragLeave);
  container.addEventListener('drop', drop);


function dragStart() {
  currentCard = this;
  setTimeout(() => {
    this.style.display = 'none';
  }, 0);

  const container = this.closest('.container');
  const addCardButton = container.querySelector('.add-card');
  if (container) {
    container.style.height = `${container.clientHeight - this.clientHeight - addCardButton.clientHeight}px`;
  }
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
}

function dragLeave() {
  this.style.backgroundColor = 'white';
}


function drop(event) {
  if (event.target.classList.contains('container')) {
    const container = event.target;
    const addCardButton = container.querySelector('.add-card');
    const cardMargin = 10;
    container.insertBefore(currentCard, addCardButton);

    container.style.height = `${container.clientHeight + currentCard.offsetHeight + cardMargin + addCardButton.clientHeight}px`;

    addCardButton.style.top = `${parseInt(addCardButton.style.top) + currentCard.offsetHeight + cardMargin}px`;
  }
}

















