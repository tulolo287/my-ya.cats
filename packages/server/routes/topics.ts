import express from 'express'
const router = express.Router()

const topics = [
  {
    id: 1,
    topicName: 'Doe',
    comments: [{ id: 1, username: 'john', text: 'new topic name' }],
  },
  {
    id: 2,
    topicName: 'Smith',
    comments: [{ id: 1, username: 'carol', text: 'text for topic' }],
  },
]

router.get('/', (_, res) => {
  res.send(topics)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.send(topics.find(topic => topic.id === +id))
})

router.post('/add', (req, res) => {
  const { topicName } = req.body

  topics.push({ id: topics.length + 1, topicName, comments: [] })

  res.send(topics)
})

router.post('/comment/add', (req, res) => {
  const { topicId, username, text } = req.body

  const id = topics.findIndex(topic => topic.id === +topicId)
  const topicToUpdate = {
    ...topics[id],
    comments: [
      ...topics[id].comments,
      {
        id: topics[id].comments.length + 1,
        username: username,
        text: text,
      },
    ],
  }

  topics.splice(topicId, 1, topicToUpdate)

  res.send(topics)
})

export default router
