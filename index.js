var doc = document.getElementsByTagName("td");
var alternate = document.getElementById("alternate-sign");
var check = true;
var symbolTriggred = 0;
var decimalFlag  = 0;
alternate.addEventListener("click", function(){
    console.log("inside");
    var text = document.getElementsByClassName("text");
    var text = text[0];
    var comtext = text.innerHTML[text.innerHTML.length-1];
    var ans = check?"+":"-";
    check = !check;
    var res = checkSymbol(comtext);
    console.log("bc" + comtext);
    console.log("ans+" + res);
    if(text.innerHTML != 0 && res == 0){
        console.log("inside1");
        text.innerHTML = text.innerHTML + ans;
    }else{
        console.log("inside2");
        console.log(comtext);
        if(res != -1 && symbolTriggred == 0 && text.innerHTML != 0){
            text.innerHTML = text.innerHTML.slice(0, text.innerHTML.length-1) + ans;
        }
    }
    decimalFlag = 0;

});
for(let element of doc){
    element.addEventListener("click", function(event){
        console.log(element.innerHTML);
        var text = document.getElementsByClassName("text");
        text = text[0];
        var textV  = text.innerHTML;
        var currentS = checkSymbol(textV[textV.length-1]);
        var enteredtext = checkSymbol(element.innerHTML);


        if(element.innerHTML == "AC"){
            text.innerHTML = 0;
            decimalFlag = 0;
         
        }else if(element.innerHTML == "="){
            if(currentS == 1 || currentS == 2){
                window.alert("invalid Syntex");
            }

            var innerText = performCalculation(text.innerHTML);
            text.innerHTML = innerText;
            symbolTriggred = 0;
    
        }
        else if(text.innerHTML == 0 || text.innerHTML == "Error"){
            if(!enteredtext && element.innerHTML != '.'){
                text.innerHTML = element.innerHTML;
                symbolTriggred = 0;
                decimalFlag = 0;
            }
         
        }else{
            if(enteredtext == 1){
                if(!currentS){
                    text.innerHTML = text.innerHTML + element.innerHTML;
                    symbolTriggred = 1;
                    decimalFlag = 0;
                }
            }else if(enteredtext == 0 || enteredtext == -1){
                if(element.innerHTML == '.' && decimalFlag == 0 && currentS != 1){
                    text.innerHTML = text.innerHTML + element.innerHTML;
                    decimalFlag = 1;
                }else if(element.innerHTML !='.'){
                    text.innerHTML = text.innerHTML + element.innerHTML;
                }
                symbolTriggred = 0;
            }
       
        }


    });

}

document.getElementsByTagName("body")[0].addEventListener("keypress" , function(evt){
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var element = String.fromCharCode(charCode);
    // console.log(element);

    keyAnimation(element);

    var text = document.getElementsByClassName("text");
    text = text[0];
    var textV  = text.innerHTML;
    var currentS = checkSymbol(textV[textV.length-1]);
    var enteredtext = checkSymbol(element);

    console.log(charCode);
   if(element == "=" || charCode == 13){
        if(currentS == 1 || currentS == 2){
            window.alert("invalid Syntex");
        }else{
            var innerText = performCalculation(text.innerHTML);
            text.innerHTML = innerText;
        }

    }
    else if(text.innerHTML == 0 || text.innerHTML == "Error"){
        if(!enteredtext){
            if(element != "."){
                text.innerHTML = element;
                decimalFlag = 0;
            }
        }
     
    }else{
        if(enteredtext == 1){
            if(!currentS){
                text.innerHTML = text.innerHTML + element;
                decimalFlag = 0;
            }
        }else if(enteredtext == 0 || enteredtext == -1){
            if(element == '.' && decimalFlag == 0 && currentS != 1){
                text.innerHTML = text.innerHTML + element;
                decimalFlag = 1;
            }else if(element!='.'){
                text.innerHTML = text.innerHTML + element;
            }
            symbolTriggred = 0;
        }
   
    }
});

function checkSymbol(enteredtext){
    if(enteredtext == '/' || enteredtext == '*'
       || enteredtext == '-' || enteredtext == '+' || enteredtext == '%'){
           return 1;
    }
    else if(enteredtext == "+/-"){
        return 2;
    }else if(enteredtext >= 0 && enteredtext <= 9){
        return 0;
    }else if(enteredtext == '.'){
        return -1;
    }
}

function performCalculation(text){
    var ans = parseFloat(eval(text)).toFixed(2);
    decimalFlag = 0;
    if(isNaN(ans)){
        return "Error";
    }
    else if(!isFinite(ans)){
        return "Error";
    }else{
        var checkFloat = ans%1;
        if(checkFloat == 0){
            return parseInt(ans);
        }else{
            decimalFlag = 1;
            return ans;
        }
    }
}

function keyAnimation(findE){
    var findElement = true; 
    for(var i = 0; i < doc.length; i++){
        if(doc[i].innerHTML == findE){
            findElement = doc[i];
            break;
        }
    }
    if(findElement != true){
        if(checkSymbol(findElement.innerHTML) == 1 || findElement.innerHTML == "="){
            findElement.style.backgroundColor = "#a93737";
            setTimeout(() => {
                findElement.style.backgroundColor = "#c14444";
            }, 100);
        }else{
            findElement.style.backgroundColor = "#ffc877";
            setTimeout(() => {
                findElement.style.backgroundColor = "white";
            }, 100);
        }
    }
    
}