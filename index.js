//Chamada express + server
const express = require('express');
const server = express();

//Aceita requisições JSON
server.use(express.json());

//Personagens
let personagens = ['Vegeta', 'Goku', '17'];

//Middleware
function checkUserExists(req, res, next) {
  const { person } = req.body;

  if (!person) {
    return res.status(400).json({
      "msg": "Não é possível fazer a ação no Personagem!",
      personagens
    });
  }

  req.person = person;

  return next();
}

function checkInArray(req, res, next) {
  let { id } = req.params;

  if (!personagens[id]) {
    return res.status(400).json({
      "msg": "Não encontramos nenhum Personagem!",
      personagens
    });
  }

  req.id = id;

  return next();
}

////////CRUD

//List
server.get("/person", (req, res) => {
  return res.json(personagens)
});

//Create
server.post("/person/create", checkUserExists, (req, res) => {
  personagens.push(req.person);
  return res.json(personagens);
});

//Read
server.get("/person/read/:id", checkInArray, (req, res) => {
  return res.json(personagens[req.id]);
});

//Update
server.put("/person/update/:id", checkUserExists, checkInArray, (req, res) => {
  personagens[req.id] = req.person;
  return res.json(personagens);
});

//Delete
server.delete("/person/delete/:id", checkInArray, (req, res) => {
  personagens.splice(req.id, 1);
  return res.json(personagens);
});

//Start Server port
server.listen(3000)