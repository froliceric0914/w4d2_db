const query = process.argv[2];
console.log(query);
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect(err => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(
    `SELECT * FROM famous_people WHERE first_name >= \'${query}\'`,
    (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(`Found ${result.rows.length} person(s) named ${query}`);
      let resultStr = "";
      //   console.log(result.rows);
      result.rows.forEach(
        (obj, pos) => (
          //   console.log(obj),
          console.log(pos),
          (resultStr += `${pos + 1}. ${obj.first_name} ${obj.last_name}, born ${
            obj.birthdate
          }\n`)
        )
      );
      console.log(resultStr);
      client.end();
    }
  );
});
