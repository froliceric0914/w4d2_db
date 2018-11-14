const settings = require("./settings");

let knex = require("knex")({
  client: "pg",
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

function findFamousByName(name) {
  knex("famous_people")
    .where({ first_name: name })
    .then(rows =>
      rows.forEach((r, i) =>
        console.log(
          `${i + 1}. ${r.first_name} ${r.last_name}, born ${r.birthdate}`
        )
      )
    );
}

function addFamousPerson(person) {
  knex("famous_people")
    .insert({
      first_name: person.first_name,
      last_name: person.last_name,
      birthdate: person.birthdate
    })
    .then(res => console.log("ok"));
}

const newPerson = {
  first_name: "Eric",
  last_name: "Zhao",
  birthdate: "yesterday"
};

addFamousPerson(newPerson);
findFamousByName("Eric Zhao");
