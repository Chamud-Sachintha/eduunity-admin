import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authToken = sessionStorage.getItem('token');

  if (authToken) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });
    console.log('AuthInterceptor: Authorization header attached');
    return next(authReq); // Pass modified request
  }

  return next(req); // Pass original request if no token
};
