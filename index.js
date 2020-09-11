$(()=> {
  $('form').on("submit", function(e){
    e.preventDefault();
    loading();
    
    async function getFood () {
      let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=20&apiKey=${apiKey}`)
      // console.log(data);
      let items = await data.json();
      removeLoading();
      foodID(items);
      
    }

    function foodID(items) {
      items.forEach((item, i) => {
          fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${apiKey}`)
            .then(data => data.json()).then(recipe => getRecipe(recipe, item.image));
            
        });
    }
    
    function getRecipe(item, image) { 
      let details = JSON.stringify(item.extendedIngredients);
      let analyze = JSON.stringify(details.name);
      console.log(analyze);
      console.log(details[name]);

      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <button data-recipe=${item.instructions} id="${item.id}" type="button" name="${item.id}" class="btn btn-warning ${item.id}">PICK THIS RECIPE</button>
          <div class="card-body">
            <p class="card-text" id="recipe">${item.summary}</p>
            <p class="card-text" id="recipe">${details}</p>
          </div>
        </div>`
        // console.log(recipe);
      ;
      $('#recipeOp').append(recipe);
    }
    $('#recipeOp').empty();
    getFood();
  });
});

  $("button[name='${item.id}']").on("click", function(){
  //MAKES RECIPE CHOICE DIV
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



function loading (){
  console.log("loading")
  $(".container").append("<div class = 'loading'><img src = 'images/loading.gif'></div>")
} 

function removeLoading () {
  console.log("loading removed")
  $(".loading").remove();
}
