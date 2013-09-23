/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function()
{
    var inputs = document.getElementsByTagName('input');
   console.log("INPUTS: ", inputs);
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        console.log("INPUT: ", input);
//        console.log(input);
        var value = input.value;
        input.addEventListener("change", function() {
            console.log(value);
            if (!validate(value))
            {
                console.log("YES");
                input.style.color = "red";
            }
        }
        );
    }

    function validate(input) {
        console.log('test', input);
        input = input.replace(" ", "");
        var regExpr = new RegExp("^\d*$");
        if (!regExpr.test(input)) {
            return false;
        }
        return true;
    }
};