/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('class_item', (table) =>
	{
		table.increments('id').notNullable().primary();
		table.string('name').notNullable();
		table.json('content').notNullable().defaultTo({});
		table.datetime('created_time').notNullable();
		table.integer('class_id').unsigned().notNullable().references('id').inTable('class');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('class_item');
};
