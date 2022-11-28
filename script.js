
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
let header  = document.querySelector('.logo');


let items = [];
if(localStorage.getItem('items')){
    items =  JSON.parse(localStorage.getItem('items'));
     
 };
bucket.addEventListener('click', () => {
    container.innerHTML = '';
    container.style.background  = "#ea0008";
    document.querySelector('.logo_name').textContent = 'Pokemon API';
    document.querySelector('.logo_name').style.color = '#ea0008';
    document.querySelector('.btn_submit').style.background = "#ea0008";
    bucket.style.color = '#ea0008';
    document.querySelector('.search_container').style.display = 'none';

    displayPokemon();
})

document.querySelector('.logo_name').addEventListener('click', () => {

    container.innerHTML = '';
    container.style.background  = "#66fcf1";

    
    
    document.querySelector('.logo_name').textContent = 'Pokemon API';
    document.querySelector('.logo_name').style.color = '#66fcf1';
    document.querySelector('.btn_submit').style.background = "#66fcf1";
    bucket.style.color = '#66fcf1';

    document.querySelector('.search_container').style.display = 'flex';




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

    let promises = [];
    promises.push(result);

    let pokes = promises
    .map((poke) => {
      return `
      <div class="pokemon_block">
      <img class="pokemon_img" src="${poke.sprites.front_default}" />
      <div class="bottom_block">
      <h1 class="pokemon_name">${poke.name}</h1>
      <div class="bottom_bucket">
          <img src="css/img/fav_white.png" alt="" class="bottom_bucket_img">
      </div>
  
  </div> 
  <div class="poke_id">
  <h2 class='poke_id_item' id="${poke.id}"> ID: ${poke.id}</h2>
</div>

  </div>
    `

    ;
    })
    .join(" ");


    
    container.innerHTML = pokes;
    document.addEventListener('click',function(e){
      e.preventDefault();
      if(e.target.classList == 'bottom_bucket_img'){
         
          let item  = {
            name : result.name,
            img : result.sprites.front_default,
            id : result.id
        }

        items.push(item);
        

        let unique = Array.from(new Set(items.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
        e.target.src = "css/img/fav_black.png";
        localStorage.setItem('items',JSON.stringify(unique));

       }

   });

 }
 const displayPokemon = () => {
  let unique = Array.from(new Set(items.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));

    if(items.length == 0) {
        container.innerHTML = '';
    }

    let pokemonHTMLString = unique
    .map((poke) => {
      return `

      <div class="pokemon_block">
      <img class="pokemon_img" src="${poke.img}" />
    
      <div class="bottom_block">
      <h1 class="pokemon_name">${poke.name}</h1>
      <div class="bottom_bucket">
          <img src="css/img/fav_black.png" alt="" class="bottom_bucket_black_img">
      </div>
  
  </div> 
  <div class="poke_id">
  <h2 class='poke_id_item' id="${poke.id}"> ID: ${poke.id}</h2>
</div>

  </div>
    `;
    })
    .join(" ");

    container.innerHTML = pokemonHTMLString;
    };





    document.addEventListener('click',function(e){
      e.preventDefault();
      let unique = Array.from(new Set(items.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
      if(e.target.classList == 'bottom_bucket_black_img'){
        for(let i = 0;i < unique.length;i++){
          let id = unique[i].id;
          let lol = JSON.parse(localStorage.getItem("items"));
          let movieItem = lol.find((el) => {
              return el.id === Number(id);
            });
              let movie = lol.filter((el) => {
                          return el.id != Number(id) });
                          localStorage.setItem('items',JSON.stringify(movie))
  
                          e.target.parentNode.parentNode.parentNode.remove();
                          
                          
        }

        if(unique.length == 0) {
          container.innerHTML = '';
      } 
       }

   });