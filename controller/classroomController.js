const Classroom = require("../models/classroom");

async function getall(req, res) {
  try {
    const data = await Classroom.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}
async function add(req, res) {
  try {
    console.log("data", req.body);
    const user = new Classroom(req.body);
    await user.save();
    res.status(200).send("add good");
  } catch (err) {
    res.status(400).send({ error: err });
    //console.log();
  }
}

async function getbyid(req, res) {
  try {
    const data = await Classroom.findById(req.params.id);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getbyname(req, res) {
  try {
    let name = req.params.name;
    const dataname = await Classroom.findOne({ name });
    res.status(200).send(dataname);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function update(req, res) {
  try {
    await Classroom.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("updated");
  } catch (err) {
    res.status(400).send(err);
  }
}

async function deleteClassroom(req, res) {
  try {
    await Classroom.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = { getall, add, getbyid, getbyname, update, deleteClassroom };
