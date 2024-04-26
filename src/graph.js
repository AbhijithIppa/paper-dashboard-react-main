const fs = require('fs');

fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const buildingsData = JSON.parse(data); // Move this line inside the callback

                                                                                      
    const arr = Array.from({length: 16}, () => Array.from({length: 16}, () => 5));

    buildingsData.forEach(building => {
        const {x, y, buildingType} = building;
        if (x < 16 && y < 16) {
            arr[x][y] = map[buildingType];
        }
    });

    arr.forEach(row => console.log(row));
});


