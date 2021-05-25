const express = require('express')
const getProjects = require('./notion/notion')
const PORT = process.env.PORT || 3000
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ;(async () => {
//   const data = await getProjects()
//   console.log(data)
// })()

app.get('/projects', async (req, res) => {
  const projects = await getProjects()
  res.json(projects)
})

app.listen(PORT, console.log(`Up and running on port ${PORT}`))
