<?php
require_once 'conexao.php';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['title']) || empty($data['imageUrl']) || empty($data['subtitle'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit();
}

try {
    $sql_obra = "INSERT INTO obras (titulo_obra, nome_artista, url_imagem, movimento_id) VALUES (:titulo_obra, :nome_artista, :url_imagem, :movimento_id)";
    $stmt_obra = $pdo->prepare($sql_obra);
    
    $stmt_obra->execute([
        ':titulo_obra' => $data['subtitle'],
        ':nome_artista' => 'Artista Desconhecido',
        ':url_imagem' => $data['imageUrl'],
        ':movimento_id' => 1 
    ]);
    
    $novaObraId = $pdo->lastInsertId();

    $sql_analise = "INSERT INTO analises (titulo_analise, conteudo_analise, nome_autor, obra_id) VALUES (:titulo_analise, :conteudo_analise, :nome_autor, :obra_id)";
    $stmt_analise = $pdo->prepare($sql_analise);
    
    $stmt_analise->execute([
        ':titulo_analise' => $data['title'],
        ':conteudo_analise' => $data['subtitle'],
        ':nome_autor' => 'Visitante',
        ':obra_id' => $novaObraId 
    ]);

    echo json_encode(['success' => true, 'message' => 'Card criado com sucesso!']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>