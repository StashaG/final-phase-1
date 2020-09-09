$(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();

    async function getFood() {
      let data = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$(
          ".search-bar"
        ).val()}&number=10&apiKey=${apiKey}`
      );

      let items = await data.json();
      foodID(items);
    }

    function foodID(items) {
      items.forEach((item, i) => {
        fetch(
          `https://api.spoonacular.com/recipes/${item.id}/summary?apiKey=${apiKey}`
        )
          .then((data) => data.json())
          .then((recipe) => getRecipe(recipe, item.image));
      });
    }
    function getRecipe(item, image) {
      // console.log(item);
      // sourceU = item.sourceUrl;
      // console.log(sourceU);

      //   let instruct = fetch(`https://api.spoonacular.com/recipes/extract?url=${sourceU}&apiKey=${apiKey}`)
      //       .then(data => data.json());
      //       console.log('fetch')
      //       console.log(instruct)

      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text" id="instruct"></p>
            <p class="card-text" id="recipe">${item.summary}</p>
          </div>
          <button id="mealPick" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
        </div>
      `;

      console.log("Check");
      $("#recipeOp").append(recipe);

      $("#recipeOp").append(recipe);
      //
      $("#mealPick").click(function () {
        console.log("New Card");
        $("#recipeOp").empty();
        const recipeChoice = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.id}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text" id="instruct"></p>
            <p class="card-text" id="recipe">${item.sourceUrl}</p>
          </div>
          <button id="mealPick" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
        </div>`;
        console.log(recipeChoice);
        $("#recipeOp").append(recipeChoice);
      });
    }
    $("#recipeOp").empty();
    console.log("empty");
    getFood();
    console.log("Here");
  });
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
