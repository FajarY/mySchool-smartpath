/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('teacher', (table) => 
	{
		table.increments('id').notNullable().primary();
		table.string('password', 512).notNullable();
		table.string('name', 512).notNullable();
		table.datetime('register_time').notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('teacher');
};
