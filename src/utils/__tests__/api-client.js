import { client } from '../api-client'
import { server } from 'test/server/test-server'
import { rest } from 'msw'

beforeAll(() => server.listen())
afterAll(() => server.close())

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
	const endpoint = 'test-endpoint'
	const mockResult = { mockValue: 'VALUE' }
	server.use(
		rest.get(`${endpoint}`, async (req, res, ctx) => {
			return res(ctx.json(mockResult))
		}),
	)

	const result = await client(endpoint, { method: 'GET' })

	expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
	const token = 'FAKE_TOKEN'

	let request
	const endpoint = 'test-endpoint'
	const mockResult = { mockValue: 'VALUE' }
	server.use(
		rest.get(`${endpoint}`, async (req, res, ctx) => {
			request = req
			return res(ctx.json(mockResult))
		}),
	)

	await client(endpoint, { method: 'GET', token })

	expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})
