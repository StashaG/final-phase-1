
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
});
