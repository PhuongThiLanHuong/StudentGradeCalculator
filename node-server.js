const express = require('express');
const app = express();
const path = require('path');

const port = 8888;
const staticFilesPath = 'F:/web/Student Grade Calculator'; // Adjust this path as necessary

// Serve static files from the specified directory
app.use(express.static(staticFilesPath));

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'html/index.html')); // Adjust if your entry file is named differently
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
