import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  name: string = '';
  email: string = '';
  token = localStorage.getItem('token');
  user = JSON.parse(localStorage.getItem('user') || '{}');
  errorMessage: string = '';

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Assign user data to form fields
    this.name = this.user.name;
    this.email = this.user.email;
  }

  updateUser(): void {
    this.apollo
      .mutate({
        mutation: gql`
          mutation UpdateUser($token: String, $id: ID, $name: String, $email: String) {
            updateUser(token: $token, id: $id, name: $name, email: $email)
          }
        `,
        variables: {
          token: this.token,
          id: this.user._id,
          name: this.name,
          email: this.email,
        },
      })
      .subscribe(({ data, errors }) => {
        if (errors) {
          // Handle GraphQL errors
          console.error('GraphQL errors:', errors);
          this.errorMessage = 'Failed to update user. Please try again.';
        } else {
          console.log('User updated successfully:', data);
          this.user.name = this.name;
          this.user.email = this.email;
          localStorage.setItem('user', JSON.stringify(this.user));
          // Redirect or show success message
          this.router.navigate(['/profile']);
        }
      }, (error) => {
        // Handle network errors
        console.error('Network error:', error);
        this.errorMessage = 'Network error occurred. Please try again later.';
      });
  }
}
