const router = require("express").Router();
const Dip = require("../models/diplomModul");


// Create a new certificate
router.post("/", async (req, res) => {
  try {
    const existCertificate = await Dip.find({ id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname });
    if (existCertificate.length > 0) {
      return res.status(409).json({ message: "Certificate already exists" });
    }

    const newCertificate = new Dip({
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      other: req.body.other,
      courseName: req.body.courseName,
      givenDate: req.body.givenDate,
      catigory: req.body.catigory,
      prosent: req.body.prosent,
    });
    const certificate = await newCertificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ message: "Error creating certificate", error: err.message });
  }
});


// Check certificate by ID
router.get("/check/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const certificate = await Dip.findOne({ id });
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (err) {
    res.status(500).json({ message: "Error fetching certificate", error: err.message });
  }
});


// Get all certificates
router.get("/all", async (req, res) => {
  try {
    const allCertificates = await Dip.find({});
    res.status(200).json(allCertificates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching certificates", error: err.message });
  }
});

// Soft delete a certificate by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const removedCert = await Dip.findByIdAndDelete(id, { deleted: true });

    if (!removedCert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json({ message: "Certificate soft-deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting certificate", error: error.message });
  }
});

// Search certificates
router.get("/search", async (req, res) => {
  try {
    const { id, firstname, lastname, other, courseName } = req.query;
    const query = {};

    if (id) query.id = id;
    if (firstname) query.firstname = new RegExp(firstname, 'i'); // case-insensitive search
    if (lastname) query.lastname = new RegExp(lastname, 'i');
    if (other) query.other = new RegExp(other, 'i');
    if (courseName) query.courseName = courseName;

    const certificates = await Dip.find(query);
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ message: "Error searching certificates", error: err.message });
  }
});


module.exports = router;
