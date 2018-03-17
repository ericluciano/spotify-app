import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromises from 'sinon-stub-promise'
chai.use(sinonChai);
sinonStubPromises(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists }
 from '../src/index';

describe('Spotify App', () => {
  let fetchedSub;
  let promise;
  //antes de qualquer execução
  beforeEach(() => {
    fetchedSub = sinon.stub(global, 'fetch');
    promise = fetchedSub.returnsPromise();
  });

  //depois de qualquer execução
  afterEach(() => {
    fetchedSub.restore();
  });

  //smoke tests
  describe('smoke tests', () => {
    // search(genérico)
    // searchAlbums
    // searchArtists
    // searchTracks
    // searchPlaylists

    // deve existir um método search
    it('shoud exist the search method', () => {
      expect(search).to.exist;
    });
    // deve existir um método searchAlbums
    it('shoud exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });
    // deve existir um método searchArtists
    it('shoud exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    // deve existir um método searchTracks
    it('shoud exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    // deve existir um método searchPlaylists
    it('shoud exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });

  });
  // generic Search
  describe('Generic Search', () => {

    //deve chamar a função fetch
    it('should call fetch function', () => {


      // verificar se existe função fetch
      const artists = search();

      expect(fetchedSub).to.have.been.calledOnce;

      fetchedSub.restore();
    });

    //deve receber a url correta para o fetch
    it('should receive the correct url to fetch', () => {

      //passando um tipo
      context('passing one type', () => {

        const artists = search('Tiesto', 'artist');

        expect(fetchedSub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Tiesto&type=artist');

        const albums = search('Incubus', 'album');

        expect(fetchedSub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      });

      //passando mais de um tipo
      context('passing more than one type', () => {

        const artistsAndAlbums = search('Incubus', ['artist', 'album'])

        expect(fetchedSub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');

      });

    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Muse', 'artist');
      // to deep equal
      //
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });


  });

  describe('searchArtists', () => {

    it('should call the fetch function', () => {
      const artists = searchArtists('Tiesto');
      expect(fetchedSub).to.have.been.calledOnce;
    });

    it('should call the correct URL', () => {
      const artists = searchArtists('Muse');
      expect(fetchedSub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

  });

  describe('searchAlbums', () => {

    it('should call the fetch function', () => {
      const albums = searchAlbums('Tiesto');
      expect(fetchedSub).to.have.been.calledOnce;
    });

    it('should call the correct URL', () => {
      const albums = searchAlbums('Muse');
      expect(fetchedSub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });

  });

  describe('searchTracks', () => {

    it('should call the fetch function', () => {
      const tracks = searchTracks('Tiesto');
      expect(fetchedSub).to.have.been.calledOnce;
    });

    it('should call the correct URL', () => {
      const tracks = searchTracks('Muse');
      expect(fetchedSub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });

  });

  describe('searchPlaylists', () => {

    it('should call the fetch function', () => {
      const playlists = searchPlaylists('Tiesto');
      expect(fetchedSub).to.have.been.calledOnce;
    });

    it('should call the correct URL', () => {
      const playlists = searchPlaylists('Muse');
      expect(fetchedSub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });

  });

});
