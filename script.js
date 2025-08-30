document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA MOSTRAR/ESCONDER O FORMULÁRIO ---
    const showFormBtn = document.getElementById('show-form-btn');
    const createCardForm = document.getElementById('create-card-form');

    showFormBtn.addEventListener('click', () => {
        createCardForm.classList.toggle('hidden');
    });

    // --- LÓGICA PARA A FILTRAGEM DOS CARDS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.post-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o link de pular a página

            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão clicado
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Itera sobre cada card para decidir se ele deve ser mostrado ou escondido
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