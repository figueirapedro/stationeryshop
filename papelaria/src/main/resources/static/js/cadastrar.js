function cadastrarProduto() {
    var form = new FormData();
    form.append("imagem", $("#imagem").val());
    form.append("name", $("#produto").val());
    form.append("preco", $("#preco").val());
    form.append("descricao", $("#descricao").val());
    
    var metodo;
    var url = "/papelaria"

    if(location.hash.match(/[0-9]+-editar/g)){
        metodo = "PUT"
        url = url + "/" + location.hash.match(/[0-9]+/g)
    } else {
        metodo = "POST"
    }
    
    fetch(url, {
        method: metodo,
        body: form
    }).then(() => {
        alert("Produto Cadastrado com Sucesso!")
        location.reload();
    });

}

if (location.hash.match(/[0-9]+-editar/g)) {
    fetch("/papelaria/" + location.hash.match(/[0-9]+/g))
        .then(res => res.json())
        .then((produto) => {
            $("#imagem").val(produto.imagem);
            $("#produto").val(produto.name);
            $("#preco").val(produto.preco);
            $("#descricao").val(produto.descricao);
        });

}