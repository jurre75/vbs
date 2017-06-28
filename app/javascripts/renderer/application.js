require('electron').ipcRenderer.on('loaded' , function(event, data) {
  document.getElementById('title').innerHTML = data.appName + ' App';
  document.getElementById('details').innerHTML = 'built with Electron v' + data.electronVersion;
  document.getElementById('versions').innerHTML = 'running on Node v' + data.nodeVersion + ' and Chromium v' + data.chromiumVersion;

  var lf = require('lovefield');
  var schemaBuilder = lf.schema.create('persons', 1);

  schemaBuilder.createTable('Person').
      addColumn('id', lf.Type.INTEGER).
      addColumn('firstname', lf.Type.STRING).
      addPrimaryKey(['id']).
      addIndex('idxFirstname', ['firstname'], false, lf.Order.DESC);

  var personsDb;
  var person;
  schemaBuilder.connect().then(function(db) {
    personsDb = db;
    person = db.getSchema().table('Person');
    var row = person.createRow({
      'id': 3,
      'firstname': 'Jos'
    });

    return db.insertOrReplace().into(person).values([row]).exec();
  }).then(function() {
    return personsDb.select().from(person).where(person.firstname.eq('Jan')).exec();
  }).then(function(results) {
    results.forEach(function(row) {
      console.log(row['id'], 'before', row['firstname']);
    });
  });
});
