// Espera todo o HTML da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Seleciona os elementos importantes da página ---
    const showFormBtn = document.getElementById('show-form-btn');
    const createCardForm = document.getElementById('create-card-form');
    const cardContainer = document.getElementById('card-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- LÓGICA PARA MOSTRAR E ESCONDER O FORMULÁRIO ---
    showFormBtn.addEventListener('click', () => {
        // A cada clique, ele adiciona ou remove a classe 'hidden' do formulário
        createCardForm.classList.toggle('hidden');
    });

    // --- LÓGICA PARA CRIAR UM NOVO CARD ---
    createCardForm.addEventListener('submit', (e) => {
        // Impede que o formulário recarregue a página, que é o comportamento padrão
        e.preventDefault();

        // 1. Pega os valores que o usuário digitou nos campos
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const imageUrl = document.getElementById('image-url').value;
        const movementSelect = document.getElementById('movement');
        const movementValue = movementSelect.value;
        const movementText = movementSelect.options[movementSelect.selectedIndex].text;

        // 2. Monta o HTML do novo card com os valores
        const newCardHTML = `
            <article class="post-card" data-category="${movementValue}">
                <div class="card-image">
                    <a href="#"><img src="${imageUrl}" alt="${title}"></a>
                </div>
                <div class="card-content">
                    <div class="card-tag"><a href="#">${movementText}</a></div>
                    <h2 class="card-title"><a href="#">${title}</a></h2>
                    <p class="card-excerpt">${subtitle}</p>
                    <a href="#" class="read-more">Ler análise completa &rarr;</a>
                </div>
            </article>
        `;

        // 3. Adiciona o HTML do novo card no início do container
        cardContainer.insertAdjacentHTML('afterbegin', newCardHTML);

        // 4. Limpa os campos do formulário e esconde ele de novo
        createCardForm.reset();
        createCardForm.classList.add('hidden');
    });

    // --- LÓGICA PARA FILTRAR OS CARDS ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            // Pega a lista de cards que existem NAQUELE MOMENTO
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
});