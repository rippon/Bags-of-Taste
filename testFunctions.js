

function testArrayContainsStuff1(arg){
    var myArray = ["zErO", "one", "two", "three", "four"];
    var ingredients = ["zero"];
    var output;
    var ingredientsUpperCaseVersion;
    var string1 = "oneee";
    var string2 = "one";
    
    output = "myArray[0].toUpperCase() = " + myArray[0].toUpperCase();
    output += "\n myArray[0].toLowerCase() = " + myArray[0].toLowerCase();
    output += "\n myArray contains ingredients = " + 
              arrayContainsElementsTestVersion(myArray, ingredients);
    output += "\n string1 contains string2 = " + string1.includes(string2);
    alert(output);
    
}

