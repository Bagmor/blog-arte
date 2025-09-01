<?php
// Habilita a exibição de TODOS os erros, forçadamente.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- CÓDIGO DE CONEXÃO DO NOSSO TESTE ---
$host = 'localhost';
$db_name = 'blog_arte_db';
$username = 'blog_user';
$password = 'senha1234'; // <-- COLOQUE A SENHA CORRETA DO blog_user AQUI
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
    die("FALHA NA CONEXÃO DENTRO DO INDEX.PHP: " . $e->getMessage());
}
// --- FIM DO CÓDIGO DE CONEXÃO ---

// O resto do seu site
$stmt_menu = $pdo->query("SELECT nome_movimento, slug FROM movimentos_arte ORDER BY nome_movimento ASC");
$movimentos = $stmt_menu->fetchAll();
$sql_posts = "SELECT analises.id, analises.titulo_analise, obras.titulo_obra, obras.nome_artista, obras.url_imagem, movimentos_arte.nome_movimento, movimentos_arte.slug AS movimento_slug FROM analises JOIN obras ON analises.obra_id = obras.id JOIN movimentos_arte ON obras.movimento_id = movimentos_arte.id ORDER BY analises.data_publicacao DESC";
$stmt_posts = $pdo->query($sql_posts);
$posts = $stmt_posts->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><title>Fragmentos de Tela</title><link rel="stylesheet" href="style.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header class="main-header">
            <div class="logo"><h1><a href="index.php">Fragmentos de Tela</a></h1><p>Análises e teorias sobre obras de arte.</p></div>
            <nav class="main-nav">
                <ul>
                    <li><a href="#" class="filter-btn active" data-filter="all">Todos</a></li>
                    <?php foreach ($movimentos as $movimento): ?>
                        <li><a href="#" class="filter-btn" data-filter="<?= htmlspecialchars($movimento['slug']) ?>"><?= htmlspecialchars($movimento['nome_movimento']) ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </nav>
        </header>
        <section class="creator-section">
            <button id="show-form-btn">Criar Novo Card +</button>
            <form id="create-card-form" class="hidden">
                <h3>Adicionar Nova Análise</h3>
                <div class="form-group"><label for="title">Título da Análise</label><input type="text" id="title" required></div>
                <div class="form-group"><label for="subtitle">Subtítulo (Obra e Artista)</label><input type="text" id="subtitle" required></div>
                <div class="form-group"><label for="image-url">URL da Imagem</label><input type="url" id="image-url" required></div>
                <div class="form-grup"><label for="movement">Movimento Artístico</label>
                    <select id="movement">
                        <?php foreach ($movimentos as $movimento): ?>
                           <option value="<?= htmlspecialchars($movimento['slug']) ?>"><?= htmlspecialchars($movimento['nome_movimento']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <button type="submit">Adicionar Card</button>
            </form>
        </section>
        <main id="card-container">
            <?php foreach ($posts as $post): ?>
                <article class="post-card" data-category="<?= htmlspecialchars($post['movimento_slug']) ?>" data-id="<?= htmlspecialchars($post['id']) ?>">
                    <div class="card-image"><a href="#"><img src="<?= htmlspecialchars($post['url_imagem']) ?>" alt="<?= htmlspecialchars($post['titulo_obra']) ?>"></a></div>
                    <div class="card-content">
                        <button class="delete-btn">&times;</button>
                        <div class="card-tag"><a href="#"><?= htmlspecialchars($post['nome_movimento']) ?></a></div>
                        <h2 class="card-title"><a href="#"><?= htmlspecialchars($post['titulo_analise']) ?></a></h2>
                        <p class="card-excerpt">Análise sobre a obra "<?= htmlspecialchars($post['titulo_obra']) ?>" de <?= htmlspecialchars($post['nome_artista']) ?>.</p>
                        <a href="#" class="read-more">Ler análise completa &rarr;</a>
                    </div>
                </article>
            <?php endforeach; ?>
        </main>
        <footer class="main-footer"><p>&copy; 2025 - Fragmentos de Tela</p></footer>
    </div>
    <script src="js/script.js" defer></script>
</body>
</html>
