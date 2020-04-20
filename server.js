const express = require('express');

const app = express();
const apiRoutes = require('./routes/api');

let portNumber = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/api', apiRoutes);

app.listen(portNumber, () => {
    console.log(`Server running on Port ${portNumber}!`);
});
