const getClient = require('../src/client').default;

function execQuery(q) {
  const ev = new CustomEvent('ebmExecQuery', { detail: { query: q }});
  window.dispatchEvent(ev);
}

window.bookmanager = {
  getClient: getClient,
  execQuery: execQuery,
};

