const express = require('express');

const app = express();
const apiRoutes = require('./routes/api');


app.use(express.static('public'));
app.use('/api', apiRoutes);

app.listen(8080, () => {
    console.log("Server running on Port 8080!");
});
