import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule],
	templateUrl: './login.html',
})
export class Login {
	private router = inject(Router);

	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)])
	})

	onSubmit() {
		if (this.loginForm.valid) {
			const email = this.loginForm.get('email')?.value;
			const password = this.loginForm.get('email')?.value;

			this.router.navigate(['/home']);
		} else {
			this.router.navigate(['/home']);
			// this.loginForm.markAllAsTouched();
		}
	}
}