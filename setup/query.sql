-- get users
select
	user_id as id,
	username,
	firstname || ' ' || lastname as fullname,
	created_at,
	extract(year from created_at) as since
from users
where deleted_at is null
;


-- login

select
	u.user_id as id,
	u.firstname || ' ' || u.lastname as fullname,
	u.username,
	array_agg(p.action) as permissions
	from users as u
	left join permissions as p using (user_id)
	where lower(u.username) = lower('muhammad') and
	u.password = crypt('i@Mr00Tuser', u.password)
	group by u.user_id
;


-- get groups

select
	g.group_id as id,
	g.price,
	g.lessons,
	g.completed_lessons,
	t.firstname || ' ' || t.lastname as teacher,
	c.name as course_name,
	b.name as branch_name,
	r.room_name as room_name,
	g.room_id
from groups as g
join users as t using(user_id)
join courses as c using(course_id)
join branches as b using(branch_id)
join rooms as r using(room_id)
where g.completed_at is null
;

-- get pariticipants

select
	p.pariticipant_id as id,
		u.firstname || ' ' || u.lastname as name,
	g.completed_lessons - p.initial_lesson as lessons,
	(
		(
			-- calculate group price for pariticipant
			g.price +
			
			(
				-- calculate raise
				g.price / 100 * p.raise
			)

		) - (

			(
				-- calculate group price for pariticipant
				g.price +
				
				(
					-- calculate raise
					g.price / 100 * p.raise
				)

			) / 100 * p.discount
		)
	) as price,

	(
		(
			-- calculate group price for pariticipant
			g.price +
			
			(
				-- calculate raise
				g.price / 100 * p.raise
			)

		) - (

			(
				-- calculate group price for pariticipant
				g.price +
				
				(
					-- calculate raise
					g.price / 100 * p.raise
				)

			) / 100 * p.discount
		)
	) / g.lessons as ppl,

	(
		(
			-- ppl
			(
				-- calculate group price for pariticipant
				g.price +
				
				(
					-- calculate raise
					g.price / 100 * p.raise
				)

			) - (

				(
					-- calculate group price for pariticipant
					g.price +
					
					(
						-- calculate raise
						g.price / 100 * p.raise
					)

				) / 100 * p.discount
			)
		) / g.lessons
	) * (g.completed_lessons - p.initial_lesson) as debt,

	p.discount as disc,
	p.raise,
	p.role
from pariticipants as p
join groups as g on g.group_id = p.group_id
join users as u on u.user_id = p.user_id
where p.group_id = 1
;
