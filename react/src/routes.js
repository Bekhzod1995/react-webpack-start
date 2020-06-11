const httpBaseURL = 'http://192.168.1.241:8997/';
const wsBaseURL = 'ws://192.168.1.241:8997/ws/transformers/';

export default {
  measurementLink: (id) => [httpBaseURL, 'transformers/', id, '/measurements/'].join(''),
  statesLink: (id) => [httpBaseURL, 'transformers/', id, '/states/'].join(''),
  errorMeasurmentLink: () => [httpBaseURL, 'errors'].join(''),
  wsLink: (id) => [wsBaseURL, id, '/'].join(''),
  transformersListLink: () => [httpBaseURL, 'transformers'].join(''),
};
