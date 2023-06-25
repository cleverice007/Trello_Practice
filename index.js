const add_card = document.querySelector('.add-card')
const card_body = document.querySelector('.card-body')

add_card.addEventListener('click', () => {
  const card_content = document.createElement('div');
  card_content.classList.add('card', 'card-content');
  card_content.innerHTML = `<textarea id="textarea" rows="1" cols="10"></textarea>`;

  const textarea = card_content.querySelector('#textarea');
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
      }
    }
  });

  card_body.appendChild(card_content);
});
