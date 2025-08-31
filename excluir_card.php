<?php
require_once 'conexao.php';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID do card não fornecido.']);
    exit();
}

try {
    $sql = "DELETE FROM analises WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    
    $stmt->execute([':id' => $data['id']]);
    
    echo json_encode(['success' => true, 'message' => 'Card excluído com sucesso.']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>