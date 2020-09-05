$(()=> {
  $('form').on("submit", function(e){
    e.preventDefault();
    async function getFood () {
      let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=10&apiKey=45f77eeec63346cdb3c6db8bfd6183e3`)
      let items = await data.json();
      foodID(items);
    }
    function foodID(items) {
      items.forEach((item, i) => {
        fetch(`https://api.spoonacular.com/recipes/${item.id}/summary?apiKey=45f77eeec63346cdb3c6db8bfd6183e3`)
          .then(data => data.json()).then(recipe => getRecipe(recipe));
      });
    }
    function getRecipe(item) {
      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${item.image}" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text" id="recipe">${item.summary}</p>
          </div>
        </div>
      `;
      console.log('Check')
      $('#recipeOp').append(recipe);
    }
    getFood();
    console.log('Here')
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

//                 });

//                 $('.recipeOp').html(recipeFind.join(' '));
//         };
//         recipeSuggestion(data);
//       };
//       getFood();
//     });
//   });


              
              
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