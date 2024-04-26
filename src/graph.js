const fs = require('fs');

fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const buildingsData = JSON.parse(data); // Move this line inside the callback
    map= {"residential": 0, "industrial": 1, "commercial": 2, "power-plant": 3, "road": 4, "tree": 5, "power-line": 6}
                                                                                      
    const arr = Array.from({length: 16}, () => Array.from({length: 16}, () => 5));

    buildingsData.forEach(building => {
        const {x, y, buildingType} = building;
        if (x < 16 && y < 16) {
            arr[x][y] = map[buildingType];
        }
    });

    arr.forEach(row => console.log(row));
});


