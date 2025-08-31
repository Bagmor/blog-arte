<?php
$host = 'localhost';
$db_name = 'blog_arte_db';
$username = 'blog_user';
$password = 'senha1234'; // A senha do usuário do banco
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
    // Em um site de produção, você logaria o erro em vez de exibi-lo
    die("Erro de conexão com o banco de dados: " . $e->getMessage());
}
?>