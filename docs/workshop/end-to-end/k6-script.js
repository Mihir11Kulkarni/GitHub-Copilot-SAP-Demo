// Prompt: "Generate k6 script load testing Product list endpoint for 30s, 20 VUs (illustrative)."
import http from 'k6/http'
import { sleep } from 'k6'
export const options = { duration: '30s', vus: 20 }
export default function () {
  http.get('http://localhost:4004/odata/v4/ProductService/Product')
  sleep(1)
}
