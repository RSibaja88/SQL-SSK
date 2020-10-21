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
      <h3>Data displayed will be raw json formatting</h3>
      <p>
        To fetch information from the API, add the following to the end of the
        URL:
      </p>
      <p>"/api/everything" - This will show you all of the data</p>
      <p>"/api/zips" - This will show you all of the zipcodes included in the DB</p>
      <p>"/api/zips/:zipcode" - (IE: /api/zips/92106) This will show you the data attached to a specific zipcode</p>
      <p>"/api/zips/zone/:zone" - (IE: /api/zips/zone/east)This will show you all of the zipcodes in that particular zone</p>
      <p>"/api/:zone" - (IE: /api/east)This will show you the schedule for that particular zone. Use all lowercase for zone in URL</p>
    </div>`
  );
});

server.get("/api/everything", (req, res) => {
  dModel
    .findEverything()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      res.status(500).json({ message: "Couldn't fetch API.", error });
    });
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
