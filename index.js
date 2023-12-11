const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://anshull23:AntulBantai%4023011606@cluster0.azwepr3.mongodb.net/notes');

const NotesSchema = new mongoose.Schema({
    note : {
        title: String,
        content: String}
});

const NotesModel = mongoose.model("notes", NotesSchema);

app.post('/add', (req, res) => {
    const note = req.body.note;
    NotesModel.create({
        note: note
    }).then(result => res.json(result))
    .catch(err => res.json(err))
});

app.get('/get', (req,res) => {
    NotesModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    NotesModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(port, () => {
    console.log("Server is Running");
});