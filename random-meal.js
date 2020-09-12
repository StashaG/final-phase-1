const get_meal_btn = document.getElementById("get_meal");
const meal_container = document.getElementById("meal");

get_meal_btn.addEventListener("click", () => {
  loading();
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
      removeLoading();
    })
    .catch((e) => {
      console.warn(e);
    });
  
});

const createMeal = (meal) => {
  const ingredients = [];

  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }

  $(function () {
    $("#tabs").tabs();
  });

  const newInnerHTML = `
        <div id= "tabs">
            <ul>
             <li><a href="#tabs-1">Meal</a></li>
             <li><a href="#tabs-2">Ingredients</a></li>
             <li><a href="#tabs-3">Directions</a></li>
           </ul>
           <div id="tabs-1">
             <h3>${meal.strMeal}</h3>
             <img src="${meal.strMealThumb}" alt="Meal Image">
             
           </div>
           <div id ="tabs-2">
            <h5>Ingredients:</h5>
            <ul>
               ${ingredients
                 .map((ingredient) => `<li>${ingredient}</li>`)
                 .join("")}
            </ul>
           </div>
           <div id="tabs-3">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strInstructions}</p>
            </div>`;

  meal_container.innerHTML = newInnerHTML;
};

