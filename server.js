const express = require('express')
const path = require('path')
const fs = require('fs')
const request = require('request')

const PORT = process.env.PORT || 5000

const dotenv = require('dotenv')
dotenv.config();

const app = express()

app.get('/', (req,  res) => {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) {
      return console.log(err)
    }

    data = data
      .replace(/__TITLE__/g, 'Home Page')
      .replace(/__DESCRIPTION__/g, 'Home Page Description');

    res.send(data)
  })
})

app.get('/chart', (req,  res) => {
  const id = req.query.c;
  const filePath = path.resolve(__dirname, './build', 'index.html')
  let montage;

  return new Promise((resolve, reject) => {
    request.get(`http://localhost:4040/chart/${id}`, (err, response) => {
      if (!err && response.statusCode == 200) {
        const body = JSON.parse(response.body)
        montage = body.data[0].montage;
        resolve(montage)
      } else {
        console.log('Error accessing item metadata URL');
      }
    })
  }).then((data) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) {
        return console.log(err)
      }

      console.log(montage);

      data = data
        .replace(/__TITLE__/g, 'Home Page')
        .replace(/__DESCRIPTION__/g, 'Home Page Description')
        .replace(/__OGIMAGE__/g, montage);

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
      .replace(/__TITLE__/g, 'Home Page')
      .replace(/__DESCRIPTION__/g, 'Home Page Description');

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
      .replace(/__TITLE__/g, 'Home Page')
      .replace(/__DESCRIPTION__/g, 'Home Page Description');

    res.send(data)
  })
})

app.use(express.static(path.resolve(__dirname, './build')))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
