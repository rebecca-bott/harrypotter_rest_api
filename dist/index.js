"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const characters_json_1 = __importDefault(require("./data/characters.json"));
const spells_json_1 = __importDefault(require("./data/spells.json"));
const potions_json_1 = __importDefault(require("./data/potions.json"));
const housequiz_json_1 = __importDefault(require("./data/housequiz.json"));
const app = express_1.default();
const port = 8080;
app.use(cors_1.default());
app.get("/", (req, res) => {
    res.send("hello world");
});
const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
function getRandomHouse(items) {
    return items[Math.floor(Math.random() * items.length)];
}
app.get("/sortinghat", (req, res) => {
    return res.json({
        house: getRandomHouse(houses),
    });
});
app.get("/characters", (req, res) => {
    const charactersArray = characters_json_1.default;
    charactersArray.flat();
    return res.json(charactersArray);
});
app.get("/potions", (req, res) => {
    const potionsArray = potions_json_1.default;
    potionsArray.flat();
    return res.json(potionsArray);
});
app.get("/spells", (req, res) => {
    const spellsArray = spells_json_1.default;
    spellsArray.flat();
    return res.json(spellsArray);
});
app.get("/houseQuiz", (req, res) => {
    const houseQuizArray = housequiz_json_1.default;
    houseQuizArray.flat();
    return res.json(houseQuizArray);
});
app.get("/wands", (req, res) => {
    const wands = characters_json_1.default
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
    const characterSearch = characters_json_1.default.filter((character) => {
        return character.name.toLowerCase().indexOf(search) !== -1;
    });
    return res.json(characterSearch);
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("server started at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map