exports.up = function (knex) {
  return knex.schema
    .createTable("west", (tbl) => {
      tbl.increments();
      tbl.string("zone", 10).notNullable();
      tbl.string("day1", 128);
      tbl.string("day2", 128);
      tbl.string("day3", 128);
      tbl.string("day4", 128);
      tbl.string("day5", 128);
      tbl.string("day6", 128);
    })
    .createTable("east", (tbl) => {
      tbl.increments();
      tbl.string("zone", 10).notNullable();
      tbl.string("day1", 128);
      tbl.string("day2", 128);
      tbl.string("day3", 128);
      tbl.string("day4", 128);
      tbl.string("day5", 128);
      tbl.string("day6", 128);
    })
    .createTable("south", (tbl) => {
      tbl.increments();
      tbl.string("zone", 10).notNullable();
      tbl.string("day1", 128);
      tbl.string("day2", 128);
      tbl.string("day3", 128);
      tbl.string("day4", 128);
      tbl.string("day5", 128);
      tbl.string("day6", 128);
    })
    .createTable("zips", (tbl) => {
      tbl.increments();
      tbl.string("zipcode", 5).notNullable();
      tbl.string("zone", 10);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("zips")
    .dropTableIfExists("west")
    .dropTableIfExists("east")
    .dropTableIfExists("south");
};
