
$(()=> {

  // const endpoint = "https://api.spoonacular.com/recipes/autocomplete?number=10&query=${$('.search-bar').val()}&apiKey=${apiKey3}";
  const items = [];
  
  $(".search-bar").on('input', function() {
    // console.log($('.search-bar').val());
    let endpoint = `https://api.spoonacular.com/recipes/autocomplete?number=10&query=${$('.search-bar').val()}&apiKey=218d75a1a0d54dc1afef8d7d84763a57`;
    // console.log(endpoint);
    fetch(endpoint)
    // .then(blob => console.log(blob));
      .then(blob => blob.json())
      .then(data => {
        // console.log(data);
        items.push(...data)
        });  
    // console.log(items);
  
  });
  function findMatches(wordToMatch, items) {
    return items.filter(foodItem => {
    // here we need to figure out if the item is a match for what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return foodItem.title.match(regex)
  });
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function displayMatches() {
  const matchArray = findMatches(this.value, items);
  const html = matchArray.map(place => {
  const regex = new RegExp(this.value, 'gi');
  const newFoodItem = place.title.replace(regex, `<span class="hl">${this.value}</span>`);
return `
  <li>
    <span class="name">${newFoodItem}</span>
  </li>
`;
}).join('');
suggestions.innerHTML = html;
}
$('.hl').click(function(){
  console.log('hello');
  console.log($(this).text())
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$(this).text()}&number=2`)
  .then(blob => blob.json())
  .then(data => {
    console.log(data);
    });  
})
const searchInput = document.querySelector('.search-bar');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);


  // $('form').on("submit", function(e){
  //   e.preventDefault();
  //   async function getFood () {
  //     let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=20&apiKey=${apiKey}`)
  //     // console.log(data);
  //     let items = await data.json();
  //     foodID(items);
  //   }

    //Autocomplete feature


    $('form').on("submit", function(e){
      console.log($('.search-bar').val());
      e.preventDefault();
      async function getFood () {
        let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=20&apiKey=${apiKey}`)
        // console.log(data);
        let items = await data.json();
        foodID(items);
      }

      

    function foodID(items) {
      items.forEach((item, i) => {
          fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${apiKey}`)
            .then(data => data.json()).then(recipe => getRecipe(recipe, item.image));
            
        });
    }
    function getRecipe(item, image) { 
      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <button id="mealPick" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
          <div class="card-body">
            <p class="card-text" id="instruct"></p>
            <p class="card-text" id="recipe">${item.summary}</p>
          </div>
        </div>
      `;
      $('#recipeOp').append(recipe);

      //MAKES RECIPE CHOICE DIV

      $('#mealPick').click(function() {
        console.log('New Card');

        $('#recipeOp').empty();
        console.log(item);
      // sourceU = item.sourceUrl;
      // console.log(sourceU);

      //   let instruct = fetch(`https://api.spoonacular.com/recipes/extract?url=${sourceU}&apiKey=${apiKey}`)
      //       .then(data => data.json());
      //       console.log('fetch')
      //       console.log(instruct)
        const recipeChoice = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text" id="instruct"></p>
            <p class="card-text" id="recipe">${item.sourceUrl}</p>
          </div>
        </div>`;
        console.log(recipeChoice)
        $('#recipeOp').append(recipeChoice);
      });
    }
    $('#recipeOp').empty();
    console.log('empty')
    getFood();
    console.log('Here')
  });





  
  
});

// $('#mealPick').click(function() {
//   console.log('New Card');
//   // $('#recipeOp').empty();
//   // const recipe = `
//   // <div class="card" style="width: 18rem;">
//   //   <h5 class="card-title" id="recipeName">${item.title}</h5>
//   //   <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
//   //   <div class="card-body">
//   //     <p class="card-text" id="instruct"></p>
//   //     <p class="card-text" id="recipe">${item.summary}</p>
//   //   </div>
//   //   <button id="mealPick" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
//   // </div>`;
// });






              
              
        //     $('form').on("submit", function(e){
        //       e.preventDefault(); 
        //       let searchString = $('.search-bar').val();
        //       urlEncodedSearchString = encodeURIComponent(searchString);
        //       console.log(urlEncodedSearchString);
        
                
        //             renderMovies(data.Search);
        //           });
        //         console.log(newMovie);
        //         console.log('Is it broken');
              
        
        //       });
        
        
        //   });
        
        //     function ButtonClicked() {
        //         $('#formsubmitbutton').hide();
        //         $('#formElem').hide();
        //         $('#buttonreplacement').show(); 
        //         $('#buttonreplacement').append(
        //             `<h2>YOUR HERO</h2>
        //             <img src="img/sVen.jpg" alt="loading...">
        //             <p>Weapon Choice: ${$('#weaponChoiceH option:selected').text()}</p>
        //             <h1>VS.</h1>
        //             <h2>YOUR VILLIAN</h2>
        //             <img src="img/dragon-legendary-creature-sea-serpent-art-creatures-png-clip-art.png" alt="loading...">
        //             <p>Weapon Choice: ${$('#weaponChoiceV option:selected').text()}</p>`)
        
        //     };