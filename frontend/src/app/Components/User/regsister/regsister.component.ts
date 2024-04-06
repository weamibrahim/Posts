import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regsister',
  templateUrl: './regsister.component.html',
  styleUrl: './regsister.component.css'
})
export class RegsisterComponent {

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}
 
  name: string = ''
  email: string = ''
  password: string = ''
errorMessage: string = ''
  register(): void {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.apollo.mutate({
      mutation: gql`
      mutation CreateUser($name: String!, $email: String!, $password: String!) {
        userCreate(name: $name, email: $email, password: $password)
        }
      `,
      variables: {
        name: this.name,
        email: this.email,
        password: this.password
      }
    }).subscribe({
      next: (result) => {
        console.log('User registered successfully:', result.data);
       let message = JSON.parse(JSON.stringify(result.data));
        console.log(message.userCreate);
        if(message.userCreate === 'User already exists'){
          this.errorMessage = 'User already exists';
        }else{
        this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Error registering user:', error);
        // Handle error appropriately
      }
    })
  }
}
