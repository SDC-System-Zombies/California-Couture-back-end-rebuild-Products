import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let res = http.get('http://localhost:3000/products');

  check(res, {
    "status is 200": (r) => r.status === 200
  });
};