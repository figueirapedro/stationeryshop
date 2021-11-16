fetch("/papelaria/" + location.hash.match(/[0-9]+/g))
    .then(res => res.json())
    .then(result => {
        document.querySelector("#preco").innerText = result.preco;
        document.querySelector("#nome").innerText = result.name;
        document.querySelector("#descricao").innerText = result.descricao;
        document.querySelector("#imagem").src = result.imagem
    })

function modalWhats(){
    $('#whatsModal').modal('toggle')
}