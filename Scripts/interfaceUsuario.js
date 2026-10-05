let tempoAlerta; 

function mostrarAlerta(mensagem) {
    const alerta = document.getElementById('alertaFlutuante');
    alerta.innerText = mensagem;
    alerta.classList.add('mostrar');
    
    clearTimeout(tempoAlerta);
    tempoAlerta = setTimeout(() => alerta.classList.remove('mostrar'), 2500);
}

let itemAtual = 0;

function renderizarCarrossel() {
    const trilho = document.getElementById('conteudoCarrossel');
    trilho.innerHTML = ''; 
    
    if (Gerenciador.produtos.length === 0) {
        trilho.innerHTML = `<div class="item-carrossel"><div class="info-carrossel">Vazio</div></div>`;
        return;
    }
    
    Gerenciador.produtos.forEach(prod => {
        trilho.innerHTML += `
            <div class="item-carrossel">
                <img src="${prod.imagem}" alt="${prod.nome}" class="imagem-carrossel">
                <div class="info-carrossel">
                    ${prod.nome} - R$ ${prod.preco.toFixed(2)}
                    <button class="btn-adicionar btn-comprar-carrossel" onclick="adicionarAoCarrinho(${prod.id})">Comprar</button>
                </div>
            </div>
        `;
    });
}

function moverCarrossel(direcao) {
    const totalItens = Gerenciador.produtos.length;
    if (totalItens === 0) return;
    
    itemAtual += direcao;
    
    if (itemAtual < 0) itemAtual = totalItens - 1;
    if (itemAtual >= totalItens) itemAtual = 0;
    
    document.getElementById('conteudoCarrossel').style.setProperty('--indice-carrossel', itemAtual);
}

function renderizarCardapio() {
    const lista = document.getElementById('listaCardapio');
    lista.innerHTML = '';
    
    if (Gerenciador.produtos.length === 0) {
        lista.innerHTML = '<p class="mensagem-vazia">Cardápio vazio.</p>';
        return;
    }
    
    Gerenciador.produtos.forEach(prod => {
        lista.innerHTML += `
            <article class="cartao">
                <img src="${prod.imagem}" alt="${prod.nome}" class="imagem-cartao">
                <h3>${prod.nome}</h3>
                <p>R$ ${prod.preco.toFixed(2)}</p>
                <button class="btn-adicionar botao-acao" onclick="adicionarAoCarrinho(${prod.id})">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar
                </button>
                <button class="btn-limpar-carrinho botao-acao btn-apagar-prato" onclick="removerProdutoUI(${prod.id})">
                    <i class="fa-solid fa-trash"></i> Apagar
                </button>
            </article>
        `;
    });
}

function atualizarTelaCarrinho() {
    const lista = document.getElementById('itensCarrinho');
    lista.innerHTML = '';

    if (Gerenciador.carrinho.itens.length === 0) {
        lista.innerHTML = '<p class="mensagem-vazia">Seu carrinho está vazio.</p>';
    } else {
        Gerenciador.carrinho.itens.forEach(item => {
            lista.innerHTML += `
                <div class="item-carrinho">
                    <div>
                        <strong>${item.produto.nome}</strong><br>
                        R$ ${(item.produto.preco * item.quantidade).toFixed(2)}
                    </div>
                    <div class="controles-quantidade">
                        <button class="btn-quantidade" onclick="alterarQtd(${item.produto.id}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-quantidade" onclick="alterarQtd(${item.produto.id}, 1)">+</button>
                    </div>
                </div>
            `;
        });
    }

    const subtotal = Gerenciador.carrinho.calcularSubtotal();
    const selectEntrega = document.getElementById('tipoEntrega');
    const taxa = parseFloat(selectEntrega.value) || 0; 
    const total = subtotal + (subtotal > 0 ? taxa : 0); 

    document.getElementById('valorSubtotal').innerText = subtotal.toFixed(2);
    document.getElementById('valorTotalPedido').innerText = total.toFixed(2);
}