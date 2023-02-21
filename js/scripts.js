// wrapping Pokémon Data in IIFE format //
let pokemonRepository = (function () {
    // Pokémon data to display in app//
    let pokemonList = [];
    //where all the pokemon information comes from //
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    // get's you the full list of pokemon //
    function getAll() {
        return pokemonList;
    }
// checks if new pokemon is an object type then adds to the pokemonList array //
    function add(pokemon) {
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        } else {
            console.log(
                "Incorrect Pokemon Data! Please enter name, height, and type(s)."
            );
        }
    }

    // Bonus Task .filter() search function //
    function search(query) {
        return pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    }
// creates list of pokemon buttons //
    function addListItem(pokemon) {
        // defines where in the HTML the pokemon will appear //
        let pokemonList = document.querySelector(".pokemon-list");
        // create list elements for each pokemon //
        let listPokemon = document.createElement("li");
        // create button element for each pokemon //
        let button = document.createElement("button");

        // define button to add pokemon //
        button.innerText = pokemon.name;
        button.classList.add("customButton");
        // add button to each list element for each pokemon //
        listPokemon.appendChild(button);
        // add list elements to the HTML section //
        pokemonList.appendChild(listPokemon);

        // event listener added to button //
        addEventListener(button, pokemon);
    }
// declares what the button event listener does //
    function addEventListener(button, pokemon) {
        button.addEventListener("click", function (event) {
            // when button is clicked, showDetails function runs //
            showDetails(pokemon);
        });
    }

    // Modal code from exercise //
// declares what/where modalContainer is //
    let modalContainer = document.querySelector("#modal-container");

// creates the modal //
    function showModal(pokemon) {
        // Clear all existing modal content
        modalContainer.innerHTML = "";

        let modal = document.createElement("div");
        modal.classList.add("modal");

        // Add the new modal content
        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener("click", hideModal);

        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement("p");
        contentElement.innerText = "Height: " + pokemon.height;

        let pokemonImage = document.createElement("img");
        pokemonImage.src = pokemon.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");
    }

    function hideModal() {
        modalContainer.classList.remove("is-visible");
    }

    window.addEventListener("keydown", e => {
        if (
            e.key === "Escape" &&
            modalContainer.classList.contains("is-visible")
        ) {
            hideModal();
        }
    });

    modalContainer.addEventListener("click", e => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }
    //   will fetch data from the api   //
    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                    console.log(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    // load details of selected pokemon   //
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


