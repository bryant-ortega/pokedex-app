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
        if (typeof pokemon === "object") {
            if (Object.keys(pokemonList[0]).every(key => key in pokemon)) {
                pokemonList.push(pokemon);
            } else {
                console.log(
                    "Incorrect Pokemon Data! Please enter name, height, and type(s)."
                );
            }
        }
    }
    // Bonus Task .filter() search function //
    function search(query) {
        return pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("customButton");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
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
    pokemonRepository.addListItem(pokemon);
});
