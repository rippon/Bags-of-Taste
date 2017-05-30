
var buttonsPerRow = 4;
var number_ofRows;
number_ofRows = Math.ceil(ingredientsList.length / buttonsPerRow);
var counter = 0;
for (var j=0; j < number_ofRows; j++){
    for (var i=0; i < buttonsPerRow; i++){
        var temp1, temp2;
        temp1 = document.createElement("BUTTON");
        theButtons.push(temp1);
        temp2 = document.createTextNode(ingredientsList[counter]);
        theButtonsText.push(temp2);
        theButtons[counter].appendChild(theButtonsText[counter]);
        rowCells[i] = rows[j].insertCell(i);
        rowCells[i].appendChild(theButtons[counter]);
        theButtons[counter].addEventListener("click", bindClick(counter));
        theButtons[counter].style.backgroundColor = "Yellow";
        counter++;
    }
}


function addIngredientButtons(){
    var xmlhttp = new XMLHttpRequest();
    var myURL = "ingredients.json";
    var myIngredients;

    document.getElementById("showIngredientButtons").disabled = true;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            myIngredients = JSON.parse(xmlhttp.responseText);
            setIngredientsList();
            addTheButtons();
        }
    };
    xmlhttp.open("GET", myURL, true);
    xmlhttp.send();
    
    function setIngredientsList(){
        for (var i=0; i < myIngredients.length; i++){
            ingredientsList.push(myIngredients[i].ingredient);
        }
       ingredientsList.sort();
    }
    function addTheButtons(){
        var buttonsPerRow = 3;
        var number_ofRows;
        theButtons = [];
        var theButtonsText = [];
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
                var temp1, temp2;
                temp1 = document.createElement("BUTTON");
                theButtons.push(temp1);
                temp2 = document.createTextNode(ingredientsList[counter]);
                theButtonsText.push(temp2);
                theButtons[counter].appendChild(theButtonsText[counter]);
                rowCells[i] = rows[j].insertCell(i);
                rowCells[i].appendChild(theButtons[counter]);
                theButtons[counter].addEventListener("click", bindClick(counter));
                theButtons[counter].style.backgroundColor = "Yellow";
                counter++;
            }
        }
        function bindClick(j){ return function(){
                                          addToSelectedIngredients(ingredientsList[j]);
                                          theButtons[j].disabled = true;
                                      };
        }
    }
} // end of: addIngredientButtons()
