const Gerenciador = {
    produtos: [],
    pedidos: [],
    carrinho: new Carrinho(),

    salvarDados: function() {
        try {
            localStorage.setItem('produtos_restaurante', JSON.stringify(this.produtos));
        } catch (erro) {
            console.error(erro);
        }
    },

    carregarDados: function() {
        try {
            const produtosSalvos = JSON.parse(localStorage.getItem('produtos_restaurante'));
            
            if (produtosSalvos && produtosSalvos.length > 0) {
                this.produtos = produtosSalvos.map(p => new Produto(p.id, p.nome, p.preco, p.imagem));
            } else {
                this.injetarDadosIniciais();
            }
        } catch (erro) {
            this.injetarDadosIniciais();
        }
    },

    injetarDadosIniciais: function() {
        this.cadastrarProduto(new Produto(1, 'Hambúrguer Clássico', 25.00, '../Media/hamburguer.jpg'));
        this.cadastrarProduto(new Produto(2, 'Pizza de queijo', 45.00, '../Media/pizza.jpg'));
        this.cadastrarProduto(new Produto(3, 'Batata Frita', 15.00, '../Media/batata.jpg'));
    },

    cadastrarProduto: function(produto) {
        this.produtos.push(produto); 
        this.salvarDados();
    },

    deletarProduto: function(id) {
        this.produtos = this.produtos.filter(p => p.id !== id); 
        this.salvarDados();
    }
};