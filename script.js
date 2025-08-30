document.addEventListener('DOMContentLoaded', () => {

    const showFormBtn = document.getElementById('show-form-btn');
    const createCardForm = document.getElementById('create-card-form');
    const cardContainer = document.getElementById('card-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    showFormBtn.addEventListener('click', () => {
        createCardForm.classList.toggle('hidden');
    });

    createCardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const imageUrl = document.getElementById('image-url').value;
        const movementSelect = document.getElementById('movement');
        const movementValue = movementSelect.value;
        const movementText = movementSelect.options[movementSelect.selectedIndex].text;

        const newCardHTML = `
            <article class="post-card" data-category="${movementValue}">
                <div class="card-image">
                    <a href="#"><img src="${imageUrl || 'https://via.placeholder.com/250x200'}" alt="${title}"></a>
                </div>
                <div class="card-content">
                    <button class="delete-btn">&times;</button>
                    <div class="card-tag"><a href="#">${movementText}</a></div>
                    <h2 class="card-title"><a href="#">${title}</a></h2>
                    <p class="card-excerpt">${subtitle}</p>
                    <a href="#" class="read-more">Ler análise completa &rarr;</a>
                </div>
            </article>
        `;

        cardContainer.insertAdjacentHTML('afterbegin', newCardHTML);
        createCardForm.reset();
        createCardForm.classList.add('hidden');
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            const cards = document.querySelectorAll('.post-card');
            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    cardContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const cardToDelete = e.target.closest('.post-card');
            
            cardToDelete.classList.add('hidden');

            setTimeout(() => {
                cardToDelete.remove();
            }, 400);
        }
    });
});