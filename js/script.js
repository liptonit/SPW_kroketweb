/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function()
{
    var inputs = document.getElementById('itemlist').getElementsByTagName('input');
    var totalTotalPrice = 0;


    var amounts = [];

    var totalpriceF = function(splittedPrice) {
        var newPrice = "";
        if (splittedPrice.length == 1) {
            newPrice = splittedPrice[0] + ",00";
        } else {
            if (splittedPrice[1].length == 1) {
                newPrice = splittedPrice[0] + "," + splittedPrice[1] + "0";
            } else {
                newPrice = splittedPrice[0] + "," + splittedPrice[1];
            }
        }

        var newPriceParts = newPrice.split(",");
        if (newPriceParts[1].length > 2) {
            newPrice = newPriceParts[0] + "," + new String(newPriceParts[1].substring(0, 2));
        }

        return newPrice;
    };

    // console.log("INPUTS: ", inputs);
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        // console.log("INPUT: ", input);
        var value = input.value;
        input.addEventListener("change", function() {
            if (!validate(this.value)) {
                this.style.border = "1px solid red";
            } else {
                this.removeEventListener("change");
                var parent = this.parentNode.parentNode;

                amounts[i] = {amount : parseFloat(parent.children[3].getElementsByTagName('input')[0].value), price : parseFloat(parent.children[1].innerHTML.replace(",", "."))};

                var childs = parent.children;

                var name = childs[0];
                var price = childs[1];

                var amount = childs[3].cloneNode(true);

                parent.innerHTML = "";

                parent.appendChild(name);
                parent.appendChild(amount.cloneNode(true));
                parent.appendChild(price);

                var total = document.createElement('td');
                total.setAttribute('id', 'totalprice');

                var totalAmount = parseFloat(amount.getElementsByTagName('input')[0].value);
                var pricePerPiece = parseFloat(price.innerHTML.replace(",", "."));
                var totalprice = pricePerPiece * totalAmount;

                var totalpricepieces = new String(totalprice).split(".");

                totalprice = totalpriceF(totalpricepieces);
                total.innerHTML = totalprice;
                parent.appendChild(total);

                var shoppingcar = document.getElementById('shoppingcar').tBodies.item(0).appendChild(parent);

                totalTotalPrice = parseFloat(totalTotalPrice) + parseFloat(totalprice);
                document.getElementById('totaltotal').innerHTML = totalpriceF(new String(totalTotalPrice).split("."));

                var newInputField = parent.getElementsByTagName('input')[0];
                addChangeEventToShopCarItem(newInputField, i);
            }
        }, false);
    }


    function addChangeEventToShopCarItem(item, indexOld) {
        var oldValue = parseFloat(this)
        // var item = item.parentNode;
        item.addEventListener("change", function() {
            
            var oldValue = amounts[indexOld].amount * amounts[indexOld].price;
            var newValue = parseFloat(this.value) * amounts[indexOld].price;

            var dif = newValue - oldValue;

            amounts[indexOld].amount = parseFloat(this.value);

            totalTotalPrice = parseFloat(totalTotalPrice) + dif;

            this.parentNode.parentNode.children[3].innerHTML = "";
            var totalPrice = parseFloat(this.value) * parseFloat(this.parentNode.parentNode.children[2].innerHTML.replace(",", "."));
            var totalPricePieces = new String(totalPrice).split(".");
            totalPrice = totalpriceF(totalPricePieces);
            this.parentNode.parentNode.children[3].innerHTML = totalPrice;

            document.getElementById('totaltotal').innerHTML = totalpriceF(new String(totalTotalPrice).split("."));

        }, false);
    }

    function validate(value) {
        // console.log('VALIDATE: ', value);
        value = value.replace(" ", "");

        if (value.length > 0) {
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

function validateForm() {
    var myInput = document.forms["order"]["myInput"];   // naam
    var myInput2 = document.forms["order"]["myInput2"];  // straat + huisnr
    var myInput3 = document.forms["order"]["myInput3"];  // plaats
    var area = document.forms["order"]["area"];      // telefoonnummer
    var valid = true;                                 // validatie           


    // Check if fields are empty
    if (myInput.value == null || myInput.value == "") {
        myInput.style.border = "1px solid red";
        valid = false;
    }

    if (myInput2.value == null || myInput2.value == "") {
        myInput2.style.border = "1px solid red";
        valid = false;
    }

    if (myInput3.value == null || myInput3.value == "") {
        myInput3.style.border = "1px solid red";
        valid = false;
    }

    if (area.value == null || area.value == "") {
        area.style.border = "1px solid red";
        valid = false;
    }

    // Check if telnr is valid
    var regExpTel = /^0[0-9]{9}$/i;
    if (!regExpTel.test(area.value)) {
        area.style.border = "1px solid red";
        valid = false;
    }
    return valid;
}
