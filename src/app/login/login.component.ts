import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,
    private route: ActivatedRoute,
    ) {}

  goToSignup() {
    // this.router.navigate(['../signup'], {relativeTo: this.route})
    this.router.navigate(['signup'])

  }
}
