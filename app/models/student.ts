import db from './knex';

export interface Student
{
    id: number;
    name: string;
    password?: string;
    register_time: Date;
}

const create = async function(name : string, password : string) : Promise<Student>
{
    const data : Partial<Student> = {
        name: name,
        password: password,
        register_time: new Date(Date.now())
    }
    const [id] = await db('student').insert(data);

    return findById(id);
};
const findById = async function(id : number) : Promise<Student>
{
    const data : Student = await db('student').where('id', id).first();
    return data;
};
const findAll = async function() : Promise<Student[]>
{
    return await db('student').select('*');
};
const count = async function() : Promise<number>
{
    const result = await db('student').count('* as count');
    const count = result[0].count;

    return Number(count);
}
const update = async function(id : number, data : Partial<Student>) : Promise<Student>
{
    await db('student').where('id', id).update(data);
    return findById(id);
}
const del = async function(id : number) : Promise<boolean>
{
    return await db('student').where('id', id).del()
};

export default 
{
    create,
    findById,
    findAll,
    count,
    update,
    del
};