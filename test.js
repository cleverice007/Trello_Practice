// 获取所需的DOM元素
const cardContainer = document.getElementById('cardContainer');
const addCardButton = document.getElementById('addCardButton');

// 添加新增卡片的功能
addCardButton.addEventListener('click', function () {
  const cardTitle = prompt('请输入卡片标题：'); // 弹出输入框，获取标题文本
  if (cardTitle) {
    createCard(cardTitle); // 创建新卡片，并传入标题文本
  }
});

// 添加更改卡片标题的功能
cardContainer.addEventListener('click', function (event) {
  const card = event.target; // 获取被点击的卡片元素
  if (card.classList.contains('card')) {
    const newTitle = prompt('请输入新的卡片标题：'); // 弹出输入框，获取新标题文本
    if (newTitle) {
      card.querySelector('.card-title').textContent = newTitle; // 更新卡片标题
    }
  }
});

// 创建新卡片的函数
function createCard(title) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<h3 class="card-title">${title}</h3>`;
  cardContainer.appendChild(card);
}
