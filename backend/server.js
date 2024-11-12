const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/drug/:name", async (req, res) => {
  const drugName = req.params.name.trim();
  try {
    const response = await axios.get(`https://api.fda.gov/drug/label.json`, {
      params: { search: `openfda.brand_name:"${drugName}"` },
    });

    const drugInfo = response.data.results && response.data.results[0];
    if (drugInfo) {
      const extractField = (field) =>
        Array.isArray(field) && field.length > 0 ? field[0] : "Not available";

      const filteredData = [
        { active_ingredient: extractField(drugInfo.active_ingredient) },
        { purpose: extractField(drugInfo.purpose) },
        { indications_and_usage: extractField(drugInfo.indications_and_usage) },
        { warnings: extractField(drugInfo.warnings) },
        { do_not_use: extractField(drugInfo.do_not_use) },
        { ask_doctor: extractField(drugInfo.ask_doctor) },
        { stop_use: extractField(drugInfo.stop_use) },
        {
          dosage_and_administration: extractField(
            drugInfo.dosage_and_administration
          ),
        },
      ];

      res.json(filteredData);
    } else {
      res.status(404).json({ message: "No data found for the specified drug" });
    }
  } catch (error) {
    console.error("Error fetching drug data:", error);
    res.status(500).send("Error fetching drug data");
  }
});
