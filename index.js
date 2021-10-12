const express = require('express')

const app = express()

app.listen(5500)

app.use(express.json())

let users = {
    data: [{
        id: 1,
        name: "Jakeliny Gracielly",
        avatar: "https://github.com/maykbrito.png",
        city: "São Paulo"
    }]
}

app.route('/api').get((req, res) => res.send(users))

app.route('/api').post((req, res) => {
    const lastId = users.data[users.data.length - 1]?.id || 0;
    users.data.push({
        id: lastId + 1,
        name: req.body.name,
        avatar: req.body.avatar,
        city: req.body.city
    })
    res.send('Saved user')
})

app.route('/api/:id').put((req, res) => {
    const userId = req.params.id

    const user = users.data.find(user => Number(user.id) === Number(userId))

    if (!user) {
      return res.send('User nor found!')
    }

    const updatedUser = {
        ...user, 
        name: req.body.name,
        avatar: req.body.avatar,
        city: req.body.city
      }

      users.data = users.data.map(user => {
        if(Number(user.id) === Number(userId)) {
          user = updatedUser
        }        
        return user
      })

      res.send("Updated user")
})

app.route('/api/:id').delete((req, res) => {
    const userId = req.params.id

    users.data = users.data.filter(user => Number(user.id) !== Number(userId))

    res.send('Deleted User')
})