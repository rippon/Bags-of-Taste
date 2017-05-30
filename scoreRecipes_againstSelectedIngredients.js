var selectedIngredients = [];
var ingredientsList = [];
var ingredientButtons;
var recipeButtons;
var theRecipes = [];
var myIngredients;

function scoreSelectedIngredients(givenIngredients){
    testTheRecipes(givenIngredients);
    
    function testTheRecipes(input){
        var containsInput = false;
        var scores = [];
        recipeButtons = [];
        
        for (var recipeCounter = 0; recipeCounter < theRecipes.length; recipeCounter++){
            scores.push(0);
        }
        for (var ingredient = 0; ingredient < input.length; ingredient++){
            for (var i=0; i < theRecipes.length; i++){
                for (var j=0; j < theRecipes[i].ingredients.length; j++){
                    if (theRecipes[i].ingredients[j].ingredient.includes(input[ingredient])){
                        containsInput = true;
                    }
                }
                if (containsInput) scores[i]++;
                containsInput = false;
            }
        }
        document.getElementById("recipeMatching").innerHTML = 
                "after selecting (clicking) a recipe, scroll down for the recipe info" + "<br>";
        var recipeScoresTable = document.createElement("TABLE");
        var rows = [];
        var recipeScore = [2];    
        document.getElementById("recipeMatching").appendChild(recipeScoresTable);
        var recipeScores_perRow = 2;
        var number_ofRows = Math.ceil(theRecipes.length / recipeScores_perRow) + 1;
        var recipeScoreRow = [recipeScores_perRow];
        var recipeCounter = 0;
        var cellPosition_withinRow;
        
        rows.push(recipeScoresTable.insertRow());
        cellPosition_withinRow = 0;
        for (var i=0; i < recipeScores_perRow; i++){
            recipeScore[0] = rows[0].insertCell(cellPosition_withinRow);
            cellPosition_withinRow++;
            recipeScore[1] = rows[0].insertCell(cellPosition_withinRow);
            cellPosition_withinRow++;
            recipeScore[0].innerHTML = "<b>recipe name</b>";
            recipeScore[1].innerHTML = "<b>&nbsp score</b>";
        }
        var recipeButton;
        var recipeButtonLabel;
        var recipeScore = [2]; // comprises, for a recipe, a button with the recipe name, plus its score
        for (var rowNumber = 1; rowNumber < number_ofRows; rowNumber++){
            rows.push(recipeScoresTable.insertRow());
            cellPosition_withinRow = 0;
            for (var i=0; i < recipeScores_perRow; i++){
                recipeButton = document.createElement("BUTTON");
                recipeButton.setAttribute("class", "btn btn-success btn-lg");
                recipeButtonLabel = document.createTextNode(theRecipes[recipeCounter].recipeName);
                recipeButton.appendChild(recipeButtonLabel);
                recipeButton.addEventListener("click", bindClick(theRecipes[recipeCounter].recipeName));
                recipeScore.push(recipeButton);
                recipeScore.push(scores[recipeCounter]);
                recipeScoreRow.push(recipeScore);
                recipeScore[0] = rows[rowNumber].insertCell(cellPosition_withinRow);
                cellPosition_withinRow++;
                recipeScore[1] = rows[rowNumber].insertCell(cellPosition_withinRow);
                cellPosition_withinRow++;
                recipeScore[0].appendChild(recipeButton);
                var scoreInfoString_firstBit = "&nbsp&nbsp&nbsp" +  scores[recipeCounter] + " = ";
                var scoreInfoString_secondBit = 
                        Math.round(scores[recipeCounter] / theRecipes[recipeCounter].ingredients.length * 100) + "%";
                var scoreInfoString = scoreInfoString_firstBit + scoreInfoString_secondBit.fontcolor("green");
                recipeScore[1].innerHTML = scoreInfoString;
                recipeCounter++;
            }
        }
        function bindClick(recipeName){
            return function(){
                document.getElementById("aNavigationPoint").scrollIntoView();
                var recipeIndex = 0;
                for (var i=0; i < theRecipes.length; i++){
                    if (recipeName === theRecipes[i].recipeName){
                        recipeIndex = i;
                    }
                }
                displayRecipeIngredients(theRecipes[recipeIndex].recipeName, recipeIndex);
                var myPDFsource = "../BagsOfTaste/" + theRecipes[recipeIndex].recipeName + ".pdf";
                var pdfViewerObject = document.getElementById("myPdfObject");
                var pdfViewerEmbed = document.getElementById("myPdfEmbed");
                pdfViewerObject.setAttribute("width", "1400");
                pdfViewerObject.setAttribute("height", "3000");
                pdfViewerObject.setAttribute("data", myPDFsource);
                pdfViewerEmbed.setAttribute("src", myPDFsource);                
            };
        }
        function displayRecipeIngredients(recipeChosen, recipeIndex){
            var out = "recipe chosen: " + "<b>" + recipeChosen + "</b> (scroll down for full info)<br><br>";
            for (var k = 0; k < theRecipes[recipeIndex].ingredients.length; k++){
                out += "" + theRecipes[recipeIndex].ingredients[k].ingredient + "<br>";
            }
            document.getElementById("displayRecipeIngredientsArea").innerHTML = out;
        }
    } // end of: testTheRecipes(input)
}

function getSelectedIngredients(){ return selectedIngredients; }

function addToSelectedIngredients(ing){
    selectedIngredients.push(ing);
    var out = "ingredients: \n";
    for (var i=0; i < selectedIngredients.length; i++){
        out += selectedIngredients[i] + "\n";
    }
}

function resetIngredientsSelection(){
    selectedIngredients = [];
    for (var i=0; i < ingredientButtons.length; i++){
        ingredientButtons[i].disabled = false;
    }
    document.getElementById("recipeMatching").innerHTML = "";
}

function showIngredientButtons(){
    document.getElementById("showIngredientButtons").disabled = true;
    setIngredientsList();
    add_theIngredientButtons();
    
    function setIngredientsList(){
        for (var i=0; i < myIngredients.length; i++){
            ingredientsList.push(myIngredients[i].ingredient);
        }
       ingredientsList.sort();
    }
    function add_theIngredientButtons(){
        var buttonsPerRow = 4;
        var number_ofRows;
        ingredientButtons = [];
        var ingredientButtonsText = [];
        var myTable = document.createElement("TABLE");
        var rows = [];
        var rowCells = [buttonsPerRow];    

        document.getElementById("tablePosition").innerHTML = "";
        number_ofRows = Math.ceil(ingredientsList.length / buttonsPerRow);
        document.getElementById("tablePosition").appendChild(myTable);
        for (var i=0; i < number_ofRows; i++){
            rows.push(myTable.insertRow(-1));
        }
        var counter = 0;
        for (var j=0; j < number_ofRows; j++){
            for (var i=0; i < buttonsPerRow; i++){
                ingredientButtons.push(document.createElement("BUTTON"));
                ingredientButtons[counter].setAttribute("type", "button");
                ingredientButtons[counter].setAttribute("class", "btn btn-primary btn-lg");
                ingredientButtonsText.push( document.createTextNode(ingredientsList[counter]) );
                ingredientButtons[counter].appendChild(ingredientButtonsText[counter]);
                rowCells[i] = rows[j].insertCell(i);
                rowCells[i].appendChild(ingredientButtons[counter]);
                ingredientButtons[counter].addEventListener("click", bindClick(counter));
                counter++;
            }
        }
        function bindClick(j){ return function(){
                                          addToSelectedIngredients(ingredientsList[j]);
                                          ingredientButtons[j].disabled = true;
                                      };
        }
    } // end of: add_theIngredientButtons()
} // end of: addIngredientButtons()

function onloadFunction(){
    getTheIngredients();
    getTheRecipes();
}
function getTheIngredients(){
    var xmlhttp = new XMLHttpRequest();
    var myURL = "ingredients.json";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            myIngredients = JSON.parse(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", myURL, true);
    xmlhttp.send();
}
function getTheRecipes(){
    var xmlhttp = new XMLHttpRequest();
    var myURL = "recipes.json";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            theRecipes = JSON.parse(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", myURL, true);
    xmlhttp.send();
}


