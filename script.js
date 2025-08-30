// Aguarda o conteúdo da página ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os cards de post
    const cards = document.querySelectorAll('.post-card');

    // Configura o "observador" que vai verificar quando um elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o card estiver visível na tela (intersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' para ativar a animação
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do card estiver visível
    });

    // Pede ao observador para "observar" cada um dos cards
    cards.forEach(card => {
        observer.observe(card);
    });
});