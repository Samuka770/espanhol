<?php
session_start();

if(isset($_POST['id'])) {
    $produto = array(
        'id' => $_POST['id'],
        'nome' => $_POST['nome'],
        'preco' => $_POST['preco'],
        'quantidade' => $_POST['quantidade']
    );

    // Adiciona o produto ao carrinho
    $_SESSION['carrinho'][] = $produto;
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrinho de Compras - Vinhos do Vale</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Carrinho de Compras - Vinhos do Vale</h1>
        <a href="index.html">Continuar Comprando</a>
    </header>
    <div class="container">
        <h2>Produtos no Carrinho:</h2>
        <?php
        $total = 0;
        if(isset($_SESSION['carrinho'])) {
            foreach($_SESSION['carrinho'] as $produto) {
                $subtotal = $produto['preco'] * $produto['quantidade'];
                $total += $subtotal;
                echo '<div class="produto">';
                echo '<h3>' . $produto['nome'] . '</h3>';
                echo '<p>Quantidade: ' . $produto['quantidade'] . '</p>';
                echo '<p>Subtotal: R$ ' . number_format($subtotal, 2, ',', '.') . '</p>';
                echo '</div>';
            }
        }
        ?>
        <h3>Total: R$ <?php echo number_format($total, 2, ',', '.'); ?></h3>
    </div>
</body>
</html>
