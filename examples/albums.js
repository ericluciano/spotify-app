import { searchAlbums } from '../src/index';

global.fetch = require('node-fetch');

const albums = searchAlbums('Muse');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
