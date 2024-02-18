// const offset = 0
// const limit = 10
// const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

//function convertPokemonTypesToLi(pokemonTypes){
 //   return pokemonTypes.map((typeSlot) => ` 
  //      <li class="type">${typeSlot.type.name}</li>
  //  `)
//}
const pokemonList = document.getElementById(`pokemonList`)
const loadMoreButton = document.getElementById(`loadMoreButton`)
const limit = 12
let offset = 0
const maxRecords = 150


function loadPokemonItens(offset,limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
    
                       ${pokemon.types.map((type) => `<li class = "type ${type}">${type}</li>`).join('') }
                        
                    </ol>
    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    
                    
                </div>
                
            </li>
        
        ` ).join('')
        
        pokemonList.innerHTML += newHtml
    })
}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords.offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    }else{
    
        loadPokemonItens(offset, limit)
    }
})



//pokeApi.getPokemons().then((pokemons =[]) => {
  // const newHtml = pokemons.map(convertPokemonToLi).join('')
   // pokemonList.innerHTML = newHtml

    // for (let i = 0; i < pokemons.length; i++) {
    //   const pokemon = pokemons[i];
    //   listItems.push(convertPokemonToLi(pokemon))
    //    pokemonList.innerHTML += convertPokemonToLi(pokemon)
    //    console.log(convertPokemonToLi(pokemon))
      
    // }
    // console.log(listItems)

//})







