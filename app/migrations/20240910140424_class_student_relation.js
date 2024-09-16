/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('class_student_relation', (table) =>
	{
		table.integer('class_id').unsigned().notNullable().references('id').inTable('class');
		table.integer('student_id').unsigned().notNullable().references('id').inTable('student');
		table.primary(['class_id', 'student_id']);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('class_student_relation');
};
