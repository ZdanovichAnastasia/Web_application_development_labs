function DataBase(name){
    this.dbName = name;

    this.db = openDatabase(this.dbName, '1.0', this.dbName, 100*1024*1024);
}

DataBase.prototype.create = function(name){
    var strFields = '';
    var fields={
        form: 'TEXT', num: 'TEXT',
        phone: 'TEXT', fio: 'TEXT', address: 'TEXT'
    }

    for(const key in fields){
        strFields += ", "+ key + ' '+ fields[key];
    }

    this.db.transaction(function(tx){
        tx.executeSql('create table if not exists '+ name + '(id integer primary key autoincrement'+ strFields + ')');
    });
};

DataBase.prototype.add = function(name){
    //alert("Add");
    var q = new Array();
    var vars = new Array();
    var vals = new Array();
    var values={
        form: document.getElementById('add-form').value,
        num: document.getElementById('add-num').value,
        phone: document.getElementById('add-phone-number').value,
        fio: document.getElementById('add-fio').value,
        address: document.getElementById('add-address').value
    }
    
    for(var i = 0; i < Object.keys(values).length; i++){
        q.push('?');
    }

    for(const key in values){
        vars.push(key);
    }

    for(const key in values){
        vals.push(values[key]);
    }

    this.db.transaction(function(tx){
        tx.executeSql('insert into '+ name + '('+ vars.join(", ")+') values('+ q.join(", ")+')', vals);
    });
    alert("Вы добавили новую запись!");
};

DataBase.prototype.load = function(name){
    //alert("load");
    var sql='select * from '+ name;
    document.querySelector('.table').innerHTML='';
    this.db.transaction(function(tx){
        tx.executeSql(sql, [], function(tx, result){
            var n = result.rows.length;
            //alert("111");
            for(var i = 0; i < n; i++){
                var work = result.rows.item(i);
                var tbl_block = document.querySelector('.table');
                var cell_form = document.createElement('div');
                //var cell_del_btn = document.createElement('div');
               // var del_btn = document.createElement('button');//
                cell_form.setAttribute('class','cell-tbaable');
                cell_form.setAttribute('data-id', work.id);
                var cell_num = cell_form.cloneNode(true);
                var cell_phone = cell_form.cloneNode(true);
                var cell_fio = cell_form.cloneNode(true);
                var cell_address = cell_form.cloneNode(true);
                cell_form.setAttribute('data-field','form');
                cell_num.setAttribute('data-field','num');
                cell_phone.setAttribute('data-field','phone');
                cell_fio.setAttribute('data-field','fio');
               // cell_address.setAttribute('data-field','address');
                //cell_del_btn.setAttribute('class','cell-tbaable');//
                //del_btn.setAttribute('data-id', work.id);//
                cell_form.innerText = work.form;
                cell_num.innerText = work.num;
                cell_fio.innerText = work.fio;
                cell_phone.innerText = work.phone;
                if(work.address == ""){
                    cell_address.innerText = "--";
                }
                else{
                cell_address.innerText = work.address;
                }
                //del_btn.innerHTML = '&times;';//
                //cell_del_btn.appendChild(del_btn);//
                tbl_block.appendChild(cell_form);
                tbl_block.appendChild(cell_num);
                tbl_block.appendChild(cell_phone);
                tbl_block.appendChild(cell_fio);
                tbl_block.appendChild(cell_address);
                //tbl_block.appendChild(cell_del_btn);//
            }
        });
    });
};
DataBase.prototype.choose = function(name){
     var sql='select * from '+ name;
     document.querySelector('.table').innerHTML='';
     this.db.transaction(function(tx){
         tx.executeSql(sql, [], function(tx, result){
            var list = document.getElementById('sel');
            var n = result.rows.length;
            item = document.createElement('option');
            for(var i = 0; i < n; i++){
                var work = result.rows.item(i);
                item.innerHTML = work.form;
                list.appendChild(item.cloneNode(true));
            }
        });
    });
 };

DataBase.prototype.update=function(name, field, value, id){
    var sql  = 'update '+name+ ' set ' +field+ ' = '+value+' WHERE id = '+id;
    this.db.transaction(function(tx){
        tx.executeSql(sql);
    });
};

DataBase.prototype.del = function(name){
    var id = document.getElementById('sel').value;
    //alert(id);
    var sql = 'DELETE FROM '+name+' WHERE form = '+ id ;

    this.db.transaction((tx)=>{
        tx.executeSql(sql);
    });
};

DataBase.prototype.sort = function(name){
    //alert("load");
    var sql='select * from '+ name;
    this.db.transaction(function(tx){
        tx.executeSql(sql, [], function(tx, result){
            document.getElementById("for1").style.display = 'block';
            var list1 = document.getElementById('list1');
            var n = result.rows.length;
            item1 = document.createElement('li');
            var arr = new Array;
            for(var i = 0; i < n; i++){
                var work = result.rows.item(i);
                arr[i] = work.num;
            }
            arr.sort(function (a, b) {
                return a - b;
            });
            for(var i = 0; i < 5; i++){
                for(var j = 0; j < n; j++){
                    var work = result.rows.item(j);
                    if(arr[i]==work.num){
                        var str = work.fio + "  --  " + work.num;
                        item1.innerHTML = str;
                        list1.appendChild(item1.cloneNode(true));
                    }
                }
            }
            arr.sort(function (a, b) {
                return b - a;
            });
            document.getElementById("for2").style.display = 'block';
            var list2 = document.getElementById('list2');
            var n = result.rows.length;
            item2 = document.createElement('li');
            for(var i = 0; i < 5; i++){
                for(var j = 0; j < n; j++){
                    var work = result.rows.item(j);
                    if(arr[i]==work.num){
                        var str = work.fio + "  --  " + work.num;
                        item2.innerHTML = str;
                        list2.appendChild(item2.cloneNode(true));
                    }
                }
            }
       });
   });
};

/*DataBase.prototype.max = function(name){
    var sql='select * from '+ name;
    document.querySelector('.table').innerHTML='';
    this.db.transaction(function(tx){
        var mas = [];
        tx.executeSql(sql, [], function(tx, result){
            var n = result.rows.length;
            //alert("111");
            for(var i = 0; i < n; i++){
                var work = result.rows.item(i);
                mas[i]=work.num;
                //cell_num.innerText = work.num;
                alert(mas[i]);
            }
            mas.sort();
            //this.db.search(name, mas[0]);
            return mas;
        });
    });
};

DataBase.prototype.search = function(name, kol){
    alert("Seach");
    var sql = 'Select FROM '+name+' WHERE num = '+ kol;
    this.db.transaction(function(tx){
        tx.executeSql(sql, [], function(tx){
         alert(fio);
        });
    });
}*/
    
DataBase.prototype.clear = function(name){
    var sql = 'DROP TABLE '+name;
    this.db.transaction(function(tx){
        tx.executeSql(sql);
    });
    document.querySelector('.table').innerHTML = '';
};