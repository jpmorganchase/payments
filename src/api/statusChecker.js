import { client } from './client';

class StatusChecker {
  static fetchApiStatus() {
    return client.get('v1/outages');
  }
}

export default StatusChecker;
