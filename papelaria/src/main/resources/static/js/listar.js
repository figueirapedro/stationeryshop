var componenteBase = '<div class="card text-center" style="width: 300px; height: 50px;"><img class="card-img-top" src="{URLIMAGEM}" alt="Card image cap" style="max-height:400px"><div class="card-body"><h5 class="card-title">{NOMEPRODUTO}</h5><p class="card-text">Preço: R${PRECOPRODUTO}</p><a href="produto.html#{IDPRODUTO}" class="btn btn-primary">Conferir</a><a type="button" href="cadastrar.html#{IDPRODUTO}-editar" class="btn btn-info"VERFICAUSUARIO>Editar</a><button type="button" onclick="excluirProduto({IDPRODUTO})" class="btn btn-danger"VERFICAUSUARIO>Excluir</button></div></div>'
var container = document.getElementById("containerProdutos")

fetch("/papelaria")
    .then(res => res.json())
    .then(result => {
        result.forEach(element => {
            var produto = componenteBase.replace('{URLIMAGEM}', element.imagem).replace("{NOMEPRODUTO}", element.name).replace("{PRECOPRODUTO}", element.preco).replaceAll("{IDPRODUTO}", element.id)

            if (sessionStorage.getItem("isAdmin") != "true")
                produto = produto.replaceAll("VERFICAUSUARIO", " hidden")
            else
                produto = produto.replaceAll("VERFICAUSUARIO", "")

            container.innerHTML += produto;
        });
    })

function excluirProduto(id) {
    var txt;
    var r = confirm("Deseja excluir o Produto?");
    if (r == true) {
        fetch("/papelaria/" + id, {method: 'DELETE'})
            .then(() => {
            alert("Produto Excluído com Sucesso!")
            location.reload();
        });
    }
}