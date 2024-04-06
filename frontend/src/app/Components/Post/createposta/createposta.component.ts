
import { Component,  } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createposta',
  templateUrl: './createposta.component.html',
  styleUrls: ['./createposta.component.css'] // Corrected syntax
})

export class CreatepostaComponent  {

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}
  newPostTitle: string = '';
  newPostBody: string = '';
  createPost(): void {

    let token=localStorage.getItem('token');
    this.apollo.mutate({
      mutation: gql`
        mutation CreatePost($title: String!, $body: String!, $token: String!) {
          createPost(title: $title, body: $body, token: $token)
        }
      `,
      variables: {
        title: this.newPostTitle,
        body: this.newPostBody,
        token: token // Replace with your actual authentication token
      }
    }).subscribe({
      next: (result) => {
        
        // Optionally, you can fetch the posts again to update the list with the new post
      
        // Clear the form fields after successful post creation
        this.newPostTitle = '';
        this.newPostBody = '';

        // Navigate back to the posts list
        this.router.navigate(['/mypost']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        // Handle error appropriately
      }
    });
  }
}
