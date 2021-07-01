import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let res = http.get('http://localhost:2222/products');

  check(res, {
    "status is 200": (r) => r.status === 200
  });
};