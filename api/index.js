const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const productRouter = require('../routes/productRoute');

const app = express();

const mongoURL = process.env.MONGODB_URI || "";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
};

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    connectDB();
});

app.get('/', (req, res) => {
    res.send({ message: "Welcome to api" });
});

app.get('/users', (req, res) => {
    res.send({
        users: [
            { id: 1, name: "x" },
            { id: 2, name: "y" },
        ]
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productRouter);

module.exports = app;
