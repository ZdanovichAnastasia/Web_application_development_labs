function onBel() {
$.ajax({
    url: 'Belarus.txt',
    dataType: 'text',
    success: function (data) {
    $("#Bel").append(data);
    },
    error: function (err) {
        $( "#bel-button" ).bind( "click", function() {
            alert( "User clicked on 'foo.'" );
        });
    }
});
  $(".forBel").css({
    display: "block"
  });
  $("#Beld").css({
    display: "block"
  });
}
function onUK() {
$.ajax({
    url: 'UK.txt',
    dataType: 'text',
    
    success: function (data) {
    $("#UK").append(data);
    },
    error: function (err) {
        $( "#uk-button" ).bind( "click", function() {
            alert( "User clicked on 'foo.'" );
        });
    }
});
$(".forUK").css({
    display: "block"
  });
  $("#UKd").css({
    display: "block"
  });
}
function onUSA() {
$.ajax({
    url: 'USA.txt',
    dataType: 'text',
    
    success: function (data) {
    $("#USA").append(data);
    },
    error: function (err) {
        $( "#usa-button" ).bind( "click", function() {
            alert( "User clicked on 'foo.'" );
        });
    }
});
$(".forUSA").css({
    display: "block"
  });
  $("#USAd").css({
    display: "block"
  });
}
function onRus() {
$.ajax({
    url: 'Russia.txt',
    dataType: 'text',
    
    success: function (data) {
    $("#Rus").append(data);
    },
    error: function (err) {
        $( "#rus-button" ).bind( "click", function() {
            alert( "User clicked on 'foo.'" );
        });
    }
});
$(".forRus").css({
    display: "block"
  });
  $("#Rusd").css({
    display: "block"
  });

}
function onDop() {
    $.getJSON( "Belarus.json", function(obj) { 
    $.each(obj, function(key, value) { 
        	$("#Beld").append("<div>"+key+": "+ value +"</div>");
  		});
     });
    // $("#Beld").load("dopbel.html");
     $.getJSON( "UK.json", function(obj) { 
        $.each(obj, function(key, value) { 
            $("#UKd").append("<div>"+key+": "+ value +"</div>");
        });
    });
    //$("#UKd").load("dopuk.html");
     $.getJSON( "USA.json", function(obj) { 
        $.each(obj, function(key, value) { 
             $("#USAd").append("<div>"+key+": "+ value +"</div>");
         });
    });
    //$("#USAd").load("dopusa.html");
    $.getJSON( "Russia.json", function(obj) { 
        $.each(obj, function(key, value) { 
             $("#Rusd").append("<div>"+key+": "+ value +"</div>");
         });
    });
    //$("#Rusld").load("doprus.html");
    $('.info').load("page.html");
    $("aside").css({
        display: "block"
      });  
}
$( "#dop-button" ).bind( "click", function() {
    alert( "Информация считалась некорректно" );
});
