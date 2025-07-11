const express = require("express");
const path = require('path');
const morgan = require("morgan");
const { getImage, getLogs } = require("./controllers/images");


const app = express();
app.set('trust proxy', true);

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public/images")));

app.get("/logs", getLogs);
app.get("/images/:imageName", getImage);


const PORT = process.env.PORT || 3000;
app.listen(PORT);
