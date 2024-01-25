
const path = require('path');

module.exports = {
    entry: './content_script.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

