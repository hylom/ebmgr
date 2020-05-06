import SwaggerClient from 'swagger-client';

const SPEC_URL = 'http://localhost:3333/api-docs';

export default class OaClient {
  getClient() {
    return new SwaggerClient(SPEC_URL);
  }

  getBooks() {
    return this.getClient().then(client => {
      return client.apis.default.getBooks().then(results => results.body);
    });
  }

  getBookThumbnail(path) {
    return this.getClient().then(client => {
      return client.apis.default.getBookThumbnail({vpath: path});
    });
  }

  openBook(path) {
    return Promise.reject("openBook() is not implemented");
  }
}
