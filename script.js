document.addEventListener('DOMContentLoaded', () => {

    // --- PARTE 1: LÓGICA DO FORMULÁRIO ---
    const showFormBtn = document.getElementById('show-form-btn');
    const createCardForm = document.getElementById('create-card-form');
    const cardContainer = document.getElementById('card-container');

    // Inicialmente, garantimos que o formulário comece escondido
    createCardForm.classList.add('hidden');
    createCardForm.style.maxHeight = '0'; // Define a altura máxima inicial para a animação

    // Evento para mostrar/esconder o formulário
    showFormBtn.addEventListener('click', () => {
        const isHidden = createCardForm.classList.contains('hidden');
        if (isHidden) {
            createCardForm.classList.remove('hidden');
            createCardForm.style.maxHeight = '500px'; // Altura suficiente para o form aparecer
        } else {
            createCardForm.classList.add('hidden');
            createCardForm.style.maxHeight = '0';
        }
    });

    // Evento para criar o card quando o formulário é enviado
    createCardForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // 1. Pega os valores dos campos do formulário
        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const imageUrl = document.getElementById('image-url').value;
        const movementSelect = document.getElementById('movement');
        const movementValue = movementSelect.value; // ex: "renascimento"
        const movementText = movementSelect.options[movementSelect.selectedIndex].text; // ex: "Renascimento"

        // 2. Cria o HTML para o novo card usando os valores
        const newCardHTML = `
            <article class="post-card" data-category="${movementValue}">
                <div class="card-image">
                    <a href="#"><img src="${imageUrl || 'https://via.placeholder.com/250x200'}" alt="${title}"></a>
                </div>
                <div class="card-content">
                    <div class="card-tag"><a href="#">${movementText}</a></div>
                    <h2 class="card-title"><a href="#">${title}</a></h2>
                    <p class="card-excerpt">${subtitle}</p>
                    <a href="#" class="read-more">Ler análise completa &rarr;</a>
                </div>
            </article>
        `;

        // 3. Insere o novo card no início da lista de cards
        cardContainer.insertAdjacentHTML('afterbegin', newCardHTML);

        // 4. Limpa e esconde o formulário
        createCardForm.reset();
        createCardForm.classList.add('hidden');
        createCardForm.style.maxHeight = '0';
    });


    // --- PARTE 2: LÓGICA DA FILTRAGEM (CORRIGIDA) ---
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Atualiza o botão ativo no menu
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            // Pega a lista ATUALIZADA de cards, incluindo os novos que foram criados
            const cards = document.querySelectorAll('.post-card');

            // Itera sobre cada card para mostrar ou esconder
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