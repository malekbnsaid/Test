const express = require("express");
const router = express.Router();
const User = require("../models/user");
const classroomController = require("../controller/classroomController");
router.get("/", function (req, res) {
  res.send("hello express");
});
router.get("/:name/:email/:cin", function (req, res) {
  new User({
    name: req.params.name,
    email: req.params.email,
    cin: req.params.cin,
  }).save();
  //res.send("hello express");
});
router.post("/add", classroomController.add);
router.get("/getall", classroomController.getall);
router.get("/get/:id", classroomController.getbyid);
router.get("/getname/:name", classroomController.getbyname);
router.put("/update/:id",classroomController.update);
router.delete("/deleteuser/:id", classroomController.deleteClassroom);

module.exports = router;
