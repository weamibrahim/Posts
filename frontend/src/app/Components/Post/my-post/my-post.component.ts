import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrl: './my-post.component.css'
})
export class MyPostComponent implements OnInit {

  loading: boolean = false;
  userId = JSON.parse(localStorage.getItem('user') || '{}');
  

  myposts: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    console.log('User ID:', this.userId._id); 
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading = true;
    this.apollo
      .watchQuery({
        query: gql`
          query GetPostsByUserId($userId: ID!) {
            postsGetByUserId(id: $userId) {
              _id
              title
              body
              
            }
          }
        `,
        variables: {
          userId: this.userId._id
        }
      })
      .valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        this.myposts = result.data.postsGetByUserId;
        this.loading= false;
        console.log(this.myposts);
      });
  }
  



  deletePost(postId: string): void {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
 console.log(token)
    if (!token) {
      console.error('Token not found in localStorage');
      return; // Handle the absence of token appropriately
    }
  
      this.apollo.mutate({
        mutation: gql`
          mutation deletePost($token: String,$postId: ID!) {
            deletePost(token: $token, postId: $postId)
          }
        `,
        variables: {
          token: token,
          postId: postId
        }
      }).subscribe({
        next: (result) => {
          console.log( result);
          // Update the posts list after deletion
          this.fetchPosts();
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          // Handle error appropriately
        }
      });
    
  }
}


