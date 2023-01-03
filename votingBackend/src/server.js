const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/", (req, res) => {
    return res.status(200).send({'status': "OK", "message": "Welcome to Voting Backend"});
});

app.post("/api/vote", (req, res) => {});
app.get("/api/vote", (req, res) => {});
app.get("/api/vote/:type/:id", (req, res) => {});

mongoose.connect(process.env.MONGO_URI, {}, () => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log('Server running on port 5000');
    })
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Disconnected from MongoDB');
        process.exit(0);
    })
})