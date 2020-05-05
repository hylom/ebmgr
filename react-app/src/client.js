import SwaggerClient from 'swagger-client';
const SPEC_URL = 'http://localhost:3333/api-docs';

function getClient() {
  return new SwaggerClient(SPEC_URL);
}

export function getBooks() {
  return getClient().then(client => {
    return client.apis.default.getBooks().then(results => results.body);
  });
}

