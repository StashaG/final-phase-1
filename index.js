$(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
    async function getFood() {
      let data = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$(
          ".search-bar"
        ).val()}&number=10&apiKey=${apiKey}`
      );
=======
    async function getFood () {
      let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=20&apiKey=${apiKey}`)
      // console.log(data);
>>>>>>> e4d54882dea146f64ace7daadadecd5779c195b2
=======
    loading();
    async function getFood () {
      let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=20&apiKey=${apiKey}`)
      console.log(data);
>>>>>>> 8fb8be621f86dfe924ef9fe451604d1daf167492
      let items = await data.json();
      removeLoading();
      foodID(items);
      
    }

    function foodID(items) {
      items.forEach((item, i) => {
<<<<<<< HEAD
        fetch(
          `https://api.spoonacular.com/recipes/${item.id}/summary?apiKey=${apiKey}`
        )
          .then((data) => data.json())
          .then((recipe) => getRecipe(recipe, item.image));
      });
=======
          fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${apiKey}`)
            .then(data => data.json()).then(recipe => getRecipe(recipe, item.image));
            
        });
>>>>>>> e4d54882dea146f64ace7daadadecd5779c195b2
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
<<<<<<< HEAD
      console.log("Check");
      $("#recipeOp").append(recipe);
=======
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
>>>>>>> e4d54882dea146f64ace7daadadecd5779c195b2
    }
    $('#recipeOp').empty();
    
    getFood();
<<<<<<< HEAD
    console.log("Here");
=======
    
>>>>>>> 8fb8be621f86dfe924ef9fe451604d1daf167492
  });
<<<<<<< HEAD
});

// $(()=> {
//   console.log("Ready")

//   $('form').on("submit", function(e){
//     e.preventDefault();
//     console.log('start')

//     async function getFood () {
//       let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=10&apiKey=45f77eeec63346cdb3c6db8bfd6183e3`)
//       let dataOne = await data.json()
//       let recipe = await fetch(`https://api.spoonacular.com/recipes/${dataOne.id}/summary?apiKey=45f77eeec63346cdb3c6db8bfd6183e3`)

//             console.log(data);
//             function recipeSuggestion(fridgeFood) {
//                 console.log("I'm here")
//                 console.log(fridgeFood)

//                 recipeFind = fridgeFood.map(data => {
//                     return `<div class="card" style="width: 18rem;">
//                     <h5 class="card-title" id="recipeName">${data.title}</h5>
//                     <img class="card-img-top"id="image" src="${data.image}" alt="Card image cap">
//                     <div class="card-body">
//                       <p class="card-text" id="recipe">${recipe.summary}</p>
//                     </div>
//                     </div>`
=======





  
  
});




function loading (){
  console.log("loading")
  $(".container").append("<div class = 'loading'><img src = 'images/loading.gif'></div>")
} 

function removeLoading () {
  console.log("loading removed")
  $(".loading").remove();
}

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


>>>>>>> e4d54882dea146f64ace7daadadecd5779c195b2



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
