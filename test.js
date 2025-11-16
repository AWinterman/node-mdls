import mdls from './index.js';

try {
    const data = await mdls('./index.js');
    console.log('Data', data);
} catch (err) {
    console.log('Error', err);
}


try {
    const data = await mdls('./index.js', '-name kMDItemContentTypeTree');
    console.log('Data', data);
} catch (err) {
    console.log('Error', err);
}
