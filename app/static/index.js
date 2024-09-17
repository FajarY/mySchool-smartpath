const loginButton = document.getElementById('login-button');
const getStartedButton = document.getElementById('get-started-button');

const teacherCounter = document.getElementById('teacher-counter');
const studentCounter = document.getElementById('student-counter');

const goLogin = (event) =>
{
    event.preventDefault();

    window.location.href = '/login';
}

loginButton.onclick = goLogin;
getStartedButton.onclick = goLogin;

const fetchData = async () =>
{
    try
    {
        const studentRes = await fetch('/api/student/count', { });
        const studentData = await studentRes.json();

        const teacherRes = await fetch('/api/teacher/count', { });
        const teacherData = await teacherRes.json();

        if(studentRes.ok)
        {
            studentCounter.textContent = studentData.count;
        }
        if(teacherRes.ok)
        {
            teacherCounter.textContent = teacherData.count;
        }
    }
    catch(error)
    {

    }
}

fetchData();