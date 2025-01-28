import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  title = 'Authentication'
  email = ''
  password = ''

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {}

  login() {
    this.authenticationService.login()
    const postLoginRoute = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || '/search'
    this.router.navigateByUrl(postLoginRoute)
  }
}
