const mdls = require('./index.js');

(async () => {

try {
    const data = await mdls('./index.js');
    console.log('Data', data);
} catch (err) {
    console.log('Error', err);
}

})();
