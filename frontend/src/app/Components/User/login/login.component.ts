import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  login(): void {
    this.apollo.mutate({
      mutation: gql`
        mutation LoginUser($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            message
            user {
              _id
              name
              email
            }
          }
        }
      `,
      variables: {
        email: this.email,
        password: this.password
      }
    }).subscribe({
      next: (result) => {
        console.log('Login :', result.data);
      
        let token = JSON.parse(JSON.stringify(result.data));
      if(token.login.token&&token.login.user){
        localStorage.setItem('token', token.login.token)
        localStorage.setItem('user',JSON.stringify(token.login.user)) ;
       this.router.navigate(['/posts']);
       // localStorage.setItem('token', result.login);
      }
      this.errorMessage = token.login.message;
      },
      error: (error) => {
        console.error('Login error:', error);
        //this.errorMessage = error.message || 'An error occurred during login.';
      }
    });
  }
}
