// wrapping Pokémon Data in IIFE format //
let pokemonRepository = (function () {
    // Pokémon data to display in app//
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function getAll() {
        return pokemonList;
    }

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

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");

        // creating button to add pokemon //
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

// New .forEach() loop //
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

// Modal code from exercise //
(function () {
    let modalContainer = document.querySelector("#modal-container");

    // REST OF CODE

    function showModal(title, text) {
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
        titleElement.innerText = title;

        let contentElement = document.createElement("p");
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");
    }

    let dialogPromiseReject;

    function hideModal() {
        modalContainer.classList.remove("is-visible");

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    function showDialog(title, text) {
        showModal(title, text);

        let modal = modalContainer.querySelector(".modal");

        let confirmButton = document.createElement("button");
        confirmButton.classList.add("modal-confirm");
        confirmButton.innerText = "Confirm";

        let cancelButton = document.createElement("button");
        cancelButton.classList.add("modal-cancel");
        cancelButton.innerText = "Cancel";

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        confirmButton.focus();

        return new Promise((resolve, reject) => {
            cancelButton.addEventListener("click", hideModal);
            confirmButton.addEventListener("click", () => {
                dialogPromiseReject = null;
                hideModal();
                resolve();
            });
            dialogPromiseReject = reject;
        });
    }

    document.querySelector("#show-modal").addEventListener("click", () => {
        showModal("Modal title", "This is the modal content!");
    });

    document.querySelector("#show-dialog").addEventListener("click", () => {
        showDialog("Confirm action", "Are you sure you want to do this?").then(
            function () {
                alert("confirmed!");
            },
            () => {
                alert("not confirmed");
            }
        );
    });

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

    // THE RETURN STATEMENT HERE
})();
