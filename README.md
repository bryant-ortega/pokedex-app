# Pokedex-app 

This is a  small  web  application  with  HTML,   CSS,   and  JavaScript  that  loads  data  from  an  external  API  and  enables  the  viewing  of  data  points  in  detail. It uses Bootstrap to create the modal and navigation bar.

- Load  data  from  an  external  source  (API)   
- View  a  list  of  items  
- On  user  action  (e.g.,  by  clicking  on  a  list  item),  view  details  for  that  item 

Data loads from the external Pokémon  API : https://pokeapi.co/api/v2/pokemon/?limit=950

The  app : 

- displays  a  list  of  items  loaded  from  that  API  after  the  page  is  loaded.  
- Enables  the  viewing  of  more  details  for  a  Pokémon  when  clicking  on  a  Pokémon button.  
- Has  CSS  styling.  
- Has  JavaScript  code  formatted  according  to  ESLint  rules and  via  Prettier.  
- Uses  a  modal  for  details  and  touch  interactions.  
- Allows  searching  for  Pokémon.
- Does  not  throw  any  errors  when  being  used.  
- Is  deployed  to   GitHub  Pages.
- Works  in  Chrome,  Firefox,  Safari,  Edge,  and  Internet  Explorer  11. 

How it works :

-   add(pokemon): adds a new Pokemon object to the repository
-   getAll(): returns the array of all Pokemon objects in the repository
-   addListItem(pokemon): adds a button element to the HTML body with the name of a Pokemon and binds an event listener to it
-   loadList(): loads a list of Pokemon from the PokeAPI and adds them to the repository
-   loadDetails(item): loads the details of a specific Pokemon from the PokeAPI and adds them to the Pokemon object in the repository
-   showDetails(pokemon): shows a modal with the details of a specific Pokemon
-   search(): finds the first Pokemon object that matches the search query