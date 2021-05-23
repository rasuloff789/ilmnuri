const { rows, row } = require('../../pg')
const { MANY, CREATE, CREATE_TEACHER } = require('./queries')

const many = ({ page, limit, search, isTeacher }) => rows(
	MANY,
	page || 1,
	limit || 20,
	search ? '%' + search + '%' : '',
	isTeacher || 0,
)

const create = ({ firstname, lastname, username, password }) => row(
	CREATE,
	firstname,
	lastname,
	username,
	password,
)

const create_teacher = (userId) => row(
	CREATE_TEACHER,
	userId,
)

module.exports.many = many
module.exports.create = create
module.exports.create_teacher = create_teacher
