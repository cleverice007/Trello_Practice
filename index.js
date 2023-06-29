

// 大卡片裡面新增小卡片
const container = document.querySelector('.container');

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-card')) {
    const card_container = event.target.closest('.card-container');
    const card_body = card_container.querySelector('.card-body');

    const card_content = document.createElement('div');
    card_content.classList.add('card', 'card-content');
    card_content.innerHTML = `<textarea class="textarea" rows="1" cols="10"></textarea>`;

    // 設定卡片內容的高度

    const textarea = card_content.querySelector('.textarea');
    textarea.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const title = textarea.value;
        if (title !== '') {
          const cardTitle = document.createElement('div');
          cardTitle.classList.add('card-title');
          cardTitle.textContent = title;

          card_content.removeChild(textarea);
          card_content.appendChild(cardTitle);
          // card_container.style.height = `${card_container.clientHeight + 50}px`;

        }
      }
    });
    card_body.appendChild(card_content);
    card_container.style.height = `${card_container.clientHeight + 20}px`;
  }
});

// 大卡片旁邊新增大卡片
const add_list = document.querySelector('.add-list');

add_list.addEventListener('click', () => {
  const container = document.querySelector('.container');
  const card = document.createElement('div');
  card.classList.add('card', 'card-container');
  card.innerHTML = `
    <div class="card-header">Card Title</div>
    <div class="card-body">

    </div>
    <button class="add-card">+ Add a card</button>
    </div>
  `;
   container.appendChild(card);
});

