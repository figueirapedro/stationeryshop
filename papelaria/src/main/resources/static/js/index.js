var componenteBase = '<div class="card text-center" style="width: 300px; height: 50px;"><img class="card-img-top" src="{URLIMAGEM}" alt="Card image cap" style="max-height:400px"><div class="card-body"><h5 class="card-title">{NOMEPRODUTO}</h5><p class="card-text">Preço: R${PRECOPRODUTO}</p><a href="produto.html#{IDPRODUTO}" class="btn btn-primary">Conferir</a></div></div>'
var container = document.getElementById("containerProdutos")

fetch("/papelaria")
    .then(res => res.json())
    .then(result => {
        var contar = 4;
        result.forEach(element => {
            if (contar == 0)
                return
            
            var produto = componenteBase.replace('{URLIMAGEM}', element.imagem).replace("{NOMEPRODUTO}", element.name).replace("{PRECOPRODUTO}", element.preco).replaceAll("{IDPRODUTO}", element.id)
            container.innerHTML += produto;
            contar--
        });
    })