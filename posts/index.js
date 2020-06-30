const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000
const posts = {}

app.use(express.json({ extended: false }))
app.use(cors())

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex')
	const { title } = req.body

	posts[id] = {
		id,
		title
	}

	res.send(`Post ${title} created`).status(201)
})

app.listen(PORT, () =>
	console.log(`The posts server is running on port: ${PORT}`)
)
