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
        let pokemonList = $(".pokemon-list");
        // create list elements for each pokemon //
        let listItem = $('<li class="group-list-item"></li>');
        // create button element for each pokemon with bootstrap class added  //
        let button =
            $(`<button type="button" class="pokemon-button btn btn-primary" 
            data-toggle="modal" data-target="#pokeModal">${pokemon.name}</button>`);

        listItem.append(button);
        pokemonList.append(listItem);

        button.on("click", function () {
            showDetails(pokemon);
        });
    }
    // declares what the button event listener does //
    // function addEventListener(button, pokemon) {
    //     button.addEventListener("click", function (event) {
    //         // when button is clicked, showDetails function runs //
    //         showDetails(pokemon);
    //     });
    // }

    //show modal content //
    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

        // // Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();
        // creating element for name in modal content
        let nameElement = $("<h1>" + item.name + "</h1>");
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr("src", item.imageUrlFront);
        let heightElement = $("<p>" + "Height : " + item.height + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(heightElement);
    }

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
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    // load details of selected pokemon   //
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
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
