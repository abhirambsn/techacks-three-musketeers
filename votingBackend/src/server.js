const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send({'status': "OK", "message": "Welcome to Voting Backend send requests to /api"});
});

const routes = require('./routes/vote');
app.use("/api", routes);

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