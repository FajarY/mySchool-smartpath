/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('class_teacher_relation', (table) =>
	{
		table.integer('class_id').unsigned().notNullable().references('id').inTable('class');
		table.integer('teacher_id').unsigned().notNullable().references('id').inTable('teacher');
		table.primary(['class_id', 'teacher_id']);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('class_teacher_relation');
};
