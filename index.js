$(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();

    async function getFood() {
      let data = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$(
          ".search-bar"
        ).val()}&number=10&apiKey=${apiKey}`
      );

      let items = await data.json();
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
      // console.log(item);
      // sourceU = item.sourceUrl;
      // console.log(sourceU);

      //   let instruct = fetch(`https://api.spoonacular.com/recipes/extract?url=${sourceU}&apiKey=${apiKey}`)
      //       .then(data => data.json());
      //       console.log('fetch')
      //       console.log(instruct)

      const recipe = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.title}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text" id="instruct"></p>
            <p class="card-text" id="recipe">${item.summary}</p>
          </div>
          <button id="mealPick" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
        </div>
      `;

      console.log("Check");
      $("#recipeOp").append(recipe);

      $("#recipeOp").append(recipe);
      //
      $("#mealPick").click(function () {
        console.log("New Card");
        $("#recipeOp").empty();
        const recipeChoice = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-title" id="recipeName">${item.id}</h5>
          <img class="card-img-top"id="image" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text" id="instruct"></p>
            <p class="card-text" id="recipe">${item.sourceUrl}</p>
          </div>
          <button id="mealPick" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
        </div>`;
        console.log(recipeChoice);
        $("#recipeOp").append(recipeChoice);
      });
    }
    $("#recipeOp").empty();
    console.log("empty");
    getFood();
    console.log("Here");
  });
<<<<<<< HEAD
});

