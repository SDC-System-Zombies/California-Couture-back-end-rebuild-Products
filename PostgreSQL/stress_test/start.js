import http from 'k6/http';
import { sleep, check } from 'k6';
import productTest from './products.js';
import singleprodTest from './singleprod.js';
import styleTest from './styles.js';
import relatedTest from './related.js';

export let options = {
  vus: 10,
  duration: '30s'
};

export default function () {
  productTest();
  singleprodTest();
  styleTest();
  relatedTest();
};

// command: k6 run stress_test/server.js