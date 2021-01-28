function App(baseName, tableName){
    this.db = new DataBase(baseName);
    this.tbl = tableName;
    this.fields = {
        addForm: document.querySelector('#add-form'),
        addNum: document.querySelector('#add-num'),
        addPhoneNumber: document.querySelector('#add-phone-number'),
        addFio: document.querySelector('#add-fio'),
        addAddress: document.querySelector('#add-address')
    };
    this.btn = {
        add: document.querySelector('#add'),
        clear: document.querySelector('#btnClear'),
        del: document.querySelector('#del'),
        show: document.querySelector('#show'),
        fold: document.querySelector('#fold'),
        sort: document.querySelector('#sort')
    };
};

App.prototype.create = function(){
    this.db.create(this.tbl);
    this.btn.add.addEventListener('click', e =>{
        if(e.target.tagName == 'INPUT'){
            if(this.fields.addForm != '' && this.fields.addNum != '' && this.fields.addFio != '' && this.fields.addPhoneNumber != ''){
                //var d = document.getElementById("hero").value;
                this.db.add(this.tbl);
                //this.db.load(this.tbl);
            }
            for(const key in this.fields){
                this.fields[key].value = '';
            }
        }
        //location.href='result.html';
    });
    this.btn.sort.addEventListener('click', e =>{
        //alert("sort")
        if(e.target.tagName == 'INPUT'){
            this.db.sort(this.tbl);
        }
        //location.href='result.html';
    });
    this.btn.show.addEventListener('click', e =>{
        if(e.target.tagName == 'BUTTON'){
            this.db.load(this.tbl);
        }
        location.href='result.html';
    });
    this.btn.del.addEventListener('click', e =>{
        if(e.target.tagName == 'INPUT'){
            this.db.del(this.tbl);
        }
    });
    this.btn.fold.addEventListener('click', e =>{
        if(e.target.tagName == 'INPUT'){
            document.getElementById('add-address').style.display = 'inline';

            //var str = '<input type="text"><br>';
            //document.getElementById('input').innerHTML = str;
        }
    });

 
    this.btn.clear.addEventListener('click', e =>{
        if(e.target.tagName == 'BUTTON'){
            this.db.clear(this.tbl);
        }
    });
};