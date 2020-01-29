//Chamada express + server
const express = require('express');
const server = express();

//Aceita requisições JSON
server.use(express.json());

//Personagens
let personagens = ['Dener', 'Bruce Dener', 'Dener Telo'];

//List
server.get("/persons", (req, res) => {
  return res.json(personagens)
});

//Create
server.post("/person/create", (req, res) => {
  const { person } = req.body;
  personagens.push(person);

  return res.json(personagens);
});

//Read
server.get("/persons/read/:id", (req, res) => {
  let { id } = req.params;

  if (personagens[id]) {
    return res.json(personagens[id]);
  }

  return res.status(400).json({
    "msg": "Não encontramos nenhum Personagem!",
    personagens
  });
});

//Update
server.put("/person/update/:id", (req, res) => {
  const { id } = req.params;
  const { person } = req.body;

  if (personagens[id]) {
    personagens[id] = person;
    return res.json(personagens);
  }

  return res.status(400).json({
    "msg": "Não encontramos nenhum Personagem!",
    personagens
  });
});

//Delete
server.delete("/person/delete/:id", (req, res) => {
  const { id } = req.params;

  if (personagens[id]) {
    personagens.splice(id, 1);
    return res.json(personagens);
  }

  return res.status(400).json({
    "msg": "Não encontramos nenhum Personagem!",
    personagens
  });
});

//Start Server port
server.listen(3000)