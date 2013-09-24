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
            } else {
                var parent = this.parentNode.parentNode;

                var childs = parent.children;

                var name = childs[0];
                var price = childs[1];
                var amount = childs[3];

                parent.innerHTML = "";

                parent.appendChild(name);
                parent.appendChild(amount);
                parent.appendChild(price);

                var total = document.createElement('td');
                total.setAttribute('id', 'totalprice');

                var totalAmount = parseFloat(amount.getElementsByTagName('input')[0].value);
                var pricePerPiece = parseFloat(price.innerHTML.replace(",", "."));
                var totalprice = pricePerPiece * totalAmount;

                var totalpricepieces = new String(totalprice).split(".");

                totalprice = function() {
                    if(totalpricepieces.length == 1) {
                        return totalpricepieces[0]+",00";
                    } else {
                        if(totalpricepieces[1].length == 1) {
                            return totalpricepieces[0]+","+totalpricepieces[1]+"0";
                        } else {
                            return totalpricepieces[0]+","+totalpricepieces[1];
                        }
                    }
                };

                totalprice = totalprice();

                total.innerHTML = totalprice;
                parent.appendChild(total);

                var shoppingcar = document.getElementById('shoppingcar').tBodies.item(0).appendChild(parent);
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