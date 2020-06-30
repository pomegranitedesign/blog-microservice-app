const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000
let postComments = {}

app.use(express.json({ extended: false }))
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
	res.send(postComments[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
	const commentID = randomBytes(4).toString('hex')
	const { content } = req.body
	const comments = postComments[req.params.id] || []
	comments.push({ commentID, content })
	postComments = comments
	res.send(comments).status(201)
})

app.listen(PORT, () =>
	console.log(`The comments server is running on port: ${PORT}`)
)
