const pokemonName = document.getElementById('pokemon-name')
const pokemonImg = document.getElementById('pokemon-img')
const pokemonId = document.getElementById('pokemon-id')
const pokemonStats = document.getElementById('pokemon-stats')
const pokemonTypes = document.getElementById('pokemon-type')




async function getPokemon(e) {
    e.preventDefault()
    try {
        const { value } = e.target.pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
            response.json()
            .then(data => {
                showPokemon(data)
            })
            
    } catch (error) {
        return { error: error.message || 'Unknown error' }
    }


}


function showPokemon(data){
    const pokemon = data
    const {stats, types} = data
    pokemonImg.src = pokemon.sprites.front_default
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    pokemonId.textContent =`Nº${pokemon.id}`
    showPokemonStats(stats)
    showPokemonTypes(types)
}


function showPokemonStats(stats){
    pokemonStats.textContent = ''
    stats.forEach(stat =>{
        const statInfo = document.createElement('div')
        const statName = document.createElement('h2')
        const spanValue = document.createElement('span')
        statName.textContent = `${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:`
        spanValue.textContent =  stat.base_stat
        statInfo.append(statName, spanValue)
        pokemonStats.append(statInfo)
    })
}


function showPokemonTypes(types){
    pokemonTypes.textContent = ''
    types.forEach(type => {
        const typesInfo = document.createElement('div')
        const typeName = document.createElement('p')
        typeName.textContent =  `${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}`
        pokemonTypes.append(typeName)
    })
}