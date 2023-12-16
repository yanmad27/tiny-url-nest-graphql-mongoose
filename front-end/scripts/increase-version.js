/* eslint-disable */
const fs = require('fs');

fs.readFile('./public/version.json', (err, data) => {
    if (err) throw err;
    const oldVersionInfo = JSON.parse(data);
    const newVersionInfo = {
        version: oldVersionInfo.version.split('.').map((v, i) => i === 1 ? parseInt(v) + 1 : v).join('.'),
        time: new Date().toISOString()
    }

    let jsonVersionInfo = JSON.stringify(newVersionInfo);

    fs.writeFile('./public/version.json', jsonVersionInfo, 'utf8', function (err) {
        if (err) {
            console.log('An error occurred while writing JSON Object to meta.json');
            return console.log(err);
        }

        console.log('version-info.json file has been saved with latest version number');
    });

});


/* eslint-enable */
