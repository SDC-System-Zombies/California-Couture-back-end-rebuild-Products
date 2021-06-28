import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const product_id = Math.floor(Math.random() * 1000000 + 1);
  http.get('http://localhost:3000/products');
  // http.get(`http://localhost:3000/products/${product_id}`);
  // http.get(`http://localhost:3000/products/${product_id}/styles`);
  // http.get(`http://localhost:3000/products/${product_id}/related`);
  sleep(1);
}

// command: k6 run --vus 10 --duration 30s stress-test.js