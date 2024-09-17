import cfg from 'dotenv';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

cfg.config();
const url : string = `http://localhost:${process.env.SERVER_PORT}/`;

function getRandomName(length : number) : string
{
    const inputs : string[] = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
    ];
    var randomString : string = '';
    for(var i = 0; i < length; i++)
    {
        randomString += inputs[Math.floor(Math.random() * inputs.length)];
    }

    return randomString;
}

//Connect
test('Getting index html', async () =>
{
    const req : RequestInit =
    {
        method:'GET',
        headers:{'Content-Type' : 'application/json'},
    };

    const res = await fetch(url, req);

    expect(res.status).toBe(200);

    const data = await res.text();

    expect(data).toContain('<html>');
});

//Student
const studentData : Partial<Student> =
{

};
test('Registering student', async () =>
{
    const randomName = 'test-' + getRandomName(24);
    const randomPass = 'test-' + getRandomName(10);

    const req : RequestInit =
    {
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ registerType:'student', name:randomName, password:randomPass })
    };

    const res = await fetch(url + 'register', req);

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');

    studentData.id = data.id;
    studentData.name = data.name;
    studentData.password = randomPass;
});

var studentToken : string = '';
test('Login student', async () =>
{
    const req : RequestInit =
    {
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ loginType:'student', id:studentData.id, password:studentData.password })
    };

    const res = await fetch(url + 'login', req);

    expect(res.status).toBe(201);

    const data = await res.json();

    expect(data).toHaveProperty('token');

    studentToken = data.token;
});

const newStudentData : Partial<Student> =
{
    name:'test-new'+getRandomName(24),
    password:'test-new'+getRandomName(16)
};
test('Update student', async () =>
{
    const req : RequestInit =
    {
        method:'PUT',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ id:studentData.id, name:newStudentData.name, password:newStudentData.password, token:studentToken })
    };

    const res = await fetch(url + `api/student/:${studentData.id}`, req);

    expect(res.status).toBe(201);

    const data = await res.json();

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');

    studentData.name = data.name;
    studentData.password = newStudentData.password;
});

test('Update student without token', async () =>
{
    const req : RequestInit =
    {
        method:'PUT',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ id:studentData.id, name:'test-without', password:newStudentData.password })
    };
    const res = await fetch(url + `api/student/:${studentData.id}`, req);

    expect(res.status).toBe(400);

    const data = await res.json();

    expect(data).toHaveProperty('message');
});

test('Delete student', async () =>
{
    const req : RequestInit =
    {
        method:'DELETE',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ token:studentToken })
    };
    const res = await fetch(url + `api/student/:${studentData.id}`, req);

    expect(res.status).toBe(201);

    const data = await res.json();

    expect(data).toHaveProperty('status');
});

//Teacher
const teacherData : Partial<Teacher> =
{

}
test('Registering teacher', async () =>
{
    const randomName = 'test-' + getRandomName(24);
    const randomPass = 'test-' + getRandomName(10);

    const req : RequestInit =
    {
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ registerType:'teacher', name:randomName, password:randomPass })
    };

    const res = await fetch(url + 'register', req);

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');

    teacherData.id = data.id;
    teacherData.name = data.name;
    teacherData.password = randomPass;
});

var teacherToken : string = '';
test('Login teacher', async () =>
{
    const req : RequestInit =
    {
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ loginType:'teacher', id:teacherData.id, password:teacherData.password })
    };

    const res = await fetch(url + 'login', req);

    expect(res.status).toBe(201);

    const data = await res.json();

    expect(data).toHaveProperty('token');

    teacherToken = data.token;
});

const newTeacherData : Partial<Teacher> =
{
    name:'test-new'+getRandomName(24),
    password:'test-new'+getRandomName(16)
};
test('Update teacher', async () =>
{
    const req : RequestInit =
    {
        method:'PUT',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ id:teacherData.id, name:newTeacherData.name, password:newTeacherData.password, token:teacherToken })
    };

    const res = await fetch(url + `api/teacher/:${teacherData.id}`, req);

    expect(res.status).toBe(201);

    const data = await res.json();

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');

    teacherData.name = data.name;
    teacherData.password = newTeacherData.password;
});

test('Delete teacher without token', async () =>
{
    const req : RequestInit =
    {
        method:'DELETE',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ })
    };
    const res = await fetch(url + `api/teacher/:${teacherData.id}`, req);

    expect(res.status).toBe(400);

    const data = await res.json();

    expect(data).toHaveProperty('message');
});

test('Delete teacher', async () =>
{
    const req : RequestInit =
    {
        method:'DELETE',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({ token:teacherToken })
    };
    const res = await fetch(url + `api/teacher/:${teacherData.id}`, req);

    expect(res.status).toBe(201);

    const data = await res.json();

    expect(data).toHaveProperty('status');
});