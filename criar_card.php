<?php
// Inclui nosso arquivo de conexão com o banco de dados
require_once 'conexao.php';

// Pega os dados JSON que o JavaScript enviou
$data = json_decode(file_get_contents('php://input'), true);

// Validação simples para garantir que recebemos um título
if (empty($data['title'])) {
    http_response_code(400); // Erro de "Requisição Inválida"
    echo json_encode(['success' => false, 'message' => 'O título é obrigatório.']);
    exit(); // Para a execução
}

try {
    // Para este exemplo, vamos assumir que toda nova análise é sobre a Obra de ID = 1
    // (O Nascimento de Vênus). Um sistema completo teria uma seleção de obras.
    $obra_id_fixo = 1; 

    // Comando SQL com "prepared statements" para segurança máxima contra SQL Injection
    $sql = "INSERT INTO analises (titulo_analise, conteudo_analise, nome_autor, obra_id) VALUES (:titulo, :conteudo, :autor, :obra_id)";

    $stmt = $pdo->prepare($sql);

    // Executa o comando, trocando os placeholders (:titulo, etc.) pelos dados reais
    $stmt->execute([
        ':titulo' => $data['title'],
        ':conteudo' => $data['subtitle'],
        ':autor' => 'Visitante', // Podemos definir um autor padrão
        ':obra_id' => $obra_id_fixo
    ]);

    // Se a execução foi bem-sucedida, envia uma resposta de sucesso
    echo json_encode(['success' => true, 'message' => 'Card criado com sucesso!']);

} catch (PDOException $e) {
    // Se deu algum erro no banco, envia uma resposta de erro
    http_response_code(500); // Erro Interno do Servidor
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar no banco de dados.']);
}
?>

