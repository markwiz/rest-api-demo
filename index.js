const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        
app.use(express.json()) 

const widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

const clients = [
  {id: 1, name: "dildomar", email: "dildomart@suurvarvas.com"},
  {id: 2, name: "alexander", email: "alexanderthegreate@domination.com"},
]

app.get('/', (req, res) => {
    res.send({ message: 'Widget API up. Try GET /widgets' });
});

app.get('/widgets', (req, res) => {
    res.send(widgets)
})

app.get('/widgets/:id', (req, res) => {
    if (typeof widgets[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(widgets[req.params.id - 1])
})

app.post('/widgets', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newWidget = {
        id: widgets.length + 1,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('/widgets/' + newWidget.id).send(newWidget)
})

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080/widgets`)
})

app.put('/widgets/:id', (req, res) => {
    if (typeof widgets[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    widgets[req.params.id - 1].name = req.body.name
    widgets[req.params.id - 1].price = req.body.price
    res.send(widgets[req.params.id - 1])
})

//Client 

app.get('/clients', (req, res) => {
    res.send(clients)
})

app.get('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Client not found" })
    }
    res.send(clients[req.params.id - 1])
})

app.post('/clients', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newClient = {
        id: clients.length + 1,
        name: req.body.name,
        email: req.body.email
    }
    clients.push(newClient)
    res.status(201).location('/clients/' + newClient.id).send(newClient)
})

app.put('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Client not found" })
    }
    clients[req.params.id - 1].name = req.body.name
    clients[req.params.id - 1].email = req.body.email
    res.send(clients[req.params.id - 1])
})

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080/clients`)
})
