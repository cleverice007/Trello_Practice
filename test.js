// 获取所需的DOM元素
const cardContainer = document.getElementById('cardContainer');
const addCardButton = document.getElementById('addCardButton');

// 添加新增卡片的功能
addCardButton.addEventListener('click', function () {
  const card = createCard();
  cardContainer.appendChild(card);
  card.addEventListener('click', function (event) {
    if (event.target === card) {
      const newTitle = prompt('请输入新的卡片标题：');
      if (newTitle) {
        card.querySelector('.card-title').textContent = newTitle;
      }
    }
  });
});

// 创建新卡片的函数
function createCard() {
  const card = document.createElement('div');
  card.classList.add('card');
  const title = document.createElement('h3');
  title.classList.add('card-title');
  title.contentEditable = true;
  title.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      title.blur();
    }
  });
  card.appendChild(title);
  return card;
}
