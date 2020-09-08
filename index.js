$(()=> {
  $('form').on("submit", function(e){
    e.preventDefault();
    async function getFood () {
      let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=20&apiKey=${apiKey}`)
      console.log(data);
      let items = await data.json();
      foodID(items);
    }
    function foodID(items) {
      // items.forEach((item, i) => {
      //   fetch(`https://api.spoonacular.com/recipes/${item.id}/summary?apiKey=${apiKey}`)
      //     .then(data => data.json())
      //     .then(recipe => 
      //       getRecipe(recipe, item.image));
          
      // });
      items.forEach((item, i) => {
          fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${apiKey}`)
            .then(data => data.json()).then(recipe => getRecipe(recipe, item.image));
            
        });
    }


    function getRecipe(item, image) {
      console.log(item);
      sourceU = item.sourceUrl;
      console.log(sourceU);

        let instruct = fetch(`https://api.spoonacular.com/recipes/extract?url=${sourceU}&apiKey=${apiKey}`)
            .then(data => data.json());
            console.log('fetch')
            console.log(instruct)
          
    
      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text" id="instruct"></p>
            <p class="card-text" id="recipe">${item.summary}</p>
          </div>
          <button type="button" class="btn btn-warning pickMe">PICK THIS RECIPE</button>
        </div>
      `;
      $('#recipeOp').append(recipe);
    }
    $('#recipeOp').empty();
    getFood();
    console.log('Here')
  });
  
});







              
              
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