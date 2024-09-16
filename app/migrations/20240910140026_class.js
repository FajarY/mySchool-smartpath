/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('class', (table) =>
	{
		table.increments('id').notNullable().primary();
		table.string('name').notNullable();
		table.string('password').notNullable();
		table.string('description').notNullable().defaultTo("There is no description currently");
		table.datetime('created_time').notNullable();
		table.integer('maximum_student_count').notNullable();
		table.integer('maximum_teacher_count').notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('class');
};
