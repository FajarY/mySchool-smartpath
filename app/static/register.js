const form = document.getElementById('input-form');
const errorMessage = document.getElementById('error-message');
const submitButton = document.getElementById('submit');

form.onsubmit = async (event) =>
{
    event.preventDefault();

    const registerType = document.querySelector('input[name="register-type"]:checked').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const data = 
    {
        registerType,
        name,
        password
    };

    try
    {
        if(!(password === confirmPassword))
        {
            throw new Error('Password is not the same!');
        }

        submitButton.classList.add('loading-button');

        errorMessage.classList.add('inactive');
        const response = await fetch('/register', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        
        if(response.ok)
        {
            sessionStorage.setItem('register-id', responseData.id);
            sessionStorage.setItem('register-name', responseData.name);
            window.location.href = '/login'
        }
        else
        {
            errorMessage.textContent = `Server error : ${response.statusText}`;
            errorMessage.classList.remove('inactive');
            console.error(response.statusText);
            console.error(responseData);

            submitButton.classList.remove('loading-button');
        }
    }
    catch(error)
    {
        errorMessage.textContent = `${error}`;
        console.error(error);
        errorMessage.classList.remove('inactive');

        submitButton.classList.remove('loading-button');
    }
};