// Pokémon data to display in app//
let pokemonList = [
    { name: "Charizard", height: 1.7, type: ["Fire", "Flying"] },
    { name: "Bulbasaur", height: 0.7, type: ["Grass", "Poison"] },
    { name: "Lapras", height: 2.5, type: ["Ice", "Water"] },
];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(
        pokemonList[i].name + " (height: " + pokemonList[i].height + ")"
    );
}
