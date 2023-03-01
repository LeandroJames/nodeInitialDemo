const fileUpload = require("express-fileupload")
const express = require("express");
var cors = require('cors')
const app = express();
const port = 3000;

app.get("/user", (req, res) => {
  let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.json({ name: "Leandro", age: 30, url: fullUrl });
});

app.use(fileUpload());

app.use(express.static('public'));


app.post('/upload', (req, res) => {
    const { image } = req.files
    if  (!image) return res.sendStatus(400)
    if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png' && image.mimetype !== 'image/gif') {
        throw new Error ("Wrong image format: only use jpg, png or gif");
    }
    console.log(image)
    console.log(image.mimetype)
    res.sendStatus(200);
});

app.post('/time', (req, res) => {
    //if (req.header())
    res.json({time: new Date()})
})

app.use(cors())

app.use((req, res, next) => {
    res.set("Cache-Control", 'no-cache')
    next()
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});