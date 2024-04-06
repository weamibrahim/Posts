import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateposta',
  templateUrl: './updateposta.component.html',
  styleUrls: ['./updateposta.component.css']
})
export class UpdatepostaComponent implements OnInit {
  Title: string = '';
  Body: string = '';
  postId = this.route.snapshot.paramMap.get('id');
  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    
// console.log(postId)
    this.apollo.watchQuery({
      query: gql`
        query PostGet($postId: ID!) {
          postGet(id: $postId) {
            title
            body
          }
        }
      `,
      variables: {
        postId: this.postId
      }
    }).valueChanges.subscribe((result: any) => {
      const post = result.data.postGet;
      this.Title = post.title;
      this.Body = post.body;
    });
  }

  updatePost(): void {
    let token = localStorage.getItem('token');

    this.apollo.mutate({
      mutation: gql`
        mutation UpdatePost($postId:ID,$title: String!, $body: String!, $token: String!) {
          updatePost(postId:$postId,title: $title, body: $body, token: $token)
        }
      `,
      variables: {
        title: this.Title,
        body: this.Body,
        token: token,
        postId:this.postId
        
      }
    }).subscribe({
      next: (result) => {
        console.log('result', result);
        // Redirect to the post details page or any other appropriate route
        //this.router.navigate(['/post', postId]);
        this.router.navigate(['/mypost']);
      },
      error: (error) => {
        console.error('Error updating post:', error);
        // Handle error appropriately
      }
    });
  }
}
