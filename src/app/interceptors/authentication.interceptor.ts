import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthenticationService } from '../services/authentication.service'

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthenticationService).token()
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })

    return next(cloned)
  }

  return next(req)
}
