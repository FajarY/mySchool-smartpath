import db from './knex';

interface Class_Teacher_Relation
{
    class_id : number,
    teacher_id : number
};

const create = async (class_id_ref : number, teacher_id_ref : number) : Promise<Class_Teacher_Relation> =>
{
    const data : Class_Teacher_Relation =
    {
        class_id: class_id_ref,
        teacher_id: teacher_id_ref
    };
    const [ class_id, teacher_id ] = await db('class_teacher_relation').insert(data);

    return { class_id: class_id, teacher_id: teacher_id };
};

const findById = async (class_id : number, teacher_id : number) : Promise<Class_Teacher_Relation> =>
{
    return await db('class_teacher_relation').where( {class_id, teacher_id} ).first();
};

const findAll = async () : Promise<Class_Teacher_Relation[]> =>
{
    return await db('class_teacher_relation').select('*');
};

const update = async (class_id : number, teacher_id : number, data : Class_Teacher_Relation) : Promise<Class_Teacher_Relation> =>
{
    await db('class_teacher_relation').where({ class_id, teacher_id }).update(data);

    return findById(data.class_id, data.teacher_id);
};

const del = async (class_id : number, teacher_id : number) : Promise<boolean> =>
{
    return await db('class_teacher_relation').where({ class_id, teacher_id }).del();
};

export default
{
    create,
    findById,
    findAll,
    update,
    del
};