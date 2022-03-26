const get = (id) => document.getElementById(id);

const screen = get("screen");
const url="https://pokeapi.co/api/v2/pokemon/";
const typesDiv = get("types");

const resetScreen = (mensaje) => {
    get("altura").textContent='-';
    get("peso").textContent='-';
    get("vida").textContent='-';
    get("poke_Name").textContent=mensaje;
    get("ataque").textContent='-';
    get("defensa").textContent='-';
    get("vel").textContent='-';
    typesDiv.textContent='-'
};

const cambiarSrcImg = (url) => {
    const imgPokemon = get("pokeImg");
    imgPokemon.src = url;
};

const getPokeData = (data) =>{
    let pokeImg= data.sprites.other.dream_world.front_default;
    let pokeSpecies = data.species;
    let pokeName = data.name;
    let vida = data.stats[0].base_stat;
    let ataque = data.stats[1].base_stat;
    let defensa = data.stats[2].base_stat;
    let vel = data.stats[5].base_stat;
    let altura = data.height;
    let peso = data.weight;

    get("altura").textContent=altura;
    get("peso").textContent=peso;
    get("vida").textContent=vida;
    get("pokeImg").src=pokeImg;
    get("poke_Name").textContent=pokeName;
    get("ataque").textContent=ataque;
    get("defensa").textContent=defensa;
    get("vel").textContent=vel;
};

const showTypes = (types) => {
    typesDiv.innerHTML="";
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    })
}

const fetchPokeByName = (pokemon) => {
    const pokeName = get("pokeName");
    const valName = pokeName.value;
    const finalUrl = url+valName;

    fetch(finalUrl)
    .then((res) => {
        if(res.status == 200){
            return res.json();
        }else{
            resetScreen("No encontrado");
            cambiarSrcImg("imagenes/pikachu-sad.gif");
        }
    }).then((data) => {
        getPokeData(data);
        showTypes(data.types);
    })
};

const fetchPokeAleatorio = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url+id;

    fetch(finalUrl)
    .then((res) => {
        if(res.status == 200){
            return res.json();
        }else{
            resetScreen("No encontrado");
            cambiarSrcImg("imagenes/pikachu-sad.gif");
        }
    }).then((data) => {
        getPokeData(data);
        showTypes(data.types);
    });
};




