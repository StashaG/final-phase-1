$(()=> {
  console.log("Ready")

  $('form').on("submit", function(e){
    e.preventDefault(); 

      let recipe = fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=10&apiKey=45f77eeec63346cdb3c6db8bfd6183e3`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            function recipesuggestion(fridgeFood) {
                console.log("I'm here")
                console.log(fridgeFood)
        
                recipeFind = fridgeFood.map(data => {
                    return `<div class="card" style="width: 18rem;">
                    <h5 class="card-title" id="recipeName">${data.title}</h5>
                    <img class="card-img-top"id="image" src="${data.image}" alt="Card image cap">
                    <div class="card-body">
                      <p class="card-text" id="recipe">${data.id}</p>
                    </div>`

                });
                
                $('.recipeOp').html(recipeFind.join(' '))
                // $('.recipeOp').append(recipeFind)
      
        };
        recipesuggestion(data);
      
      });

    
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