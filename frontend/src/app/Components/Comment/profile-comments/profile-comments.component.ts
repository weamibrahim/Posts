import { Component, OnInit,Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrl: './profile-comments.component.css'
})
export class ProfileCommentsComponent implements OnInit {
  token = localStorage.getItem('token');
  @Input() postId: number | undefined;
  body: any;
  comments  : any[] = [];
  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.fetchComments(); 
    console.log(this.postId)
  }

  fetchComments(): void {
    
    this.apollo
      .watchQuery({
        query: gql`
          query commentsGet($postId: ID!) {
            commentsGet(postId: $postId) {
             _id
              body
            userId{
              name
            }
            }
          }
        `,
        variables: {
          postId: this.postId 
          // Pass postId as a variable
        }
      })
      .valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        this.comments = result.data.commentsGet;
        console.log(this.comments);
      });
  }
  createComment(): void {
    // Perform mutation to create a new comment
    this.apollo.mutate({
      mutation: gql`
        mutation createComment($body: String!, $postId: ID! ,$token: String!) {
          createComment(body: $body, postId: $postId, token: $token) 
        }
      `,
      variables: {
        body: this.body,
        postId: this.postId
        ,token: this.token
      }
    }).subscribe((result: any) => {
      // After successful creation, add the new comment to the list
      
      // Clear the input field
      this.body = '';
    });
  }

  deleteComment(commentId: string): void {
    // Perform mutation to delete an existing comment
    this.apollo.mutate({
      mutation: gql`
        mutation deleteComment($commentId: ID!, $token: String!) {
          deleteComment(commentId: $commentId, token: $token)
        }
      `,
      variables: {
        commentId
        ,token: this.token
      }
    }).subscribe({
      next: (result) => {
        console.log( result);
        // Update the posts list after deletion
        
      },
      error: (error) => {
        console.error('Error deleting post:', error);
        // Handle error appropriately
      }
    });
  }

}

