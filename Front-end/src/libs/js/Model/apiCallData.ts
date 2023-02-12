export interface ApiCallData {
  status: 'successful' | 'error';
  statusCode?: number;
  results?: number;
  data?: any;
  message?: string;
}
