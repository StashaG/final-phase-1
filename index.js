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
      let details = item.extendedIngredients;
      let getIng = details.map(ingNew => {
        return ingNew.name;
      });
        console.log(getIng);

      let getAmount = details.map(ingAmt => {
          return ingAmt.original;
        });
          console.log(getAmount);
    

      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <button data-recipe=${item.instructions} id="${item.id}" type="button" name="${item.id}" class="btn btn-warning ${item.id}">PICK THIS RECIPE</button>
          <div class="card-body">
            <p class="card-text" id="recipe">${item.summary}</p>
            <p class="card-text" id="recipe">${details}</p>
          </div>
        </div>`;
      $('#recipeOp').append(recipe);

    $(`#${item.id}`).on("click", function() {
      console.log('New Card');
      $('#recipeOp').empty();
          
      $(function () {
        $("#tabs").tabs();
      });

        const recipeChoice =`
            <div id= "tabs">
                <ul>
                 <li><a href="#tabs-1">Meal</a></li>
                 <li><a href="#tabs-2">Ingredients</a></li>
                 <li><a href="#tabs-3">Directions</a></li>
               </ul>
               <div id="tabs-1">
                 <h3>${item.title}</h3>
                 <img src="${image}" alt="Meal Image">
                 
               </div>
               <div id ="tabs-2">   
                <h5>Ingredients:</h5>
                <ul>
                ${getAmount
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}

                </ul>
               </div>
               <div id="tabs-3">
                <h4>${item.title}</h4>
                <p>${item.instructions}</p>
                </div>`;
    
    
              console.log(recipeChoice)
    
              $('#recipeOp').append(recipeChoice);
      });
    }
    $('#recipeOp').empty();
    getFood();
  });
});


  //     $(function () {
  //       $("#tabs").tabs();
  //     });
    

  // });



function loading (){
  console.log("loading")
  $(".container").append("<div class = 'loading'><img src = 'images/loading.gif'></div>")
} 

function removeLoading () {
  console.log("loading removed")
  $(".loading").remove();
}
