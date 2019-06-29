const express = require("express");
const router = express.Router();
const messages = require("../controllers/messages");

router.get("/", (req, res) => {
  res.redirect("../");
});

router.get("/:id", messages.index);

router.get("/:id/edit", messages.load_edit_form);
router.post("/:id/edit", messages.edit);

router.get("/:id/delete", messages.delete);

module.exports = router;
