const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// const listDatabases = async () => {
//   const res = await notion.databases.list();
//   console.log(res);
// };

// listDatabases();

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getProjects() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST',
  }

  const { results } = await notion.request(payload)
  //console.log(results)
  const projects = results.map((page) => {
    //console.log(page)
    const tags = page.properties.tags.multi_select.map((tag) => tag.name)

    if (page.properties.Status.select.name === 'Completed') {
      return {
        id: page.id,
        title: page.properties.Name.title[0].text.content,
        description: page.properties.description.rich_text[0].plain_text ,
        status: page.properties.Status.select.name,
        live: page.properties.live_link.url,
        repo: page.properties.repo.url,
        tags: tags,
      }
    }
  })
  return projects.filter((project) => project)
}
