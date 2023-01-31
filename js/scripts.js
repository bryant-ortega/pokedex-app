// wrapping Pokémon Data in IIFE format //
let pokemonRepository = (function () {
    // Pokémon data to display in app//
    let pokemonList = [
        { name: "Charizard", height: 1.7, type: ["Fire", "Flying"] },
        { name: "Bulbasaur", height: 0.7, type: ["Grass", "Poison"] },
        { name: "Lapras", height: 2.5, type: ["Ice", "Water"] },
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
    };
})();

/*the original for loop 
loop to print the pokemon objects with height condition to the DOM//
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.7) {
        document.write(
            pokemonList[i].name +
                " (height: " +
                pokemonList[i].height +
                "m) - Wow that's big! <p>"
        );
    } else {
        document.write(
            pokemonList[i].name + " (height: " + pokemonList[i].height + "m)<p>"
        );
    }
} */

// New .forEach() loop //
pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 1.7) {
        document.write(
            pokemon.name +
                " (height: " +
                pokemon.height +
                "m) - Wow that's big! <p>"
        );
    } else {
        document.write(pokemon.name + " (height: " + pokemon.height + "m)<p>");
    }
});
