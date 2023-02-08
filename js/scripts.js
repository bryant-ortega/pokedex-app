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

        // creating button to add pokekmon //
        button.innerText = pokemon.name;
        button.classList.add("customButton");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);

        // event listener added to button //
        addEventListener(button, pokemon);
    }

    function addEventListener(button, pokemon) {
        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
    };
})();

// New .forEach() loop //
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
