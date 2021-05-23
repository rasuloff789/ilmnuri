const MANY = `
select
	u.user_id as id,
	u.username,
	u.firstname || ' ' || lastname as fullname,
	to_char(u.balance, '99,999,999,999,999D99') as balance,
	u.created_at,
	extract(year from u.created_at) as since,
	t.teacher_id as is_teacher
from users as u
left join teachers as t using(user_id)
where deleted_at is null and
	(
		case
			when length($3) > 0 then (
				firstname || ' ' || lastname ilike $3 or username ilike $3
			)
			else true
		end
	) and
	(
		case
			when $4 <> 0 then (
				t.teacher_id is not null
			)
			else true
		end
	)
order by t.teacher_id is not null desc, u.firstname
offset ($1 - 1) * $2 limit $2
`

const CREATE = `
	insert into users (firstname, lastname, username, password) values
	($1, $2, $3, crypt($4, gen_salt('bf')))
	returning
		user_id as id,
		username,
		firstname || ' ' || lastname as fullname,
		to_char(balance, '99,999,999,999,999D99') as balance,
		created_at,
		extract(year from created_at) as since
`

const CREATE_TEACHER = `
	insert into teachers (user_id) values ($1)
`

module.exports.MANY = MANY
module.exports.CREATE = CREATE
module.exports.CREATE_TEACHER = CREATE_TEACHER
