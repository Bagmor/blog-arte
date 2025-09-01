# Fase 1: Preparação e Acesso Inicial

Olá! Antes testar o Ubuntu Server, eu implementei na AWS Linux e eu tive alguns problemas no envio dos dados, então eu deixei os arquivos já no github, porém quando eu mudei para outra instância Ubuntu Server , ainda tive problemas , e os dados estavam em conflito, então desconsidere o os arquivos da pasta phpMyAdmin


Antes de executar qualquer comando no servidor, você precisa criar e configurar a instância na AWS.

**Criar a Instância EC2:** No painel da AWS, iniciando uma nova instância EC2, selecione a AMI "Ubuntu Server" .

**Configurar a Regra de Entrada:** Adicione uma Regra de Entrada com as seguintes configurações:
* **Tipo:** HTTP
* **Protocolo:** TCP
* **Intervalo de Portas:** 80
* **Origem:** Anywhere-IPv4 (0.0.0.0/0)

A mesma coisa da aws linux...

**Conectar via SSH:** Use a chave .pem fornecida pela AWS para se conectar

# Fase 2: Instalação da Stack LAMP e Git

```bash
# 1. Atualiza a lista de pacotes e o sistema para as versões mais recentes
sudo apt update && sudo apt upgrade -y

# 2. Instala o Apache, MariaDB , PHP , módulos de conexão do PHP e o Git de uma só vez.
sudo apt install -y apache2 mariadb-server php libapache2-mod-php php-mysql git
```

# Fase 3: Configuração do Banco de Dados (MariaDB)

(Responda às perguntas: defina uma senha de root forte e responda "Y" (sim) para as outras).

```bash
# Este comando define uma senha para o root, para ter certeza que vai funcionar utilize senha1234
sudo mysql_secure_installation

# Acesse o MariaDB como root.
sudo mysql -u root -p
```

# Fase 4: Github

Clone o projeto do GitHub e faça os ajustes finais de configuração.

```bash
# 1. Apaga e recria a pasta do site
sudo rm -rf /var/www/html
sudo mkdir /var/www/html

# 2. Clona o repositório do GitHub para a pasta recém-criada
#    (Substitua pela URL do seu repositório)
sudo git clone https://github.com/Bagmor/blog-arte.git /var/www/html/

# 3. Edita o arquivo de conexão para usar a senha correta do banco de dados
#    Dentro do editor, mude a linha da senha para: $password = 'senha1234';
sudo nano /var/www/html/conexao.php

# 4. Define o usuário do Apache no Ubuntu (www-data) como dono de todos os arquivos
sudo chown -R www-data:www-data /var/www/html/

# 5. Reinicia o Apache para aplicar todas as configurações
sudo systemctl restart apache2
```

# Instalação phpMyAdmin no Ubuntu

### Passo 1: Instale o phpMyAdmin no Ubuntu

```bash
# O processo no Ubuntu é um pouco diferente. Execute este comando:
sudo apt install -y phpmyadmin
```
Atenção: Durante a instalação, uma tela de configuração azul aparecerá no seu terminal.Ele vai perguntar qual servidor web reconfigurar. Use as setas, navegue até apache2, e pressione a Barra de Espaço para selecioná-lo (um * deve aparecer). Depois, pressione Enter.
Na próxima tela, ele vai perguntar sobre "configurar banco de dados". Selecione <Sim> e pressione Enter.
Ele vai pedir para você criar uma senha para o próprio phpMyAdmin. Pode deixar em branco e pressionar Enter para ele gerar uma aleatória.
```bash
# Depois da instalação, ative um módulo do PHP necessário e reinicie o Apache:
sudo phpenmod mbstring
sudo systemctl restart apache2
```

### Passo 2: Crie o Banco de Dados e o Usuário (via phpMyAdmin)

Acesse o phpMyAdmin no seu navegador
Faça login com o usuário root e a senha que você definiu.
Clique na aba "SQL".
Execute os dois comandos SQL abaixo. O primeiro apaga completamente o banco de dados antigo e o segundo recria tudo do zero, sem erros.

## Execute o comandos SQL abaixo. 
O primeiro apaga completamente o banco de dados antigo e o segundo recria tudo do zero, sem erros.

```sql
DROP DATABASE IF EXISTS `blog_arte_db`;
```
Depois de executar o comando acima, cole e execute o completo.
```sql
CREATE DATABASE IF NOT EXISTS blog_arte_db;
CREATE USER IF NOT EXISTS 'blog_user'@'localhost' IDENTIFIED BY 'SenhaFinal123';
GRANT ALL PRIVILEGES ON blog_arte_db.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;
USE blog_arte_db;
CREATE TABLE IF NOT EXISTS `movimentos_arte` ( `id` INT AUTO_INCREMENT PRIMARY KEY, `nome_movimento` VARCHAR(100) NOT NULL, `slug` VARCHAR(100) NOT NULL UNIQUE );
CREATE TABLE IF NOT EXISTS `obras` ( `id` INT AUTO_INCREMENT PRIMARY KEY, `titulo_obra` VARCHAR(255) NOT NULL, `nome_artista` VARCHAR(255) NOT NULL, `ano_criacao` VARCHAR(50), `url_imagem` VARCHAR(255) NOT NULL, `movimento_id` INT, FOREIGN KEY (`movimento_id`) REFERENCES `movimentos_arte`(`id`) );
CREATE TABLE IF NOT EXISTS `analises` ( `id` INT AUTO_INCREMENT PRIMARY KEY, `titulo_analise` VARCHAR(255) NOT NULL, `conteudo_analise` TEXT, `nome_autor` VARCHAR(100), `data_publicacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, `obra_id` INT, FOREIGN KEY (`obra_id`) REFERENCES `obras`(`id`) );
INSERT INTO `movimentos_arte` (`id`, `nome_movimento`, `slug`) VALUES (1, 'Renascimento', 'renascimento');
INSERT INTO `obras` (`id`, `titulo_obra`, `nome_artista`, `url_imagem`, `movimento_id`) VALUES (1, 'O Nascimento de Vênus', 'Sandro Botticelli', '[https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/800px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/800px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg)', 1);
INSERT INTO `analises` (`titulo_analise`, `obra_id`) VALUES ('A Simbologia Oculta em ''O Nascimento de Vênus''', 1);
```

### Passo 3: Sincronize a Senha no Código

No terminal , acesse o Maria DB , use a senha que você definiu (senha1234).

```bash
#Acesse o MariaDB como root:
sudo mysql -u root -p

#Execute o comando abaixo. Ele vai forçar a senha do blog_user a ser SenhaFinal123
ALTER USER 'blog_user'@'localhost' IDENTIFIED BY 'senha1234';
FLUSH PRIVILEGES;
EXIT;
```

No terminal do seu servidor Ubuntu, edite o arquivo index.php
```bash
sudo nano /var/www/html/index.php
```
```php
#Encontre a linha da senha e mude-a para ser **exatamente** a mesma do script SQL:
$password = 'senha1234';
```
```bash
#Salve, saia (Ctrl+X, Y, Enter) e reinicie o Apache pela última vez.
sudo systemctl restart apache2
```

E se tudo aconteceu como deveria , funcinou! 
