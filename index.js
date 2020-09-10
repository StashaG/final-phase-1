$(()=> {
  $('form').on("submit", function(e){
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
      let details = JSON.stringify(item.extendedIngredients);
      let analyze = JSON.stringify(item.analyzedInstructions);
      
      //Pull name

      // var getIng = details.map(function (ingNew) {
      //   return ingNew.name;  
      // });
      
      // ES6
      let getIng = details.map(ingNew => {
        return ingNew.name;
      });
      
      console.log(getIng);

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
        </div>`
        console.log(recipe);
      ;
      $('#recipeOp').append(recipe);

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
    console.log('empty')
    getFood();
    console.log('Here')
    
  });
  
});






      
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