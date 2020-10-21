//Knex Queries

//IMPORTS
const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

//ADD ZIP
async function addZip(zip) {
  const [id] = await db("zips").insert(zip);
  return id;
}

//GETS EVERYTHING
function findEverything() {
  return db(["west", "east", "south", "zips"]);
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

function findByZone(zone) {
  return db("zips").where({ zone });
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
  findEverything,
  removeZip,
};
