$(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();
    loading();
    async function getFood() {
      let data = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$(
          ".search-bar"
        ).val()}&number=10&apiKey=${apiKey}`
      );

      let items = await data.json();
      removeLoading();
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
      let details = JSON.stringify(item.extendedIngredients);
      let analyze = JSON.stringify(item.analyzedInstructions);
      
      //Pull name

      // var getIng = details.map(function (ingNew) {
      //   return ingNew.name;  
      // });
      
      // ES6
      // let getIng = details.map(ingNew => {
      //   return ingNew.name;
      // });
      
      // console.log(getIng);

      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <button id="mealPick" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
          <div class="card-body">
            <p class="card-text" id="recipe">${item.summary}</p>
            <p class="card-text" id="recipe">${details}</p>
            <p class="card-text" id="recipe">${analyze}</p>
          </div>
        </div>
      `;

      console.log("Check");
      $("#recipeOp").append(recipe);



      //MAKES RECIPE CHOICE DIV

      $('#mealPick').one("click", function() {
        console.log('New Card');

        $('#recipeOp').empty();
          
        const recipeChoice = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <div class="card-body">
          <p class="card-text" id="recipe">${details}</p>
            <p class="card-text" id="instruct">${item.instructions}</p>
          </div>
        </div>`;
        console.log(recipeChoice)
        $('#recipeOp').append(recipeChoice);
      });
    }
    $('#recipeOp').empty();
    
    getFood();

    

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






  
  

function loading (){
  console.log("loading")
  $(".container").append("<div class = 'loading'><img src = 'images/loading.gif'></div>")
} 

function removeLoading () {
  console.log("loading removed")
  $(".loading").remove();
}


