function Produto(id, nome, preco, imagem) {
    this.id = id;
    this.nome = nome;
    this.preco = parseFloat(preco) || 0;
    this.imagem = imagem;
}

function ItemCarrinho(produto, quantidade) {
    this.produto = produto;
    this.quantidade = quantidade;
}

function Carrinho() {
    this.itens = [];

    this.adicionar = function(produto) {
        const itemExistente = this.itens.find(item => item.produto.id === produto.id);
        
        if (itemExistente) {
            itemExistente.quantidade++; 
        } else {
            this.itens.push(new ItemCarrinho(produto, 1)); 
        }
    };

    this.alterarQuantidade = function(idProduto, mudanca) {
        const index = this.itens.findIndex(item => item.produto.id === idProduto);
        
        if (index > -1) {
            this.itens[index].quantidade += mudanca; 
            
            if (this.itens[index].quantidade <= 0) {
                this.itens.splice(index, 1); 
            }
        }
    };

    this.limpar = function() {
        this.itens = [];
    };

    this.calcularSubtotal = function() {
        return this.itens.reduce((total, item) => {
            return total + (item.produto.preco * item.quantidade);
        }, 0);
    };
}

function Pedido(cliente, itens, tipoEntrega, total) {
    this.id = new Date().getTime();
    this.cliente = cliente;
    this.itens = [...itens];
    this.tipoEntrega = tipoEntrega; 
    this.total = total;
    this.data = new Date().toLocaleString('pt-BR');
}