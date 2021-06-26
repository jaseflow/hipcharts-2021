const express = require('express')
const path = require('path')
const fs = require('fs')
const request = require('request')

const PORT = process.env.PORT || 5000

const dotenv = require('dotenv')
dotenv.config()

const app = express()

const defaultTitle = "Hipcharts | What's your top five?"
const defaultDescription = 'Create, share and discover top five charts of your favourite music and artists.'

app.get('/', (req,  res) => {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) {
      return console.log(err)
    }

    data = data
      .replace(/__TITLE__/g, defaultTitle)
      .replace(/__DESCRIPTION__/g, defaultDescription);

    res.send(data)
  })
})

app.get('/chart', (req,  res) => {
  const id = req.query.c;
  const filePath = path.resolve(__dirname, './build', 'index.html')
  let chart;

  return new Promise((resolve, reject) => {
    request.get(`${process.env.API_URL}/chart/${id}`, (err, response) => {
      if (!err && response.statusCode == 200) {
        const body = JSON.parse(response.body)
        chart = body.data[0];
        resolve(chart)
      } else {
        console.log('Error accessing item metadata URL')
      }
    })
  }).then((chart) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) {
        return console.log(err)
      }

      // Make it uppercase
      const capitalizedAuthor = chart.author.charAt(0).toUpperCase() + chart.author.slice(1);
      const capitalizedType = chart.type.charAt(0).toUpperCase() + chart.type.slice(1);

      data = data
        .replace(/__TITLE__/g, `${capitalizedAuthor}'s Top 5 ${capitalizedType} Of All Time`)
        .replace(/__DESCRIPTION__/g, defaultDescription)
        .replace(/__OGIMAGE__/g, chart.montage)

      res.send(data)
    })
  }).catch((err) => {
    console.log(err)
  })

})

app.get('/create/:type', (req,  res) => {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) {
      return console.log(err)
    }

    data = data
      .replace(/__TITLE__/g, defaultTitle)
      .replace(/__DESCRIPTION__/g, defaultDescription)

    res.send(data)
  })
})

app.get('/charts', (req,  res) => {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) {
      return console.log(err)
    }

    data = data
      .replace(/__TITLE__/g, defaultTitle)
      .replace(/__DESCRIPTION__/g, defaultDescription)

    res.send(data)
  })
})

app.use(express.static(path.resolve(__dirname, './build')))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
