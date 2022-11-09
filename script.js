
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

let items = [];
let jsContainer = document.querySelector('.pokemon_container');

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


    let item = {
        container : container,
        block : block,
        img : img,
        pokemonName: pokemonName,
        bottomBlock : bottomBlock,
        bottomBucket : bottomBucket,
        bottomBucketImg : bottomBucketImg
    }
    items.push(item);
    console.log(items);

    bottomBucketImg.addEventListener('click', () => {
        
     
            bottomBucketImg.src =  "css/img/fav_black.png"

    })
 }



