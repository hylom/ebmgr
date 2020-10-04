export default class Logger {
  constructor() {
    this.log = [];
  }

  info(message) {
    this.log.push(['info', message]);
  }

  getAllInfo() {
    return this.getAll('info');
  }

  getAll(type) {
    return this.log
      .filter(x => x[0] === type)
      .map(x => x[1])
      .join("\n");
  }

  clear() {
    this.log = [];
  }
}
