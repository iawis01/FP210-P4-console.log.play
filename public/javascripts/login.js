var boton = document.querySelector("#login");

boton.addEventListener('click', function () {
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => {
        if (response.ok) {
            var newObject = {
                'name': "",
                'username': username,
                'avatar': "",
                'isLogged': false,
                'room1': false,
                'room2': false,
                'room3': false
            }
            window.localStorage.setItem('User', JSON.stringify(newObject))


            var user =JSON.parse(localStorage.getItem("User"));
            user.isLogged= true;
            localStorage.setItem('User', JSON.stringify(user))
            
            fetch('/game-app').then(response => {
                window.location.assign(response.url)
            })
            
        } else {
            document.getElementById('helper').style.visibility = "visible"
        }
    })
});

