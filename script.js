// Função para exibir ou esconder o conteúdo do dropdown
window.dropdownmenu = function () {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
};

document.getElementById("dropdownButton").addEventListener("click", function () {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
});

// Fechar o dropdown se o usuário clicar fora
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};





/* CLUBE DO VINHO */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');

  // Função para exibir a notificação (toast)
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    // Adiciona o toast ao container
    toastContainer.appendChild(toast);

    // Mostra o toast com a animação
    setTimeout(() => {
      toast.classList.add('show');
    }, 100); // Um pequeno delay para a animação começar

    // Remove o toast após 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400); // Remove o toast após a animação
    }, 3000);
  }

  // Função para enviar o e-mail com o EmailJS
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const mensagem = document.getElementById('mensagem').value;

    const emailParams = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      telefone: telefone,
      endereco: endereco,
      mensagem: mensagem
    };

    // Enviar o e-mail para a empresa usando EmailJS
    emailjs.send('service_zi0ie1w', 'template_lpd6bae', emailParams, '6jBbgvQWCrIxP0Pku')
      .then(function(response) {
        showToast('Mensagem enviada com sucesso!');
        document.getElementById('cadastroForm').reset(); // Limpa o formulário após o envio

        // Enviar e-mail de confirmação para o usuário
        const confirmationParams = {
          to_email: email, // Email do usuário
          to_name: nome,
          subject: 'Clube do Vinho',
          message: `Olá ${nome},\n\nSua mensagem foi recebida com sucesso!\nAgradecemos por entrar em contato conosco. Em breve, retornaremos a você.\n\nAtenciosamente,\nEquipe Rioja Luxury Wines`
        };

        // Enviar e-mail de confirmação para o usuário
        emailjs.send('service_zi0ie1w', 'template_confirmation', confirmationParams, '6jBbgvQWCrIxP0Pku')
          .then(function(response) {
            console.log('E-mail de confirmação enviado ao usuário');
          }, function(error) {
            console.error('Erro ao enviar o e-mail de confirmação: ' + error.text);
          });

      }, function(error) {
        showToast('Erro ao enviar a mensagem: ' + error.text);
      });
  });
});

// POP UP
document.addEventListener('DOMContentLoaded', () => {
  // Elementos do popup e ícone
  const popup = document.getElementById('popupMessage');
  const infoIcon = document.getElementById('infoIcon');
  const closeBtn = document.getElementById('closeBtn');

  // Quando o ícone de exclamação for clicado, abre o popup
  infoIcon.addEventListener('click', () => {
      popup.style.display = 'block';
  });

  // Quando o botão de fechar for clicado, fecha o popup
  closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
  });

  // Fecha o popup se o usuário clicar fora do conteúdo
  window.addEventListener('click', (event) => {
      if (event.target === popup) {
          popup.style.display = 'none';
      }
  });

  // Formulário e envio de mensagem
  const form = document.getElementById('cadastroForm');
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const nome = document.getElementById('nome').value;
      const sobrenome = document.getElementById('sobrenome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const endereco = document.getElementById('endereco').value;
      const mensagem = document.getElementById('mensagem').value;

      const emailParams = {
          nome: nome,
          sobrenome: sobrenome,
          email: email,
          telefone: telefone,
          endereco: endereco,
          mensagem: mensagem
      };

      // Enviar o e-mail usando EmailJS (requer configuração adequada)
      emailjs.send('service_zi0ie1w', 'template_lpd6bae', emailParams, '6jBbgvQWCrIxP0Pku')
          .then(function(response) {
              alert('Mensagem enviada com sucesso!');
              form.reset(); // Limpa o formulário após o envio
          }, function(error) {
              alert('Erro ao enviar a mensagem: ' + error.text);
          });
  });
});








// Função para normalizar e tratar apóstrofos, espaços e caracteres especiais
function normalizeString(str) {
  return str
    .normalize("NFD") // Normaliza para separação de caracteres base e acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .replace(/[\s’']/g, "") // Remove espaços e apóstrofos
    .toLowerCase(); // Converte para minúsculas
}

// Função principal para aplicar filtros (tipo, preço e pesquisa por nome)
function applyFilters() {
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const allVinhos = document.querySelectorAll('.produtovinho');
  const searchInput = document.getElementById('txtBusca').value;
  const precoFaixa = document.getElementById('precoFaixa').value;
  const normalizedSearch = normalizeString(searchInput); // Normaliza a pesquisa

  // Coleta os filtros ativos de tipo
  const activeFilters = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked && checkbox.getAttribute('data-filter') !== 'todos')
    .map(checkbox => checkbox.getAttribute('data-filter'));

  // Aplica os filtros em todos os vinhos
  allVinhos.forEach(vinho => {
    const vinhoType = vinho.getAttribute('data-type'); // Tipo do vinho
    const vinhoName = normalizeString(vinho.querySelector('.vinho-item--name').textContent); // Nome do vinho
    const vinhoPrice = parseFloat(vinho.querySelector('.vinho-item--price').textContent.replace('R$', '').replace(',', '.').trim()); // Preço do vinho

    // Verifica os filtros de tipo
    const typeMatch = activeFilters.length === 0 || activeFilters.includes(vinhoType);
    
    // Filtro de preço
    let priceMatch = true;
    if (precoFaixa !== 'todos') {
      const [minPrice, maxPrice] = precoFaixa.split('-').map(Number);
      if (precoFaixa === '500+' && vinhoPrice <= 500) {
        priceMatch = false;
      } else if (vinhoPrice < minPrice || (maxPrice && vinhoPrice > maxPrice)) {
        priceMatch = false;
      }
    }

    // Filtro de pesquisa por nome
    const nameMatch = normalizedSearch === '' || vinhoName.includes(normalizedSearch);

    // Exibe o vinho se passar por todos os filtros
    if (typeMatch && priceMatch && nameMatch) {
      vinho.style.display = 'block';
    } else {
      vinho.style.display = 'none';
    }
  });
}

// Configuração de eventos para filtros e pesquisa
document.addEventListener('DOMContentLoaded', () => {
  // Renderiza todos os vinhos inicialmente
  displayVinhos(vinhos);

  // Configura os eventos de filtro
  configureFilterEvents();

  // Configura o evento de pesquisa
  const searchInput = document.getElementById('txtBusca');
  searchInput.addEventListener('input', applyFilters);

  // Configura o evento de alteração na faixa de preço
  const precoFaixaSelect = document.getElementById('precoFaixa');
  precoFaixaSelect.addEventListener('change', applyFilters);

  // Aplica os filtros no carregamento inicial
  applyFilters();
});

// Função para configurar os eventos dos filtros de tipo
function configureFilterEvents() {
  const checkboxes = document.querySelectorAll('.filter-checkbox');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const isTodos = this.getAttribute('data-filter') === 'todos';

      if (isTodos) {
        // Se "Todos" for marcado, desmarca os outros
        checkboxes.forEach(cb => {
          if (cb !== this) cb.checked = false;
        });
      } else {
        // Se outro filtro for marcado, desmarca "Todos"
        document.querySelector('.filter-checkbox[data-filter="todos"]').checked = false;
      }

      // Aplica os filtros
      applyFilters();
    });
  });
}

// Função para exibir todos os vinhos
function displayVinhos(vinhos) {
  const container = document.querySelector('#produtos-container');
  container.innerHTML = ''; // Limpa o container antes de renderizar os vinhos

  // Verifica se o container existe
  if (!container) {
    console.error("Container não encontrado!");
    return;
  }

  // Renderiza cada vinho no container
  vinhos.forEach(vinho => {
    const produtoHTML = `
      <div class="produtovinho" data-type="${vinho.type}" data-id="${vinho.id}">
        <a href="${vinho.href}" class="visual">Visualização Prévia</a>
        <div class="vinho-item--img">
          <img class="vinho-item--img-style" src="${vinho.img}" />
        </div>
        <div class="vinho-item--name">${vinho.name}</div>
        <div class="vinho-item--price">R$ ${vinho.price}</div>
        <div class="vinho-item--add" data-id="${vinho.id}">Adicionar ao Carrinho</div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', produtoHTML);
  });
}



















// Dados dos vinhos
const vinhos = [
  { id: '1', href: '/html/vinhos/vinhomarques.html', name: 'Marques de Arviza Sel/Esp', img: '/img/vinhomarques.png', price: '322,00', type: 'espumante' },
  { id: '2', href: '/html/vinhos/vinhomarialuisa.html', name: 'Viña Maria Luisa', img: '/img/vinhomarialuisa.png', price: '159,00', type: 'tinto' },
  { id: '3', href: '/html/vinhos/vinhomarsotinto.html', name: 'Marso’Clásico Tinto', img: '/img/vinhomarsotinto.png', price: '75,00', type: 'tinto' },
  { id: '4', href: '/html/vinhos/vinhomarsobranco.html', name: 'Marso’Clásico Branco', img: '/img/vinhomarsobranco.png', price: '75,00', type: 'branco' },
  { id: '5', href: '/html/vinhos/vinhomarsorose.html', name: 'Marso’Clásico Rosé', img: '/img/vinhomarsorose.png', price: '75,00', type: 'rose' },
  { id: '6', href: '/html/vinhos/vinhocapitanfanegasss.html', name: 'Capitan Fanegas Sel/Esp', img: '/img/vinhocapitanfanegasseleccionespecial.png', price: '550,00', type: 'espumante' },
  { id: '7', href: '/html/vinhos/vinhocapitanfanegasbranco.html', name: 'Capitan Fanegas Branco', img: '/img/vinhocapitanfanegasbranco.png', price: '550,00', type: 'branco' },
  { id: '8', href: '/html/vinhos/vinhoilurcebranco.html', name: 'Ilurce Branco', img: '/img/vinhoilurcebranco.png', price: '119,00', type: 'branco' },
  { id: '9', href: '/html/vinhos/vinhoilurcerosado.html', name: 'Ilurce Rosado', img: '/img/vinhoilurcerosado.png', price: '119,00', type: 'rose' },
  { id: '10', href: '/html/vinhos/vinhoilurcecrianza.html', name: 'Ilurce Crianza', img: '/img/vinhoilurcecrianza.png', price: '139,00', type: 'tinto' },
  { id: '11', href: '/html/vinhos/vinhoilurceangel.html', name: 'Ilurce Angel', img: '/img/vinhoilurceangel.png', price: '155,00', type: 'tinto' },
];


// Armazenar os itens do carrinho
let cartItems = [];

// Seleciona o contêiner onde os produtos serão inseridos
const container = document.querySelector('#produtos-container');

/// Função para exibir todos os vinhos
function displayVinhos(vinhos) {
  const container = document.querySelector('#produtos-container');

  vinhos.forEach(vinho => {
    const produtoHTML = `
      <div class="produtovinho" data-type="${vinho.type}" data-id="${vinho.id}">
        <a href="${vinho.href}" class="visual">Visualização Prévia</a>
        <div class="vinho-item--img">
          <img class="vinho-item--img-style" src="${vinho.img}" />
        </div>
        <div class="vinho-item--name">${vinho.name}</div>
        <div class="vinho-item--price">R$ ${vinho.price}</div>
        <div class="vinho-item--add" data-id="${vinho.id}">Adicionar ao Carrinho</div>
      </div>
    `;
    // Adiciona o produto ao container sem sobrescrever o conteúdo
    container.insertAdjacentHTML('beforeend', produtoHTML);
  });
}


// Função para adicionar um vinho ao carrinho
function addToCart(vinhoId) {
  const vinho = vinhos.find(item => item.id === vinhoId);
  const existingItem = cartItems.find(item => item.id === vinho.id);

  if (existingItem) {
    existingItem.quantity += 1; // Incrementa a quantidade se o vinho já estiver no carrinho
  } else {
    vinho.quantity = 1; // Se o vinho não está no carrinho, a quantidade é 1
    cartItems.push(vinho); // Adiciona o vinho ao carrinho
  }

  updateCart(); // Atualiza o carrinho
}

// Função para atualizar a visualização do carrinho
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("totalPrice");

  // Limpa os itens anteriores
  cartItemsContainer.innerHTML = "";

  // Se o carrinho estiver vazio, exibe uma mensagem
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Seu carrinho está vazio! Continue comprando.</p>
        <a href="/html/loja.html" class="btn-continue">Ver Produtos</a>
      </div>
    `;
    totalPriceElement.textContent = "Total: R$ 0,00";
    return; // Se estiver vazio, não adiciona itens e retorna
  }

  // Adiciona os itens ao carrinho
  let total = 0;

  cartItems.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Converter preço para número e exibir
    const itemPrice = parseFloat(item.price.replace(',', '.')); // Converte preço para float

    // Determina se o botão de "Diminuir Quantidade" ou "Remover" deve ser exibido
    const removeOrDecreaseButton = item.quantity > 1
      ? `<button class="decrease-btn" data-id="${item.id}">-</button>`
      : `<button class="remove-btn" data-id="${item.id}">-</button>`;

    cartItem.innerHTML = `
      <img class="cart-item--img-style" src="${item.img}" />
      <div class="titulocarrinho">${item.name}</div>
      <div class="cart-item--price">R$ ${(itemPrice * item.quantity).toFixed(2)}</div>
      <div class="cart-buttons">
        ${removeOrDecreaseButton}
        <div class="quantity-btn">${item.quantity}</div>
        <button class="increase-btn" data-id="${item.id}">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
    total += itemPrice * item.quantity;
  });

  totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;

  // Adiciona os eventos de clique para os botões "Remover" e "Aumentar Quantidade"
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id');
      removeFromCart(itemId); // Chama a função para remover o item
    });
  });

  document.querySelectorAll('.decrease-btn').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id');
      decreaseQuantity(itemId); // Chama a função para diminuir a quantidade
    });
  });

  document.querySelectorAll('.increase-btn').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id');
      increaseQuantity(itemId); // Chama a função para aumentar a quantidade
    });
  });
}

// Função para remover um item do carrinho
function removeFromCart(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  saveCart(); // Salva o estado atualizado
  updateCart();
}

// Função para aumentar a quantidade
function increaseQuantity(id) {
  const item = cartItems.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    saveCart(); // Salva o estado atualizado
    updateCart();
  }
}

// Função para diminuir a quantidade
function decreaseQuantity(id) {
  const item = cartItems.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    saveCart(); // Salva o estado atualizado
    updateCart();
  } else if (item && item.quantity === 1) {
    removeFromCart(id);
  }
}

// Função para abrir e fechar o carrinho
const cartButton = document.getElementById("cart-button");
const cartContainer = document.getElementById("cart-container");
const closeCartButton = document.getElementById("close-cart-button");

cartButton.addEventListener("click", function() {
  // Alterna entre mostrar e esconder o carrinho
  if (cartContainer.style.display === "none" || cartContainer.style.display === "") {
    cartContainer.style.display = "block";  // Exibe o carrinho
    setTimeout(() => {
      cartContainer.style.width = "650px";  // Altera a largura após o display ser aplicado
    }, 10);  // Um pequeno delay para garantir que a transição funcione
  } else {
    cartContainer.style.width = "10px";  // Define a largura para a animação de fechamento
    setTimeout(() => {
      cartContainer.style.display = "none";  // Esconde o carrinho após a animação de fechamento
    }, 160);  // Aguarda a animação de fechamento (160ms, deve ser igual ao tempo da transição)
  }

  updateCart();  // Atualiza o carrinho quando ele é aberto
});

// Fecha o carrinho quando o botão "X" é clicado
closeCartButton.addEventListener("click", function() {
  cartContainer.style.width = "10px";  // Inicia a animação de fechamento
  setTimeout(() => {
    cartContainer.style.display = "none";  // Esconde o carrinho após a animação de fechamento
  }, 160);  // Aguarda a animação de fechamento (160ms)
});



// Adiciona o evento de "Adicionar ao Carrinho" aos botões
document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.vinho-item--add');
  
  addButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const vinhoId = this.getAttribute('data-id');
      addToCart(vinhoId);
    });
  });

  // Chama a função de filtragem e exibição ao carregar a página
  price_vinho(); // Exibe todos os vinhos inicialmente
});


// Funções para armazenamento de dados =================================

// Função para salvar o carrinho no localStorage
function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Atualize a função `addToCart` para incluir a chamada a `saveCart`
function addToCart(vinhoId) {
  const vinho = vinhos.find(item => item.id === vinhoId);
  const existingItem = cartItems.find(item => item.id === vinho.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    vinho.quantity = 1;
    cartItems.push(vinho);
  }

  saveCart(); // Salva o carrinho no localStorage
  updateCart(); // Atualiza o carrinho visual
}

// Função para carregar o carrinho do localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCart(); // Atualiza o carrinho visual com os dados carregados
  }
}

// Carrega o carrinho quando a página é carregada
document.addEventListener('DOMContentLoaded', loadCart);
