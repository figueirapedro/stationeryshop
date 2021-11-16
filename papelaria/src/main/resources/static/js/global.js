if(sessionStorage.getItem("userLogin") == "true") {
    $("#userElement").text("Logout");
    var nomeUsuario = '<p id="nomeUsuario" style="color: gray; padding-right: 15px;" class="fst-italic">{NOME}</p>'

    document.querySelector("#userElement").parentNode.innerHTML = nomeUsuario.replace("{NOME}", "Seja bem-vindo, " + sessionStorage.getItem("userName")) + document.querySelector("#userElement").parentNode.innerHTML
} else
    $("#userElement").text("Login")

if (sessionStorage.getItem("isAdmin") != "true")
    $("#criarProduto").hide();

function toggleModal(cadastro) {
    if (sessionStorage.getItem("userLogin") == "true")
        $('#logoutModal').modal('toggle')
    else if (cadastro == "cadastro")        
        $('#Cadastro').modal('toggle')
    else
        $('#loginModal').modal('toggle');
}

function authUser() {
    if (sessionStorage.getItem("userLogin") == "true") {
        sessionStorage.removeItem("userLogin");
        sessionStorage.removeItem("userName");
        sessionStorage.setItem("isAdmin", "false")
        location.reload();
    } else {
        fetch("/usuarios")
            .then(res => res.json())
            .then(result => {
                result.forEach(element => {
                    if (document.querySelector("#loginEmail").value == element.email && document.querySelector("#loginPassword").value == element.senha) {
                        sessionStorage.setItem("userLogin", "true");
                        sessionStorage.setItem("userName", element.name)
                        element.email.match(/@papelaria.com.br/gi) ? sessionStorage.setItem("isAdmin", "true") : sessionStorage.setItem("isAdmin", "false");
                    }
                });
            }).then((usuario) => {
                if(sessionStorage.getItem("userLogin") == "true")
                    location.reload();
                else
                 alert("Usuario Não Encontrado!\nTente Novamente")
            })
    }
}

function createUser() {
    var form = new FormData();
    form.append("name", $("#userName").val());
    form.append("email", $("#userEmail").val());
    form.append("senha", document.querySelector("#userPassword").value);

    fetch("/usuarios", {
        method: 'POST',
        body: form
    }).then(() => {
        sessionStorage.setItem("userLogin", "true");
        $("#userEmail").val().match(/@papelaria.com.br/gi) ? sessionStorage.setItem("isAdmin", "true") : sessionStorage.setItem("isAdmin", "false");
        location.reload();
    });
};