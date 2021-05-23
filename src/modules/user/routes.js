const router = require('express').Router()
const user = require('./model')
const { verify } = require('../../jwt')

router.get('/', async (req, res) => {

	try {

		setTimeout(async () => {

			const rows = await user.many(req.query)

			res.status(201).send(rows)

		}, 1000)
	}
	catch(error) {
		res.statusMessage = error.message
		res.status(403).end()
	}
})

router.post('/', async (req, res) => {

	try {
		const rows = await user.create(req.body)

		if (req.body.isTeacher && req.body.isTeacher - 0 === 1) {

			await user.create_teacher(rows.id)
		}

		res.status(201).send(rows)
	}
	catch(error) {
		res.statusMessage = error.message
		res.status(403).end()
	}
})

module.exports = router
