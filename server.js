// server.js

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to receive the data and save it to a file
app.post("/save-arrq", (req, res) => {
  const arrq = req.body.arrq;
  const filePath = "D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json";

  const data = JSON.stringify(arrq, null, 2);

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing arrq to file:", err);
      res.status(500).send("Error writing arrq to file");
    } else {
      console.log("Arrq saved to file successfully.");
      res.send("Arrq saved to file successfully.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
