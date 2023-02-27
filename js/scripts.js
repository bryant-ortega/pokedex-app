// wrapping Pokémon Data in IIFE format //
let pokemonRepository = (function () {
    // Pokémon data to display in app//
    let pokemonList = [];
    //where all the pokemon information comes from //
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=950";

 let searchButton = $(".btn-warning");
 searchButton.on("click", function () {
     let pokemonList = $(".pokemon-list");
     pokemonList.empty();
     search($(".form-control").val()).forEach(function (pokemon) {
         addListItem(pokemon);
     });
 });

let searchBar = $(".form-control");
searchBar.on("keypress keyup", event => {
    let pokemonList = $(".pokemon-list");
    pokemonList.empty();
    if (event.keyCode === 8 || event.keyCode === 46) {
        // backspace or delete key was pressed
        search($(".form-control").val()).forEach(pokemon =>
            addListItem(pokemon)
        );
    } else {
        // any other key was pressed
        search($(".form-control").val()).forEach(pokemon =>
            addListItem(pokemon)
        );
    }
});

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


    //show modal content //
    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");
        let types = "";
        item.types.forEach(type => {
            type += type.type.name + " ";
        });

        // // Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();
        // creating element for name in modal content
        let nameElement = $("<h1>" + item.name + "</h1>");
        let imageElement = $('<img class="modal-img" style="width:20%">');
        imageElement.attr("src", item.imageUrl);
        let heightElement = $("<p>" + "Height : " + (item.height / 10) + "m" + "</p>");
        let typeElement = $(
            "<p>" +
                "Type: " +
                item.types.map(type => type.type.name).join(", ") +
                "</p>"
        );

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typeElement);
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
                item.imageUrl = details.sprites.other.dream_world.front_default;
                item.height = details.height;
                item.types = details.types;
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
