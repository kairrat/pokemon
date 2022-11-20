
let button = document.querySelector('.btn_submit');
button.addEventListener("click",() => {
    sendRequest();
});
let myInput = document.querySelector('.search');
myInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
      document.querySelector('.btn_submit').click();

}})
let container = document.querySelector('.pokemon_container')
let bucket = document.querySelector('.bucket');


let items = [];
if(localStorage.getItem('items')){
    items =  JSON.parse(localStorage.getItem('items'));
     
 };
bucket.addEventListener('click', () => {
    container.innerHTML = '';
    displayPokemon();
})

async  function sendRequest(){
    let input = document.querySelector('.search').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    let response = await fetch(url);    

    if (!response.ok) {
        alert('write pokemon name correct!');
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
    
      const result= await response.json();
      getRequest(result);

}
 function getRequest(result) {

    
      

    let container = document.querySelector('.pokemon_container')
    let block = document.createElement('div');
    block.classList.add('pokemon_block');
    let img = document.createElement('img');
    img.classList.add('pokemon_img');
    img.src = result.sprites.other.dream_world.front_default;
    img.style.backgroundPosition = "top";
    


    let bottomBlock = document.createElement('div')
    bottomBlock.classList.add('bottom_block');

    let bottomBucket = document.createElement('div');
    bottomBucket.classList.add('bottom_bucket');

    let bottomBucketImg = document.createElement('img');
    bottomBucketImg.classList.add('.bucket_img')
    bottomBucketImg.src = "css/img/fav_white.png";
    
    let pokemonName = document.createElement('h')
    pokemonName.classList.add('pokemon_name');
    pokemonName.textContent = `${result.species.name}`;

 


    

    container.appendChild(block);
    block.appendChild(img);
    block.appendChild(bottomBlock);
  
    bottomBlock.appendChild(pokemonName);
    bottomBlock.appendChild(bottomBucket);
    bottomBucket.appendChild(bottomBucketImg);



  
 

    bottomBucketImg.addEventListener('click', () => {
        
        let item  = {
            name : result.name,
            img : result.sprites.other.dream_world.front_default,
            id : result.id
        }
        items.push(item);
        localStorage.setItem('items',JSON.stringify(items));
        bottomBucketImg.src = "css/img/fav_black.png";


    })


 }
 const displayPokemon = () => {
    if(items.length == 0) {
        container.innerHTML = '';
    }

    let pokemonHTMLString = items
    .map((poke) => {
      return `
      <div class="pokemon_block">
      <img class="pokemon_img" src="${poke.img}" />
      <div class="bottom_block">
      <h1 class="pokemon_name">${poke.name}</h1>
      <div class="bottom_bucket">
          <img src="css/img/fav_black.png" alt="" class="bucket">
      </div>

  </div> 

  </div>
    `;
    })
    .join(" ");
    container.innerHTML = pokemonHTMLString;

    };

