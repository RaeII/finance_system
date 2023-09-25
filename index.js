import app from './src/loaders/express.js';
import colors from 'colors/safe.js';

app.listen(3000,() => console.log(
    colors.yellow.bold(
        colors.rainbow(' -=============================-\n'),
        'OpenIA🤖\n  Server listening on port:3000\n',
        colors.rainbow('-=============================-'))))





