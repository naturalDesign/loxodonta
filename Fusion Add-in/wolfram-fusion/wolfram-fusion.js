//Author-ndesign.co
//Description-Passing the Wolfram|One data to the Autodesk Fusion 360

function run(context) {

    "use strict";
    if (adsk.debug === true) {
        /*jslint debug: true*/
        debugger;
        /*jslint debug: false*/
    }

    var ui;
    try {
        var app = adsk.core.Application.get();
        ui = app.userInterface;
        var product = app.activeProduct;
        var design = adsk.fusion.Design(product);
        var params = design.userParameters;
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        
        xhr.onreadystatechange = function()  {
          if (this.readyState == 4) {
              var resp = this.resoponseText;
              var myArr = JSON.parse(this.responseText);
              for (var prop in myArr){
                  var curP = params.itemByName(prop);
                  curP.value = myArr[prop];
              }              
          }
        };
        var notebook = params.itemByName("URL").comment+"?x="+params.itemByName("w").value;
        xhr.open("GET", notebook);
        xhr.responseType = "text";
        xhr.send(data);

    }
    catch (e) {
        if (ui) {
            ui.messageBox('Failed : ' + (e.description ? e.description : e));
        }
    }
}

function stop(context) {
    var ui;
    try {
        var app = adsk.core.Application.get();
        ui = app.userInterface;

        ui.messageBox('Stop addin');
    }
    catch (e) {
        if (ui) {
            ui.messageBox('Failed : ' + (e.description ? e.description : e));
        }
    }
}
