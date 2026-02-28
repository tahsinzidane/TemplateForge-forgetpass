const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./src/config/db")
const users = require("./src/models/users");


// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//db connection
connectDB

// Besic routes
app.get("/", (req, res) => {
    res.send("server runngin");
})
app.use(require("./src/routes/checkmail"));
app.use(require("./src/routes/verification"));
app.use(require("./src/routes/update-pass"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});