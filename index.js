const add_card = document.querySelector('.add-card')
const card_body = document.querySelector('.card-body')
const card_container = document.querySelector('.card-container')

  // 大卡片裡面新增小卡片
add_card.addEventListener('click', () => {
  const card_content = document.createElement('div');
  card_content.classList.add('card', 'card-content');
  card_content.innerHTML = `<textarea class="textarea" rows="1" cols="10"></textarea>`;
  
  // 設定卡片內容的高度
  card_content.style.height = `${card_content.clientHeight + 20}px`;
  
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
});

  // 大卡片旁邊新增大卡片
const add_list = document.querySelector('.add-list');

add_list.addEventListener('click', () => {
  const card_list = document.createElement('div');
  card_list.classList.add('card', 'card-list');
  card_list.innerHTML = `
    <div class="card-body">
      <div class="card-content">
        <textarea class="textarea" rows="1" cols="10"></textarea>
      </div>
    </div>
  `;
});

