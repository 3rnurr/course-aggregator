import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Counter } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const requestCount = new Counter('http_requests');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up
    { duration: '1m', target: 10 },  // Steady state
    { duration: '30s', target: 50 }, // Stress test
    { duration: '1m', target: 50 }, // High load
    { duration: '30s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests should be < 500ms
    http_req_failed: ['rate<0.1'],      // Error rate should be < 10%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:8000';

export default function () {
  // Test 1: Get courses list
  const coursesRes = http.get(`${BASE_URL}/api/courses/`);
  check(coursesRes, {
    'courses status 200': (r) => r.status === 200,
    'courses has results': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.results || data;
      } catch (e) {
        return false;
      }
    },
  }) || errorRate.add(1);
  requestCount.add(1);
  sleep(1);

  // Test 2: Search courses
  const searchRes = http.get(`${BASE_URL}/api/courses/?search=python`);
  check(searchRes, {
    'search status 200': (r) => r.status === 200,
  }) || errorRate.add(1);
  requestCount.add(1);
  sleep(1);

  // Test 3: Order courses
  const orderRes = http.get(`${BASE_URL}/api/courses/?ordering=-rating`);
  check(orderRes, {
    'order status 200': (r) => r.status === 200,
  }) || errorRate.add(1);
  requestCount.add(1);
  sleep(1);

  // Test 4: Pagination
  const pageRes = http.get(`${BASE_URL}/api/courses/?page=1&page_size=5`);
  check(pageRes, {
    'page status 200': (r) => r.status === 200,
  }) || errorRate.add(1);
  requestCount.add(1);
  sleep(1);
}

// Summary function
export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    './load-test-results.json': JSON.stringify(data),
  };
}

function textSummary(data, options) {
  const indent = options.indent || '  ';
  let output = '\n=== Load Test Results ===\n\n';
  
  output += `Total Requests: ${data.metrics.http_reqs.values.count}\n`;
  output += `Request Duration (avg): ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms\n`;
  output += `Request Duration (p95): ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms\n`;
  output += `Error Rate: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n`;
  
  return output;
}