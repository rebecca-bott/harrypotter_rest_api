import express from "express";
import cors from "cors";
import characters from "./data/characters.json";
import spells from "./data/spells.json";
import potions from "./data/potions.json";
import houseQuiz from "./data/housequiz.json"

const app = express();
const port = 8080;

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});

const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

function getRandomHouse(items: string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

app.get("/sortinghat", (req, res) => {
  return res.json({
    house: getRandomHouse(houses),
  });
});

app.get("/characters", (req, res) => {
  const charactersArray = characters;
  charactersArray.flat();

  return res.json(charactersArray);
});

app.get("/potions", (req, res) => {
  const potionsArray = potions;
  potionsArray.flat();

  return res.json(potionsArray);
});

app.get("/spells", (req, res) => {
  const spellsArray = spells;
  spellsArray.flat();

  return res.json(spellsArray);
});

app.get("/houseQuiz", (req, res) => {
  const houseQuizArray = houseQuiz;
  houseQuizArray.flat();

  return res.json(houseQuizArray);
});

app.get("/wands", (req, res) => {
  const wands = characters
    .map((character) => {
      return character.wand;
    })
    .filter((wand) => {
      return wand.core !== "" && wand.length !== "" && wand.wood !== "";
    });
  return res.json(wands);
});

app.get("/characters/:search", (req, res) => {
  // Retrieve the tag from our URL path
  const search = req.params.search.toLowerCase();
  const characterSearch = characters.filter((character) => {
    return character.name.toLowerCase().indexOf(search) !== -1;
  });

  return res.json(characterSearch);
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log("server started at http://localhost:" + port);
});
