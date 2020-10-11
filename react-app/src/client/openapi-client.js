import SwaggerClient from 'swagger-client';

const SPEC_URL = 'http://localhost:3333/api-docs';

export default class OaClient {
  getClient() {
    return new SwaggerClient(SPEC_URL);
  }

  getBooks() {
    return this.getClient()
      .then(client => {
        return client.apis.default.getBooks().then(results => results.body);
      });
  }

  getBookThumbnail(path) {
    return this.getClient()
      .then(client => {
        return client.apis.default.getBookThumbnail({vpath: path})
          .catch(err => {
            if (err.response.body) {
              throw err.response.body;
            }
            throw err;
          });
      });
  }

  openBook(path) {
    return Promise.reject("openBook() is not implemented");
  }

  setStar(vpath, state) {
    return this.getClient()
      .then(client => {
        return client.apis.default.setStar({vpath: vpath},
                                           {requestBody: {star: state}})
          .catch(err => {
            if (err.response.body) {
              throw err.response.body;
            }
            throw err;
          });
      });
  }
}
