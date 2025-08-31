document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById('show-form-btn');
    const createCardForm = document.getElementById('create-card-form');
    const cardContainer = document.getElementById('card-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (createCardForm) {
        createCardForm.classList.add('hidden');
    }

    if (showFormBtn) {
        showFormBtn.addEventListener('click', () => {
            createCardForm.classList.toggle('hidden');
        });
    }

    if (createCardForm) {
        createCardForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const cardData = {
                title: document.getElementById('title').value,
                subtitle: document.getElementById('subtitle').value,
                imageUrl: document.getElementById('image-url').value,
                movement: document.getElementById('movement').value
            };

            fetch('criar_card.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cardData) // Converte os dados para JSON
            })
            .then(response => response.json()) // Converte a resposta do PHP
            .then(data => {
                if (data.success) {
                    alert('Card salvo no banco de dados com sucesso!');

                    location.reload();
                } else {
                    alert('Erro ao salvar o card: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Erro de comunicação:', error);
                alert('Não foi possível conectar ao servidor.');
            });
        });
    }

    // --- FILTRAGEM DOS CARDS ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            
            document.querySelectorAll('.post-card').forEach(card => {
                const isVisible = (filter === 'all' || card.dataset.category === filter);
                card.classList.toggle('hidden', !isVisible);
            });
        });
    });

    // --- EXCLUSÃO DE CARD ---
    if (cardContainer) {
        cardContainer.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                const cardToDelete = deleteBtn.closest('.post-card');
                const cardId = cardToDelete.dataset.id; // Pega o ID único do card

                if (confirm('Tem certeza que deseja excluir este card permanentemente?')) {
                    fetch('excluir_card.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: cardId }) // Envia o ID
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {

                            cardToDelete.classList.add('hidden');
                            setTimeout(() => cardToDelete.remove(), 400);
                        } else {
                            alert('Erro ao excluir o card: ' + data.message);
                        }
                    })
                    .catch(error => console.error('Erro de comunicação:', error));
                }
            }
        });
    }
});