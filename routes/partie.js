const express = require("express");
const router = express.Router();
const partirController = require("../controller/partieController");

router.get("/partie", (req, res) => {
  res.render("partie");
});

router.post("/newjoueur", partirController.add);
router.get("/getalljoueur", partirController.getall);
router.get("/getjoueur/:id", partirController.getbyid);
router.delete("/deletejoueur/:id", partirController.deletejoueur);
router.put("/attaque/:id1/:id2", partirController.attaque);
router.put("/newpartie/:id1/:id2", partirController.addpartie);

module.exports = router;
