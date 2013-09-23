/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function()
{
    var inputs = document.getElementsByTagName('input');
    // console.log("INPUTS: ", inputs);
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        // console.log("INPUT: ", input);
        var value = input.value;
        input.addEventListener("change", function() {
            if (!validate(this.value)) {
                this.style.border = "1px solid red";
            }
        });
    }

    function validate(value) {
        // console.log('VALIDATE: ', value);
        value = value.replace(" ", "");

        if(value.length > 0) {
            // console.log("VALUE FOUND: ", value);
            var regExpr = new RegExp("^[0-9]*$");
            if (regExpr.test(value)) {
                // console.log("TESTED AND PASSED: ", value);
                return true;
            }
            // console.log("TESTED AND FAILED: ", value);
        }
        
        return false;
    }
};