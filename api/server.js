const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const dModel = require("../sskData/SSKDataModel");

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

//GETS
server.get("/", (req, res) => {
  res.send(
    `<div>
      <h1>Welcome to Sevens Seas Zone and Zip Database API!</h1>
      <h2>Data displayed will be RAW JSON formatting</h2>
      <h3>To view source code for this DB: https://github.com/RSibaja88/SQL-SSK</h3>
      <p>
        To fetch information from the API, add the following to the end of the
        URL:
      </p>
      <p>"/api/zips" - This will show you all of the zipcodes included in the DB</p>
      <p>"/api/zips/:zipcode" - (IE: /api/zips/92106) This will show you the data attached to a specific zipcode</p>
      <p>"/api/zips/zone/:zone" - (IE: /api/zips/zone/east)This will show you all of the zipcodes in that particular zone</p>
      <p>"/api/:zone" - (IE: /api/east)This will show you the schedule for that particular zone. Use all lowercase for zone in URL</p>
      <ul><p>Other API functions created:</p>
      <li>Update Existing Zipcode Entry</li>
      <li>Update Existing Zone Schedule</li>
      <li>Add new Zipcode entry</li>
      <li>Delete a specific Zipcode Entry</li> </ul>
    </div>`
  );
});

server.get("/api/zips", (req, res) => {
  dModel
    .findZips()
    .then((zips) => {
      res.status(200).json(zips);
    })
    .catch((error) => {
      res.status(500).json({ message: "Couldn't fetch list of zips.", error });
    });
});

server.get("/api/zips/:zipcode", (req, res) => {
  const { zipcode } = req.params;
  dModel
    .findByZip(zipcode)
    .then((zip) => {
      if (zip) {
        res.status(200).json(zip);
      } else {
        res.status(404).json({ message: "Zipcode not found in database" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't find that specific Zipcode's information",
        error,
      });
    });
});

server.get("/api/zips/id/:id", (req, res) => {
  const { id } = req.params;
  dModel
    .findByID(id)
    .then((zip) => {
      if (zip) {
        res.status(200).json(zip);
      } else {
        res.status(404).json({ message: "Zipcode not found in database" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't find that specific Zipcode's information",
        error,
      });
    });
});

server.get("/api/zips/zone/:zone", (req, res) => {
  const { zone } = req.params;
  dModel
    .findByZone(zone)
    .then((zip) => {
      if (zip) {
        res.status(200).json(zip);
      } else {
        res.status(404).json({ message: "Zone not found in database" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't find that specific Zone's list of Zipcodes",
        error,
      });
    });
});

server.get("/api/west", (req, res) => {
  dModel
    .findWest()
    .then((days) => {
      res.status(200).json(days);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't fetch the schedule for the West side.",
        error,
      });
    });
});

server.get("/api/east", (req, res) => {
  dModel
    .findEast()
    .then((days) => {
      res.status(200).json(days);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't fetch the schedule for the East side.",
        error,
      });
    });
});

server.get("/api/south", (req, res) => {
  dModel
    .findSouth()
    .then((days) => {
      res.status(200).json(days);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't fetch the schedule for the South side.",
        error,
      });
    });
});

//UPDATE EXISTING ZIPCODE DATA
server.patch("/api/zips/editing/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  dModel
    .updateZip(id, changes)
    .then((newZip) => {
      if (newZip) {
        res.status(200).json(newZip);
      } else {
        res.status(404).json({ message: "Zipcode not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "ERROR editing your entry",
        error,
      });
    });
});

//UPDATE EXISTING EAST SCHEDULE
server.patch("/api/east/editing/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  dModel
    .updateEast(id, changes)
    .then((newZone) => {
      if (newZone) {
        res.status(200).json(newZone);
      } else {
        res.status(404).json({ message: "Zone Schedule not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "ERROR editing your entry",
        error,
      });
    });
});

//UPDATE EXISTING WEST SCHEDULE
server.patch("/api/west/editing/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  dModel
    .updateWest(id, changes)
    .then((newZone) => {
      if (newZone) {
        res.status(200).json(newZone);
      } else {
        res.status(404).json({ message: "Zone Schedule not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "ERROR editing your entry",
        error,
      });
    });
});

//UPDATE EXISTING SOUTH SCHEDULE
server.patch("/api/south/editing/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  dModel
    .updateSouth(id, changes)
    .then((newZone) => {
      if (newZone) {
        res.status(200).json(newZone);
      } else {
        res.status(404).json({ message: "Zone Schedule not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "ERROR editing your entry",
        error,
      });
    });
});

//POSTS
server.post("/api/zips/new", (req, res) => {
  dModel
    .addZip(req.body)
    .then((zip) => {
      res.status(200).json(zip);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Unable to add zipcode at this time.", error });
    });
});

//DELETE
server.delete("/api/zips/:zipcode", (req, res) => {
  const { zipcode } = req.params;
  dModel
    .removeZip(zipcode)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: "Zipcode entry was successfully deleted " });
      } else {
        res
          .status(404)
          .json({ message: "Couldn't find specific zipcode to delete it." });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Unable to delete that zipcode entry. ", error });
    });
});

module.exports = server;
