(sessionStorage.getItem("userLogin") == "true") ? $("#userElement").text("Logout") : $("#userElement").text("Login")

if(sessionStorage.getItem("isAdmin") != "true") 
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
        sessionStorage.setItem("isAdmin", "false")
        location.reload();
    } else {
        sessionStorage.setItem("userLogin", "true");
        //email.match(/@papelaria.com.br/gi)
        true ? sessionStorage.setItem("isAdmin", "true") : sessionStorage.setItem("isAdmin", "false");
        location.reload();
    }

}