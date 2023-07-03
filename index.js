

// 大卡片裡面新增小卡片
const add_cards = document.querySelectorAll('.add-card');
let cardIdCounter = 1;
let containerIdCounter = 1;

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-card')) {
    const addCardButton = event.target;
    const container = addCardButton.closest('.container');
    if (container) {
      const card = document.createElement('div');
      card.classList.add('card');
      const cardId = `card-${cardIdCounter}`;
      card.id = cardId;
      cardIdCounter += 1;
      card.draggable = true;

      container.insertBefore(card, addCardButton.parentNode);

      // 調整容器的高度，包括新增的卡片和 add-a-card 按鈕
      let cardHeight = card.clientHeight;
      let addButtonHeight = addCardButton.clientHeight;
      container.style.height = `${container.clientHeight + cardHeight + addButtonHeight}px`;      
    }
  }
});


// 大卡片旁邊新增大卡片
const add_list = document.querySelector('.add-list');

add_list.addEventListener('click', () => {
  const body = document.querySelector('body');
  const container = document.createElement('container');
  container.classList.add('container');
  const containerId = `container-${cardIdCounter}`;
  container.id = containerId;
  containerIdCounter += 1;
  container.innerHTML = `
  <div class="card" id=card-0>Card1 
  <button class = add-card>+ Add a card</button>
</div>
  `;
  body.insertBefore(container,add_list.parentNode);
});

// draging card function
const dragedCards = document.querySelectorAll('.card-content');
const cardBodies = document.querySelectorAll('.card-body');



function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  const cardBody = event.currentTarget.querySelector('.card-body');
  if (card & cardBody) {
    cardBody.appendChild(card);
  }
}





