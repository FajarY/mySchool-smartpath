import db from './knex';

interface Class_Item
{
    id : number,
    name: string,
    content: JSON,
    created_time: Date,
    class_id: number
}

const create = async (name : string, content : JSON, class_id_reference : number) : Promise<Class_Item> =>
{
    const inputClassItem : Partial<Class_Item> = 
    {
        name: name,
        content: content,
        created_time: new Date(Date.now()),
        class_id: class_id_reference
    };

    const [id] = await db('class_item').insert(inputClassItem);

    return findById(id);
};

const findById = async (id : number) : Promise<Class_Item> =>
{
    return await db('class_item').where('id', id).first();
};

const findAll = async () : Promise<Class_Item[]> =>
{
    return await db('class_item').select('*');  
};

const update = async (id : number, data : Partial<Class_Item>) : Promise<Class_Item> =>
{
    await db('class_item').where('id', id).update(data);

    return findById(id);
};

const del = async (id : number) : Promise<boolean> =>
{
    return await db('class_item').where('id', id).del();
};

export default
{
    create,
    findById,
    findAll,
    update,
    del
}