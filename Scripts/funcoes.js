let intervaloTempoCarrossel;

function iniciarCarrosselAutomatico() {
    intervaloTempoCarrossel = setInterval(() => {
        moverCarrossel(1);
    }, 4000);
}

const moverCarrosselOriginal = moverCarrossel;
window.moverCarrossel = function(direcao, controleManual = false) {
    moverCarrosselOriginal(direcao);
    
    if (controleManual) {
        clearInterval(intervaloTempoCarrossel);
        iniciarCarrosselAutomatico();
    }
};

function adicionarAoCarrinho(idProduto) {
    const produto = Gerenciador.produtos.find(p => p.id === idProduto);
    if (!produto) return;
    
    Gerenciador.carrinho.adicionar(produto);
    atualizarTelaCarrinho();
    mostrarAlerta(`${produto.nome} adicionado ao carrinho!`);
}

function alterarQtd(idProduto, mudanca) {
    Gerenciador.carrinho.alterarQuantidade(idProduto, mudanca);
    atualizarTelaCarrinho();
}

function criarProdutoCardapio() {
    const inputNome = document.getElementById('novoNome');
    const inputPreco = document.getElementById('novoPreco');
    
    const nome = inputNome.value.trim();
    const preco = parseFloat(inputPreco.value);
    
    if (!nome || isNaN(preco) || preco <= 0) {
        alert("Preencha um nome e um preço válido!");
        return;
    }

    const novoId = new Date().getTime(); 
    const novoPrato = new Produto(novoId, nome, preco, '../Imagens/padrao.jpg'); 
    
    Gerenciador.cadastrarProduto(novoPrato);
    
    inputNome.value = '';
    inputPreco.value = '';
    
    mostrarAlerta("Produto criado com sucesso!");
    renderizarCardapio();
    renderizarCarrossel();
}

function removerProdutoUI(id) {
    if (confirm("Deseja apagar este prato?")) {
        Gerenciador.deletarProduto(id);
        renderizarCardapio();
        renderizarCarrossel();
        mostrarAlerta("Produto removido!");
    }
}

function limparCarrinho() {
    if (Gerenciador.carrinho.itens.length === 0) return;
    
    if (confirm("Deseja limpar todo o carrinho?")) {
        Gerenciador.carrinho.limpar();
        atualizarTelaCarrinho();
        mostrarAlerta("Carrinho limpo.");
    }
}

function finalizarPedido() {
    if (Gerenciador.carrinho.itens.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    const inputNome = document.getElementById('nomeCliente');
    const nomeCliente = inputNome.value.trim();
    
    if (!nomeCliente) {
        alert("Por favor, informe seu nome.");
        inputNome.focus();
        return;
    }

    const selectEntrega = document.getElementById('tipoEntrega');
    const tipo = selectEntrega.options[selectEntrega.selectedIndex].text;
    const totalFinal = document.getElementById('valorTotalPedido').innerText;

    const novoPedido = new Pedido(nomeCliente, Gerenciador.carrinho.itens, tipo, totalFinal);
    Gerenciador.pedidos.push(novoPedido);
    
    alert(`Sucesso, ${nomeCliente}! Valor total: R$ ${totalFinal}`);
    
    Gerenciador.carrinho.limpar();
    inputNome.value = '';
    atualizarTelaCarrinho();
}

let modoAdminAtivo = false;

function alternarModoAdmin() {
    const botaoAdmin = document.getElementById('botaoAdmin');

    if (modoAdminAtivo) {
        modoAdminAtivo = false;
        document.body.classList.remove('modo-admin');
        botaoAdmin.innerHTML = '<i class="fa-solid fa-lock"></i> Admin';
        mostrarAlerta("Você saiu do modo administrador.");
    } else {
        const senha = prompt("Senha (Dica: 1234):");
        
        if (senha === "1234") {
            modoAdminAtivo = true;
            document.body.classList.add('modo-admin');
            botaoAdmin.innerHTML = '<i class="fa-solid fa-unlock"></i> Sair';
            mostrarAlerta("Modo Admin ativado!");
        } else if (senha !== null) {
            alert("Senha incorreta!");
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    Gerenciador.carregarDados();
    renderizarCardapio();
    renderizarCarrossel();
    atualizarTelaCarrinho();
    
    iniciarCarrosselAutomatico();
});