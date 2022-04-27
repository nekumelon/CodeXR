const express = require('express');
const { verifyUser } = require('./verification');
const { statusCodes, statusMessages } = require('./status');
const query = require('./OpenAI');
const web = require('./web');

const app = express();
app.use(express.json());

function getRequestIP(req) {
	return req.headers['x-forwarded-for'] ?? req.connection.remoteAddress;
}

app.get('/', (req, res) => {
	res.status(200).end('https://github.com/nekumelon/CodeXR');
});

app.post('/query', async (req, res) => {
	try {
		const parameters = req.body;
		const ip = getRequestIP(req);

		if (!(await web.isUser(parameters.user))) {
			await web.beginUser(parameters.user, ip);
		}

		if (!verifyUser(parameters.user, ip)) {
			return res
				.status(statusCodes.UNAUTHORIZED)
				.end(statusMessages[statusCodes.UNAUTHORIZED]);
		}

		const completion = await query(parameters);

		if (typeof completion === 'number') {
			return res.status(completion).end(statusMessages[completion]);
		}

		res.status(statusCodes.OK).json(completion);
	} catch (err) {
		web.incrementStatusData();
		console.error(`INTERNAL_SERVER_ERROR: ${err}`);
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Back-end running on port ${port}`);
});
