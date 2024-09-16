import db from './knex';

interface Class_Student_Relation
{
    class_id : number,
    student_id : number
};

const create = async (class_id_ref : number, student_id_ref : number) : Promise<Class_Student_Relation> =>
{
    const data : Class_Student_Relation =
    {
        class_id: class_id_ref,
        student_id: student_id_ref
    };
    const [ class_id, student_id ] = await db('class_student_relation').insert(data);

    return { class_id: class_id, student_id: student_id };
};

const findById = async (class_id : number, student_id : number) : Promise<Class_Student_Relation> =>
{
    return await db('class_student_relation').where( {class_id, student_id} ).first();
};

const findAll = async () : Promise<Class_Student_Relation[]> =>
{
    return await db('class_student_relation').select('*');
};

const update = async (class_id : number, student_id : number, data : Class_Student_Relation) : Promise<Class_Student_Relation> =>
{
    await db('class_student_relation').where({ class_id, student_id }).update(data);

    return findById(data.class_id, data.student_id);
};

const del = async (class_id : number, student_id : number) : Promise<boolean> =>
{
    return await db('class_student_relation').where({ class_id, student_id }).del();
};

export default
{
    create,
    findById,
    findAll,
    update,
    del
};