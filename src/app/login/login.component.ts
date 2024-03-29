import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  data = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    ) {}

  goToSignup() {
    // this.router.navigate(['../signup'], {relativeTo: this.route})
    this.router.navigate(['signup'])

  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/'])
      //we can use errorHandler here to display error msg in UI
    });

    console.log(form)
  }
}
