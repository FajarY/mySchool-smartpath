const form = document.getElementById('input-form');
const inactiveMessager = document.getElementById('error-message');
const submitButton = document.getElementById('submit');
const successBoxMessage = document.getElementById('success-box-message');
const successBoxMessageParagraph = document.getElementById('success-box-message-p');

const parseLoginParams = () =>
{
    const params = new URLSearchParams(window.location.search);
    const paramObj = {};

    for(const [key, value] of params.entries())
    {
        paramObj[key] = value;
    }
    if(paramObj.id && paramObj.name)
    {
        successBoxMessageParagraph.textContent = `${paramObj.name} registered successfull with id of ${paramObj.id}, you can now log in!`;
        successBoxMessage.classList.remove('inactive');
    }
}

parseLoginParams();

form.onsubmit = async (event) =>
{
    event.preventDefault();
    
    const loginType = document.querySelector('input[name="login-type"]:checked').value;
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    const data = 
    {
        loginType,
        id,
        password
    };

    try
    {
        inactiveMessager.classList.add('inactive');
        submitButton.classList.add('loading-button');

        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if(response.ok)
        {
            const result = await response.json();
            console.log(result);
        }
        else
        {
            inactiveMessager.textContent = `Error response from server! Code : ${response.status}`;
            inactiveMessager.classList.remove('inactive');
            console.error(response.statusText);

            submitButton.classList.remove('loading-button');
        }
    }
    catch(error)
    {
        inactiveMessager.classList.remove('inactive');
        console.error(error);

        submitButton.classList.remove('loading-button');
    }
}