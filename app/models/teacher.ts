import db from './knex';

export interface Teacher
{
    id : number;
    name : string;
    password? : string;
    register_time : Date;
};

const create = async function(name : string, password : string) : Promise<Teacher>
{
    const data : Partial<Teacher> = {
        name: name,
        password: password,
        register_time: new Date(Date.now())
    }
    const [id] = await db('teacher').insert(data);

    return findById(id);
};
const findById = async function(id : number) : Promise<Teacher>
{
    const data : Teacher = await db('teacher').where('id', id).first();
    return data;
};
const findAll = async function() : Promise<Teacher[]>
{
    return await db('teacher').select('*');
};
const update = async function(id : number, data : Partial<Teacher>) : Promise<Teacher>
{
    await db('teacher').where('id', id).update(data);
    return findById(id);
}
const del = async function(id : number) : Promise<boolean>
{
    return await db('teacher').where('id', id).del()
};

export default 
{
    create,
    findById,
    findAll,
    update,
    del
};