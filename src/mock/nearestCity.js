export const response = {
  data: {
    status: 'success',
    data: {
      city: 'Bang Na',
      state: 'Bangkok',
      country: 'Thailand',
      location: {
        type: 'Point',
        coordinates: [100.60574118114, 13.666116121283],
      },
      current: {
        weather: {
          ts: '2020-12-18T22:00:00.000Z',
          tp: 25,
          pr: 1011,
          hu: 69,
          ws: 3.1,
          wd: 70,
          ic: '02n',
        },
        pollution: {
          ts: '2020-12-18T21:00:00.000Z',
          aqius: 41,
          mainus: 'p2',
          aqicn: 14,
          maincn: 'p2',
        },
      },
    },
  },
  status: 200,
  statusText: '',
  headers: {
    'cache-control': 'no-store',
    'content-type': 'application/json',
    pragma: 'no-cache',
  },
  config: {
    url: 'https://api.airvisual.com/v2/nearest_city?key=mock-api-key',
    method: 'get',
    headers: { Accept: 'application/json, text/plain, */*' },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
  },
  request: {},
}
