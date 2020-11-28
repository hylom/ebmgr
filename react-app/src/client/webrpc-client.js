
const BASE_URL = 'http://localhost:3333/api/v1';

export default class WebClient {
  _fetch(url, param) {
    param = param || {};
    return fetch(url, param).then(resp => {
      if (resp.ok) { return resp; }
      return resp.text().then(text => { throw text; });
    });
  }

  _get(path) {
    const url = `${BASE_URL}${path}`;
    return this._fetch(url);
  }

  _put(path, body) {
    const url = `${BASE_URL}${path}`;
    const headers = new Headers();
    const json = JSON.stringify(body);
    headers.append('Content-Type', 'application/json');
    return this._fetch(url, { method: "POST",
                              headers: headers,
                              body: json
                            });
  }
  
  getBooks() {
    const reqPath = `/books`;
    return this._get(reqPath)
      .then(resp => resp.json());
  }

  getBookThumbnail(vpath) {
    vpath = encodeURIComponent(vpath);
    const reqPath = `/books/${vpath}/thumbnail`;
    return this._get(reqPath)
      .then(resp => resp.blob())
      .then(data => {
        return {data: data};
      });
  }

  openBook(path) {
    return Promise.reject("openBook() is not implemented");
  }

  setStar(vpath, state) {
    vpath = encodeURIComponent(vpath);
    const reqPath = `/books/${vpath}/star`;
    return this._put(reqPath, {star: state})
      .then(resp => resp.json());
  }

  getDirectories() {
    const reqPath = `/directories`;
    return this._get(reqPath)
      .then(resp => resp.json());
  }
}
