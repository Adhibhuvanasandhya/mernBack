const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const users = [];
const fruits = [];

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists!" });
    }
    users.push({ username, password });
    res.status(201).json({ message: "Signup successful!" });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials!" });
    }
    res.status(200).json({ message: "Login successful!" });
});

// Add fruit route
app.post('/add-fruit', (req, res) => {
    const { fruit } = req.body;
    fruits.push(fruit);
    res.status(201).json({ message: "Fruit added successfully!", fruits });
    console.log(fruits)
});

// Delete fruit route
app.delete('/delete-fruit', (req, res) => {
    const { fruit } = req.body;
    const index = fruits.indexOf(fruit);
    if (index > -1) {
        fruits.splice(index, 1);
    }
    res.status(200).json({ message: "Fruit deleted successfully!", fruits });
});

// Get fruits
app.get('/fruits', (req, res) => {
    res.status(200).json(fruits);
});




app.listen(5000,function(){
    console.log("server start")
})