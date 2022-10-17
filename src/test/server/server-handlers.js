import { rest } from 'msw'

const loginURL = process.env.REACT_APP_SIGN_IN_URL
const registerURL = process.env.REACT_APP_SIGN_UP_URL

const handlers = [
	rest.post(loginURL, async (req, res, ctx) => {
		let body = await req.json()

		if (!body.password) {
			return res(
				ctx.delay(delay),
				ctx.status(400),
				ctx.json({ error: { message: 'password required' } }),
			)
		}
		if (!body.email) {
			return res(
				ctx.delay(delay),
				ctx.status(400),
				ctx.json({ error: { message: 'email required' } }),
			)
		}
		return res(ctx.delay(delay), ctx.json({ email: body.email }))
	}),
]

export { handlers }
