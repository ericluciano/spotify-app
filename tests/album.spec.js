// método getAlbum
// || getAlbumTracks

import chai, { expect } from 'chai';
import { getAlbum, getAlbumTracks } from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromises from 'sinon-stub-promise';

sinonStubPromises(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });


  //smoke tests
  describe('Smoke tests', () => {
    it('should have get album method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have get getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {
    //verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    //verifica se o fetch ocorre com a url
    it('should call fetch te correct URL', () => {
      const album = getAlbum('2o5jDhtHVPhrJdv3cEQ99Z');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2o5jDhtHVPhrJdv3cEQ99Z');

      const album2 = getAlbum('2o5jDhtHVPhrJdv3cEQ99k');

      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2o5jDhtHVPhrJdv3cEQ99Z');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' })
      const album = getAlbum('2o5jDhtHVPhrJdv3cEQ99Z');

      expect(album.resolveValue).to.be.eql({album: 'name'});

    });



  });

});
