
$(()=> {

const suggestions = document.querySelector('.suggestions');

let items = [];//empty array to put food items into

const getItems = () => {
  const endpoint = `https://api.spoonacular.com/recipes/autocomplete?number=10&query=${$('.search-bar').val()}&apiKey=${apiKey}`;
  loading();
  fetch(endpoint).then(blob => blob.json()).then(data => {
    items = [];
    items.push(...data)
  });
  removeLoading();
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

document.getElementById('suggestions').addEventListener('click', e => getFoodsWithTitle(e.target.innerHTML));

async function getFoodsWithTitle(title) {
  const data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${title}}&number=20&apiKey=${apiKey}`)
  const items = await data.json();
  getRecipesWithFood(items);
};

function getRecipesWithFood(items) {
  items.forEach((item, i) => {
      fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${apiKey}`)
        .then(data => data.json())
        .then(recipe => getRecipe(recipe, item.image));
    });
}

function getRecipe(item, image) {
  $('.name').empty();
  let details = item.extendedIngredients;
  let getIng = details.map(ingNew => {
    return ingNew.name;
  });


  let getAmount = details.map(ingAmt => {
      return ingAmt.original;
    });



  const recipe = `
    <div class="card" style="width: 18rem;">
      <h5 class="card-title" id="recipeName">${item.title}</h5>
      <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
      <button id="${item.id}" type="button"  class="btn btn-warning">PICK THIS RECIPE</button>
      <div class="card-body">
        <p class="card-text" id="recipe">${item.summary}</p>
      </div>
    </div>`;
  $('#recipeOp').append(recipe);

$(`#${item.id}`).on("click", function() {

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




          $('#recipeOp').append(recipeChoice);
  });
}

});


function loading (){
  $('#recipeOp').empty();
  $(".container").append("<div class = 'loading'><img src = 'images/loading.gif'></div>")
}

function removeLoading () {

  $(".loading").remove();
}