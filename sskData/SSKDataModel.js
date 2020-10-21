//Knex Queries

//IMPORTS
const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

//POST ZIP
async function addZip(zip) {
  const [id] = await db("zips").insert(zip);
  return id;
}

//POST ZONE
async function addZone(zone) {
  const [id] = await db("zones").insert(zone);
  return id;
}

//GET ALL ZIPCODES
function findZips() {
  return db("zips");
}

//GET ALL ZONES
function findZones() {
  return db("zones");
}

//GET ZIP BY

function findByZip(zipcode) {
  return db("zips").where({ zipcode }).first();
}

function findByID(id) {
  return db("zips").where({ id }).first();
}

function findByZone(zone) {
  return db("zips").where({ zone });
}

//GET ZONE BY (ZONE & ID)
function findZoneByZone(zone) {
  return db("zones").where({ zone }).first();
}

function findZoneByID(id) {
  return db("zones").where({ id }).first();
}

//UPDATE Existing Zipcode
async function updateZip(id, changes) {
  return await db("zips")
    .where({ id })
    .update(changes)
    .then(() => {
      return findByID(id);
    });
}

//UPDATES ALL ZIPCODES WITHIN A ZONE
async function updateZipZone(zone, changes) {
  return await db("zips")
    .where({ zone })
    .update(changes)
    .then(() => {
      return findByZone(zone);
    });
}

//UPDATE Existing Zone Schedule
async function updateZone(id, changes) {
  return await db("zones")
    .where({ id })
    .update(changes)
    .then(() => {
      return findZoneByID(id);
    });
}

//DELETE ZIP
function removeZip(zipcode) {
  return db("zips").where({ zipcode }).del();
}

//DELETE ZONE
function removeZone(zone) {
  return db("zones").where({ zone }).del();
}

module.exports = {
  addZip,
  addZone,
  findZones,
  findZips,
  findByZip,
  findByZone,
  findZoneByZone,
  findByID,
  findZoneByID,
  removeZip,
  removeZone,
  updateZip,
  updateZone,
  updateZipZone,
};
