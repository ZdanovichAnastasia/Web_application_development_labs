
function mysave(){
    var str = document.getElementsByName("txt");
    var num = str.length;
    var s = document.getElementById("size").value;
    var c = document.getElementById("color").value;
    var res = '';
    for(var i = 1; i <= num; i++){
        var tx = "txt"+i;
        var t1 = document.getElementById(tx).value;
        //t2.style.fontSize = "s";
        res+=i+") "+t1+"<br \/>";
    }
   //var t1 = document.getElementById("txt1").value;
   //document.write("t=="+t1+"<br \/>");
   //var t2 = document.getElementById("txt2").value;
    //var t3 = document.getElementById("txt3").value;
    //var s = document.getElementById("size").value;
    //var c = document.getElementById("color").value;
    
    location.hash ='zatemnenie'
    document.getElementById("demo").innerHTML = res;  
    var tr =  document.getElementById("demo");
    tr.style.fontSize = s;
    tr.style.color = c;
   // document.getElementById("demo").innerHTML = "1) "+t1+"<br \/>"+
    //"2) "+t2+"<br \/>"+
   // "3) "+t3+"<br \/>"+
    //"size) "+s+"<br \/>"+
    //"color) "+c+"<br \/>";
}
var x = 0;
/*function cleaner(){
    window.location="index.html";
}*/
 
function my(){
    var str = document.getElementsByName("txt");
    var num = str.length;
    document.getElementById("txt1").value = "";
    document.getElementById("txt2").value = "";
    document.getElementById("txt3").value = "";
    document.getElementById("size").value = "";
    document.getElementById("color").value = "";
    elements=[// массив элементов которые надо переключать, в порядке переключения конечено
        document.getElementById("txt1"),
        document.getElementById("txt2"),
        document.getElementById("txt3"),
        document.getElementById("size"),
        document.getElementById("color")
    ];
    for(var i = 4; i <= num; i++){
        var tx = "txt"+i;
        var t1 = document.getElementById(tx);
        elements.push(t1);
    }
    //document.write("t=="+elements.length+"<br \/>");
    for(var i=0; i<elements.length; i++){
        elements[i].style.height="35px";
        elements[i].style.width="350px";
        elements[i].style.border = "2px solid black";
        elements[i].style.background = "white";
        elements[i].placeholder="Заполните поле";
    }
    var h=document.getElementById("f1");
    h.style.height=(150+25*(num+1))+"px";
}

var x = 0;
function addInput() {
    var str = ' <label>Введите ингредиент'+(2+x)+'<input type="text" name="txt" id="txt'+(4+x)+'" ></label><br><div id="input' + (x + 1) + '"></div> <style>#txt'+(4+x)+':focus{background-color: antiquewhite;}</style>';
    //str+='<script>elements=[ document.getElementById("txt'+(3+x)+'"), document.getElementById("txt'+(4+x)+'"), document.getElementById("size"), document.getElementById("color")]function onKeyDown(e) {if (e.keyCode==13) {var index=e.target.getAttribute("MyTabIndex");elements[index==elements.length?0:index].focus()flag++;} }elements.forEach(function (e, c){e.setAttribute("MyTabIndex", c+1);e.onkeydown=onKeyDown });</script>';
    var h=document.getElementById("f1");
    h.style.height=(150+40*(x+1))+"px";
    str+='<style>#txt'+(4+x)+'{margin: 5px;width: 300px;height: 25px;}</style>';
    document.getElementById('input' + x).innerHTML = str;
    x++;
}

