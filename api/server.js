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
      <h2>This is a server side rendering, clients will not see this page</h2>
      <h3>To view source code for this DB: https://github.com/RSibaja88/SQL-SSK</h3>
      <p>
        To fetch information from the API, add the following to the end of the
        URL:
      </p>
      <p>"/api/zips" - This will show you all of the zipcodes included in the DB</p>
      <p>"/api/zones" - This will show you all of the zones included in the DB</p>
      <p>"/api/zips/:zipcode" - (IE: /api/zips/92106) This will show you the data attached to a specific zipcode</p>
      <p>"/api/zips/id/:id" - (IE: /api/zips/id/4) This will fetch a zipcode entry by its respective "id: " number</p>
      <p>"/api/zips/zone/:zone" - (IE: /api/zips/zone/east)This will show you all of the zipcodes in that particular zone</p>
      <p>"/api/zones/zone/:zone" - (IE: /api/zones/zone/east)This will show you the schedule for that particular zone. Use all lowercase for zone in URL</p>
      <p>"/api/zones/zone/:id" - (IE: /api/zones/zone/5)This will show you the schedule for that particular zone.</p>
      <ul><p>Other API functions created:</p>
      <li>Update Existing Zipcode Entry</li>
      <li>Update Existing Zone Schedule</li>
      <li>Update All Zipcodes in the Same Zone</li>
      <li>Add new Zipcode entry</li>
      <li>Add new Zone entry</li>
      <li>Delete a specific Zipcode Entry</li>
      <li>Delete a specific Zone Entry</li </ul>
    </div>`
  );
});

//GET ALL ZIPCODES - TEST PASSED
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

//GET ALL ZONES - TEST PASSED
server.get("/api/zones", (req, res) => {
  dModel
    .findZones()
    .then((zones) => {
      res.status(200).json(zones);
    })
    .catch((error) => {
      res.status(500).json({ message: "Couldn't fetch list of zips.", error });
    });
});

//GET ZIPCODE DATA BY ZIPCODE - TEST PASSED
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

//GET ZIPCODE DATA BY ID - TEST PASSED
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

//GET ZIPCODES DATA BY ZONE - TEST PASSED
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

//GET ZONE DATA BY ZONE NAME - TEST PASSED
server.get("/api/zones/zone/:zone", (req, res) => {
  const { zone } = req.params;
  dModel
    .findZoneByZone(zone)
    .then((zone) => {
      if (zone) {
        res.status(200).json(zone);
      } else {
        res.status(404).json({ message: "Zone not found in database" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't find that specific Zone's information",
        error,
      });
    });
});

//GET ZONE BY ID - TEST PASSED
server.get("/api/zone/id/:id", (req, res) => {
  const { id } = req.params;
  dModel
    .findZoneByID(id)
    .then((zone) => {
      if (zone) {
        res.status(200).json(zone);
      } else {
        res.status(404).json({ message: "Zone not found in database" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't find that specific Zone's information",
        error,
      });
    });
});

//UPDATE EXISTING ZIPCODE DATA - TEST PASSED
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

//UPDATE FOR EACH ZIPCODE IN SAME ZONE - TEST PASSED
server.patch("/api/zips/zone/editing/:zone", (req, res) => {
  const { zone } = req.params;
  const changes = req.body;
  dModel
    .updateZipZone(zone, changes)
    .then((newZipZone) => {
      if (newZipZone) {
        res.status(200).json(newZipZone);
      } else {
        res
          .status(404)
          .json({ message: "No Zipcodes with specified zone found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "ERROR editing your entries",
        error,
      });
    });
});

//UPDATE EXISTING ZONE SCHEDULE - TEST PASSED
server.patch("/api/zones/editing/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  dModel
    .updateZone(id, changes)
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

//POST ZIP - TEST PASSED
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

//POST ZONE _ TEST PASSED
server.post("/api/zones/new", (req, res) => {
  dModel
    .addZone(req.body)
    .then((zone) => {
      res.status(200).json(zone);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Unable to add zone at this time.", error });
    });
});

//DELETE ZIP - TEST PASSED
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

//DELETE ZONE ENTRY - TEST PASSED
server.delete("/api/zones/:zone", (req, res) => {
  const { zone } = req.params;
  dModel
    .removeZone(zone)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: "Zone entry was successfully deleted " });
      } else {
        res
          .status(404)
          .json({ message: "Couldn't find specific zone to delete it." });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Unable to delete that zone entry. ", error });
    });
});

module.exports = server;
