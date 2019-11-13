const app = require("express")();
const formidable = require("formidable");
const path = require("path");
const PORT = 3000;

app.get("/", (req, res) => res.send("file uploader"));

app.post("/", (req, res) => {
  // parse the form data
  const form = new formidable.IncomingForm();
  form.parse(req);

  form.on("fileBegin", (name, file) => { // runs when file is deteched
    file.path = path.join(__dirname, `./images/${file.name}`);
  }).on("file", (name, file) => { // runs when runs when file is received
    console.log(`uploaded ${file.name}`);
  }).on("end", () => { // runs when the entire request is received
    res.json({
      fileUploaded: "true"
    })
  }).on("error", err => { // run when there an error
    res.json({
      upoloadError: err
    })
  });
})

app.listen(PORT, console.log(`app running on port ${PORT}`));
