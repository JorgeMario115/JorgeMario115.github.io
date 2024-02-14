// const offset = 0
// const limit = 10
// const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((typeSlot) => ` 
        <li class="type">${typeSlot.type.name}</li>
    `)
}

function convertPokemonToLi(pokemon){
    return`
        <li class="pokemon">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join('')}

                    <!-- <li class="type">grass</li>  -->
                    
                    <!--<li class="type">poison</li>  -->
                    
                </ol>

                <!-- <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">                -->  
                
                
               <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
            
        </li>
    
    `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons =[]) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')

    // for (let i = 0; i < pokemons.length; i++) {
    //   const pokemon = pokemons[i];
    //   listItems.push(convertPokemonToLi(pokemon))
    //    pokemonList.innerHTML += convertPokemonToLi(pokemon)
    //    console.log(convertPokemonToLi(pokemon))
      
    // }
    // console.log(listItems)

})







