import { HttpHeaders } from '@angular/common/http';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json; charset=utf-8'
    }
  )
};

export const HTTP_OPTIONS_EXCEL = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=utf-8'
      // Accept: 'application/json; charset=utf-8',
    }
  ),
  responseType: 'blob' as 'json'
};
