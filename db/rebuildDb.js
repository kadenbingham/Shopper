const client = require("./client");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(/* SQL */ `
      drop table if exists products cascade;
    `);
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    await client.query(/* SQL */ `
      create table products (
        id bigserial primary key,
        name text not null
      );
    `);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    await client.query(/* SQL */ `
      insert into products
        (name)
      values
        ('Big jar of salsa'),
        ('Balsa wood model plane'),
        ('A really big balloon')
    `);
  } catch (error) {
    console.error(error);
  }
}

module.exports = async function rebuildDb() {
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  }
};
