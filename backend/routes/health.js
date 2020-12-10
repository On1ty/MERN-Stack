const router = require("express").Router();
let Health = require("../models/health.model");

router.route("/").get((req, res) => {
  Health.find()
    .then((health) => res.json(health))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {
  const { fullname, temperature, email, phonenumber } = req.body;

  const newHealthDeclaration = new Health({
    fullname,
    temperature,
    email,
    phonenumber,
  });

  newHealthDeclaration
    .save()
    .then((health) => res.json("New record Added!"))
    .catch((err) => res.status(400).json("Error :" + err));
});

/**
 * Details
 */
router.route("/:id").get((req, res) => {
  Health.findById(req.params.id)
    .then((health) => res.json(health))
    .catch((err) => res.status(400).json("Error :" + err));
});

/**
 * Delete
 */
router.route("/:id").delete((req, res) => {
  Health.findByIdAndDelete(req.params.id)
    .then((health) => res.json("Record was deleted!"))
    .catch((err) => res.status(400).json("Error :" + err));
});

/**
 * Update
 */
router.route("/update/:id").post((req, res) => {
  Health.findById(req.params.id)
    .then((health) => {
      let { fullname, temperature, email, phonenumber } = req.body;

      health.fullname = fullname;
      health.temperature = temperature;
      health.email = email;
      health.phonenumber = phonenumber;

      health
        .save()
        .then(() => res.json("Record was Updated!"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
