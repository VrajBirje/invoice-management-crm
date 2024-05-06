const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { TbHorse } = require('react-icons/tb')

const app = express()
const port = process.env.port || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//my sql
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '#Barcelona2015',
    database: 'vraj_invoice'
})

app.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connect as id ${connection.threadId}`)
        connection.query('SELECT * from users', (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            }
            else {
                console.log(err)
            }
        })
    })
})

app.get('/users/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connect as id ${connection.threadId}`)
        connection.query('SELECT * from users WHERE id = ?',[req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            }
            else {
                console.log(err)
            }
        })
    })
})

app.delete('/users/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connect as id ${connection.threadId}`)
        connection.query('DELETE from users WHERE id = ?',[req.params.id], (err, rows) => {
            connection.release()
            if (!err) {
                res.send(`user with the record id ${req.params.id} is deleted`)
            }
            else {
                console.log(err)
            }
        })
    })
})


app.post('/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connect as id ${connection.threadId}`)
        const params = req.body;
        const {name, role, phone , email} = req.body;
        console.log(name, role , phone , email)
        var sql = `INSERT INTO users (name,role,phone,email) VALUES ('${name}','${role}','${phone}','${email}')`;
        connection.query('INSERT INTO users SET ?',params,(err, result) => {
            connection.release()
            if (!err) {
                res.send(`user with the record id ${result.insertId} has been added`)
            }
            else {
                console.log(err)
            }
        })
    })
})



app.put('/users/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connect as id ${connection.threadId}`)
        // const params = req.body;
        const {id , name, role, phone , email} = req.body;
        connection.query('UPDATE users SET name = ? WHERE id = ?',[name,id],(err, result) => {
            connection.release()
            if (!err) {
                res.send(`user with the record id ${name} has been added`)
            }
            else {
                console.log(err)
            }
        })
    })
})







//listen on env port or 500
app.listen(port, () => console.log(`Listen on Port: ${port}`))
