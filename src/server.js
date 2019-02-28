const http = require('http');
const url = require('url');
const querystring = require('querystring');

const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAApJREFUeNpjYQAAAAoABUouQOkAAAAASUVORK5CYII=', 'base64');

function log(type, request, query) {
  const log = {
    dateTime: new Date().toISOString(),
    type: type,
    ip: (request.headers && request.headers['x-forwarded-for']) || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress,
    headers: request.headers,
    data: query,
  };

  console.log(JSON.stringify(log));
}

function send(response, code, description, headers, body) {
  response.writeHead(code, description, headers);
  response.end(body);
}

const server = http.createServer((request, response) => {
  const request_url = url.parse(request.url);
  const query = querystring.parse(request_url.query);

  if (request.method !== 'GET')
    return send(response, 405, 'Method Not Allowed');

  if (request_url.pathname === '/o') {
    log('open', request, query);

    return send(response, 200, 'OK', { 'Content-Type': 'image/png' }, pixel);
  }

  if (request_url.pathname === '/c') {
    if (!query.url)
      return send(response, 422, 'Unprocessable Entity');

    log('click', request, query);

    return send(response, 302, 'Found', { 'Location': query.url });
  }

  return send(response, 404, 'Not Found');
});

server.listen(process.argv[2] || 3000);
