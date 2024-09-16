const loginButton = document.getElementById('login-button');
const getStartedButton = document.getElementById('get-started-button');

const goLogin = (event) =>
{
    event.preventDefault();

    window.location.href = '/login';
}

loginButton.onclick = goLogin;
getStartedButton.onclick = goLogin;