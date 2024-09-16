import db from './knex';

export interface Class
{
    id : number;
    name : string;
    password?: string;
    description: string;
    created_time: Date;
    maximum_student_count: number;
    maximum_teacher_count: number;
}

const create = async (name : string, password : string, maximum_student_count : number, maximum_teacher_count : number, description? : string) : Promise<Class> =>
{
    const inputData : Partial<Class> =
    {
        name: name,
        password: password,
        description: description,
        created_time: new Date(Date.now()),
        maximum_student_count: maximum_student_count,
        maximum_teacher_count: maximum_teacher_count
    };
    const [id] = await db('class').insert(inputData);

    return findById(id);
};
const findById = async (id : number) : Promise<Class> =>
{
    return await db('class').where('id', id).first();
};
const findAll = async () : Promise<Class[]> =>
{
    return await db('class').select('*');
};
const update = async (id : number, data : Partial<Class>) : Promise<Class> =>
{
    await db('class').update(data).where('id', id);

    return findById(id);
};
const del = async (id : number) : Promise<boolean> =>
{
    return await db('class').where('id', id).del();
}

export default
{
    create,
    findById,
    findAll,
    update,
    del
}