var selectedIngredients;
var myRecipes;
var myIngredients;
var myTestData;
var theRecipeScores;
var text;
var myString = "abcdefghijklmnopqrstuvwxyz";

function getSelectedIngredients(){ return selectedIngredients; }

function disableTestButton(){
    document.getElementById("myTestButton").disabled = true;
}

function clearRecipe(){
    document.getElementById("displayRecipeIngredientsArea").innerHTML = "";
}

function setup(){
//    alert("hallo from 'setup()' within 'BagsOfTaste.js'");
    selectedIngredients = [];
    myRecipes = [];
    myIngredients = [];
    myTestData = [];
    setMyTestData();
    setMyRecipes();
}

function recipeSelect(){
    var options = [];
    var temp1, temp2;
     
    document.getElementById("recipeSelect").innerHTML = "";
    temp1 = document.createElement("OPTION");
    options.push(temp1);
    temp2 = document.createTextNode("Choose from options below");
    options[0].appendChild(temp2);
    document.getElementById("recipeSelect").appendChild(options[0]);
    for (var i=0; i < myRecipes.length; i++){
        temp1 = document.createElement("OPTION");
        options.push(temp1);
        temp2 = document.createTextNode(myRecipes[i].recipeName);
        options[i+1].appendChild(temp2);
        document.getElementById("recipeSelect").appendChild(options[i+1]);
    }
    for (var i=0; i < myRecipes.length; i++){
        options[i+1].addEventListener("click", bindClick(i+1));
    }
    function bindClick(j){
        return function(){
            displayRecipeIngredients(myRecipes[j-1].recipeName);
        };
    }
} // end of: function recipeSelect()

function displayRecipeIngredients(recipeChosen){
    var out = "";
    for (var i=0; i < myRecipes.length; i++){
        if (myRecipes[i].recipeName === recipeChosen){
                out += "You chose this recipe: " + recipeChosen + "<br>";
                document.getElementById("displayRecipeIngredientsArea").innerHTML = out;
            out += "The ingredients are:<br>";
            for (var ingredientIterator = 0; ingredientIterator < myRecipes[i].ingredients.length; ingredientIterator++){
                out += ingredientIterator+1 + ") " + myRecipes[i].ingredients[ingredientIterator].ingredient + "<br>";
            }
        }
    }
    document.getElementById("displayRecipeIngredientsArea").innerHTML = out;
}

function display_recipesContainingGivenIngredients(ingredients){
    var resultAlert = "relevant recipes are: \n";
    var resultField = "";
    var recipes = recipesContainingGivenIngredients(ingredients);
    for (var j=0; j < recipes.length; j++){
        resultAlert += (j+1) + ") " + recipes[j] + "\n";
        resultField += (j+1) + " ) " + recipes[j] + "<br>";
    }
    document.getElementById("displayRecipesContainingGivenIngredientsArea").innerHTML = resultField;
}


function recipesContainingGivenIngredients(givenIngredients){
    var recipesContainingGivenIngredients = [];
    
    if (givenIngredients.length === 0) return recipesContainingGivenIngredients;
    for (var i=0; i < myRecipes.length; i++){
        var recipeIngredients = extractIngredients(myRecipes[i]);
        if (recipeContains_selectedItems(recipeIngredients, givenIngredients)){
            recipesContainingGivenIngredients.push(myRecipes[i].recipeName);
        }
    }
    return recipesContainingGivenIngredients;

    function extractIngredients(recipe){
        var ingredients = [];
        for (var i=0; i < recipe.ingredients.length; i++){
            ingredients.push(recipe.ingredients[i].ingredient);
        }
        return ingredients;
    }
}

function recipeContains_selectedItems(array, elements){
    var elementResults = [];
    for (var counter = 0; counter < elements.length; counter++){
        elementResults.push( arrayContainsItem(array, elements[counter]) );
    }
    if (arrayContainsFalse(elementResults)) return false;
    else return true;
    
    function arrayContainsFalse(array){
        var result = false;
        for (var i=0; i < array.length; i++){
            if (array[i] === false) result = true;
        }
        return result;
    }
}

function arrayContainsItem(array, element){
    var result = false;
    for (var i=0; i < array.length; i++){
        if (array[i].toLowerCase().includes(element.toLowerCase())){
            result = true;
        }
        if (array[i] ===  "veg oil" && element === "vegetable oil")
            result = true;
    }
    return result;
}

function setMyRecipes(){
    var xmlhttp = new XMLHttpRequest();
    var myURL = "recipes.json";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            myRecipes = JSON.parse(xmlhttp.responseText);
            otherFunction(myRecipes);
        }
    };
    xmlhttp.open("GET", myURL, true);
    xmlhttp.send();
    function otherFunction(arr){
    }
}

function setMyTestData(){
    var xmlhttp = new XMLHttpRequest();
    var myURL = "testdata.json";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            myTestData = JSON.parse(xmlhttp.responseText);
            setMyTestData_otherFunction(myTestData);
        }
    };
    xmlhttp.open("GET", myURL, true);
    xmlhttp.send();
    function setMyTestData_otherFunction(arr){
    }
}
