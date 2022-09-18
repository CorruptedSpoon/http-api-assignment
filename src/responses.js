const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  console.log(JSON.stringify(object));

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'text/xml',
  };

  console.log(object.toString());

  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

const writeJSON = (request, response, status, message, id) => {
  const responseJson = {
    message,
  };
  if (id) {
    responseJson.id = id;
  }
  respondJSON(request, response, status, responseJson);
};

const writeXML = (request, response, status, message, id) => {
  let responseXML = '<response>';
  responseXML = `${responseXML}<message>${message}</message>`;
  if (id) responseXML = `${responseXML}<id>${id}</id>`;
  responseXML = `${responseXML}</response>`;

  respondXML(request, response, status, responseXML);
};

const success = (request, response, acceptedTypes) => {
  const writeCallback = acceptedTypes[0] === 'text/xml' ? writeXML : writeJSON;
  const message = 'This is a successful response';

  writeCallback(request, response, 200, message);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const writeCallback = acceptedTypes[0] === 'text/xml' ? writeXML : writeJSON;
  let message = 'This is a successful response because it has the required parameter';

  if (!params.valid || params.valid !== 'true') {
    message = 'Missing valid query parameter equal to true';
    const id = 'badRequest';

    return writeCallback(request, response, 400, message, id);
  } return writeCallback(request, response, 200, message);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const writeCallback = acceptedTypes[0] === 'text/xml' ? writeXML : writeJSON;
  let message = 'This is a succesful response because it has the required parameter';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    message = 'Missing loggedIn query parameter equal to yes';
    const id = 'unauthorized';

    return writeCallback(request, response, 401, message, id);
  } return writeCallback(request, response, 200, message);
};

const forbidden = (request, response, acceptedTypes) => {
  const writeCallback = acceptedTypes[0] === 'text/xml' ? writeXML : writeJSON;
  const message = 'You do not have access to this content';
  const id = 'forbidden';

  writeCallback(request, response, 403, message, id);
};

const internal = (request, response, acceptedTypes) => {
  const writeCallback = acceptedTypes[0] === 'text/xml' ? writeXML : writeJSON;
  const message = 'Internal Server Error, something went wrong';
  const id = 'internal';

  writeCallback(request, response, 500, message, id);
};

const notImplemented = (request, response, acceptedTypes) => {
  const writeCallback = acceptedTypes[0] === 'text/xml' ? writeXML : writeJSON;
  const message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
  const id = 'notImplemented';

  writeCallback(request, response, 501, message, id);
};

const notFound = (request, response, acceptedTypes) => {
  const writeCallback = acceptedTypes[0] === 'text/xml' ? writeXML : writeJSON;
  const message = 'The page you are looking for was not found.';
  const id = 'notFound';

  writeCallback(request, response, 404, message, id);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
