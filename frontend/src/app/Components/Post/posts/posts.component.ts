import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  token: string | null = localStorage.getItem('token');

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    if (!this.token) {
      console.error('No token found.');
      return;
    }
    this.fetchPosts();
    console.log(this.token);
  }

  fetchPosts(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query postsGet($token: String!) {
            postsGet(token: $token) {
              _id
              title
              body
              userId{
                name
              }
            }
          }
        `,
        variables: {
          token: this.token
        }
      })
      .valueChanges.subscribe({
        next: (result: ApolloQueryResult<any>) => {
          console.log("alldata", result.data.postsGet);
          this.posts = result.data.postsGet;
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      });
  }
}
