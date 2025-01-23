// Função para carregar o carrinho do localStorage
function loadFinalCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      updateFinalCart(cartItems); // Atualiza o carrinho final com os dados carregados
    }
  }
  
  // Função para atualizar o carrinho na página de finalização
  function updateFinalCart(cartItems) {
    const cartItemsContainer = document.getElementById("final-cart-items");
    const totalPriceElement = document.getElementById("final-total-price");
  
    // Limpa os itens anteriores
    cartItemsContainer.innerHTML = "";
  
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = `<p class="cart-vazio">Seu carrinho está vazio!</p>`;
      totalPriceElement.textContent = "Total: R$ 0,00";
      return; // Se estiver vazio, retorna
    }
  
    let total = 0;
    cartItems.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("final-cart-item");
  
      // Convertendo preço para número
      const itemPrice = parseFloat(item.price.replace(',', '.'));
  
      cartItem.innerHTML = `
        <img class="final-cart-item-img" src="${item.img}" />
        <div class="final-cart-item-name">${item.name}</div>
        <div class="final-cart-item-price">R$ ${(itemPrice * item.quantity).toFixed(2)}</div>
        <div class="final-cart-item-quantity">Quantidade: ${item.quantity}</div>
      `;
  
      cartItemsContainer.appendChild(cartItem);
      total += itemPrice * item.quantity;
    });
  
    totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;
  }
  
  // Chama a função ao carregar a página
  document.addEventListener('DOMContentLoaded', loadFinalCart);
  
  // Função para confirmar a compra
  document.getElementById('confirm-purchase').addEventListener('click', function() {
    alert("Compra confirmada! Obrigado por sua compra.");
    // Limpa o carrinho após a compra ser confirmada
    localStorage.removeItem('cartItems');
  });
  