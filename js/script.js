/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function()
{
    
    var inputs = document.getElementById('itemlist').getElementsByTagName('input');
    var totalTotalPrice = 0;
    var shoppingCartKeys= new Array();

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
                this.removeEventListener();
                var parent = this.parentNode.parentNode;                

                var childs = parent.children;

                var name = childs[0];
                var price = childs[1];
                var amount = childs[3];

                parent.innerHTML = "";
                
                var rowObject = {name: name, amount: amount.getElementsByTagName('input')[0].value, price: price}
                sessionStorage.setItem(i, rowObject);
                
                parent.appendChild(name);
                parent.appendChild(amount);
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
                totalTotalPricePieces = new String(totalTotalPrice).split(",");
                totalTotalPrice = totalpriceF(totalTotalPricePieces);
                document.getElementById('totaltotal').innerHTML = totalTotalPrice;

                addChangeEventToShopCarItem(this);
                // this.addEventListener("change", function() {
                //     this.parent.parent.childs[3].innerHTML = "";
                //     var totalPrice = parseInt(this.value) * parseFloat(this.parent.parent.childs[2].innerHTML);
                //     var totalPricePieces = new String(totalPrice).split(".");
                //     totalPrice = totalpriceF(totalPricePieces);
                //     this.parent.parent.childs[3].innerHTML = totalPrice;
                // }, false);
            }
        }, false);
    }

    function addChangeEventToShopCarItem(item) {
        item.addEventListener("change", function() {
            item.parent.parent.childs[3].innerHTML = "";
            var totalPrice = parseInt(item.value) * parseFloat(item.parent.parent.childs[2].innerHTML);
            var totalPricePieces = new String(totalPrice).split(".");
            totalPrice = totalpriceF(totalPricePieces);
            item.parent.parent.childs[3].innerHTML = totalPrice;
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

if(sessionStorage.length > 0) {
    var shoppingcar = document.getElementById('shoppingcar').getElementsByTagName('tbody')[0];
    for(var i = 0; i < sessionStorage.length; i++) {
//        sessionStorage.getItem(); // name is the key
        var row         = document.createElement('tr');
        var cellName    = document.createElement('td');
        var cellAmount  = document.createElement('td');
        var cellPrice   = document.createElement('td');
        
        cellName.setAttribute('id', 'productname');
        cellAmount.setAttribute('id', 'amount');
        cellPrice.setAttribute('id', 'price');
        
        var test = sessionStorage.getItem();
        
        console.log(shoppingCartKeys);
        
        cellName.innerHTML      = sessionStorage.getItem(i);
        cellAmount.innerHTML    = sessionStorage.getItem(i);
        cellPrice.innerHTML     = sessionStorage.getItem(i);
    }
}

};

function validateForm() {
    var myInput     = document.forms["order"]["myInput"];   // naam
    var myInput2    = document.forms["order"]["myInput2"];  // straat + huisnr
    var myInput3    = document.forms["order"]["myInput3"];  // plaats
    var area        = document.forms["order"]["area"];      // telefoonnummer
    var valid       = true;                                 // validatie           


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

function storeSomething(row) {
    sessionStorage.something = row;
    
}
