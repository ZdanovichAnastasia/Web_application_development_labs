function onFirst() {
    var intea = 1;
    var inteb = 1;
    var intec = 1;
    $('#main-list2 li').each(function(){
        if($(this).attr('id').match(/^a$/)){
            var sel = $(this).text();
            $('#main-list1 li').each(function(){
                if($(this).attr('id').match(/^A$/)){
                    $(this).append('<ul><li id = "'+intea+'">'+sel+'</li></ul>');
                    intea = intea +1;
                    $(this).find('#h1').replaceWith(`<h1>${$(this).find('#h1').html()}</h1>`);
                }
            });
        }
        if($(this).attr('id').match(/^b$/)){
            var sel = $(this).text();
            $('#main-list1 li').each(function(){
                if($(this).attr('id').match(/^B$/)){
                    $(this).append('<ul><li id = "'+inteb+'">'+sel+'</li></ul>');
                    inteb = inteb +1;
                    $(this).find('#h2').replaceWith(`<h2>${$(this).find('#h2').html()}</h2>`);
                }
            });
        }
        if($(this).attr('id').match(/^c$/)){
            var sel = $(this).text();
            $('#main-list1 li').each(function(){
                if($(this).attr('id').match(/^C$/)){
                    $(this).append('<ul><li id = "'+intec+'">'+sel+'</li></ul>');
                    intec = intec +1;
                    $(this).find('#h3').replaceWith(`<h3>${$(this).find('#h3').html()}</h3>`);
                }
            });
        }
    });
}

function onSecond() {
    $('#main-list1 li').each(function(){
        if($(this).attr('id').match(/^[2468]$/)){
            $(this).css({
                color: "blue",
                fontFamily: "Comic Sans MS",
                fontSize: "24px",
                fontWeight: "bold"
            });
        }
    });
}
