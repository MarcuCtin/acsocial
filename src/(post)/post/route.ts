export async function GET() {
	return new Response(
		JSON.stringify({
			message: 'Helloo from the POST API!',
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}
