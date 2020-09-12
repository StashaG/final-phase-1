
$(()=> {

const suggestions = document.querySelector('.suggestions');

let items = [];//empty array to put food items into

const getItems = () => {
  const endpoint = `https://api.spoonacular.com/recipes/autocomplete?number=10&query=${$('.search-bar').val()}&apiKey=${apiKey}`;

  fetch(endpoint).then(blob => blob.json()).then(data => {
    items = [];
    items.push(...data)
  });
  displayMatches();
};

function displayMatches() {
  suggestions.innerHTML = '';
  const matchedItems = items.map(item => {
    return `
          <li>
            <span class="name">${item.title}</span>
          </li>
    `;
  });
  suggestions.innerHTML = matchedItems.join('');
};

$('.hl').click(function(){
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$(this).text()}&number=2`)
  .then(blob => blob.json())
  .then(data => {
    console.log(data);
    });
})
const searchInput = document.querySelector('.search-bar');

searchInput.addEventListener('keyup', getItems);

document.getElementById('suggestions').addEventListener('click', e => getFoodCard(e.target.innerHTML));

const getFoodCard = title => {
  let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${title}}&number=20&apiKey=${apiKey}`)
  let items = await data.json();
};


    $('form').on("submit", function(e){
      console.log($('.search-bar').val());
      e.preventDefault();
      async function getFood () {
        let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=20&apiKey=${apiKey}`)
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
