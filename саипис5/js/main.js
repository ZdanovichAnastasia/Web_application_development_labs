window.addEventListener('load', () =>{
    let app = new App('dbusr4', 'user100');
    app.db.load(app.tbl);
    app.db.choose(app.tbl);            
    app.create();
});
