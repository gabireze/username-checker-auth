const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('OK')
});

require('./app/controllers/index')(app);

app.listen(3000);