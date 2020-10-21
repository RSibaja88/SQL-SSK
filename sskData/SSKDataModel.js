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

//GET SPECIFIC ZONES DATA
function findWest() {
  return db("west");
}

function findEast() {
  return db("east");
}

function findSouth() {
  return db("south");
}

//GET ALL ZIPCODES
function findZips() {
  return db("zips");
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

//GET ZONE BY ID
function eastByID(id) {
  return db("east").where({ id }).first();
}

function westByID(id) {
  return db("west").where({ id }).first();
}

function southByID(id) {
  return db("south").where({ id }).first();
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

//UPDATE Existing East Schedule
async function updateEast(id, changes) {
  return await db("east")
    .where({ id })
    .update(changes)
    .then(() => {
      return eastByID(id);
    });
}

//UPDATE Existing West Schedule
async function updateWest(id, changes) {
  return await db("west")
    .where({ id })
    .update(changes)
    .then(() => {
      return westByID(id);
    });
}

//UPDATE Existing South Schedule
async function updateSouth(id, changes) {
  return await db("south")
    .where({ id })
    .update(changes)
    .then(() => {
      return southByID(id);
    });
}

//DELETE ZIP
function removeZip(zipcode) {
  return db("zips").where({ zipcode }).del();
}

module.exports = {
  addZip,
  findWest,
  findEast,
  findSouth,
  findZips,
  findByZip,
  findByZone,
  findByID,
  eastByID,
  westByID,
  southByID,
  removeZip,
  updateZip,
  updateEast,
  updateWest,
  updateSouth,
};
