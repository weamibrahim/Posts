import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './Components/Post/posts/posts.component';
import { PostdetailsComponent } from './Components/Post/postdetails/postdetails.component';
import { CreatepostaComponent } from './Components/Post/createposta/createposta.component';
import { UpdatepostaComponent } from './Components/Post/updateposta/updateposta.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { LoginComponent } from './Components/User/login/login.component';
import { RegsisterComponent } from './Components/User/regsister/regsister.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { UpdateprofileComponent } from './Components/User/updateprofile/updateprofile.component';
import { MyPostComponent } from './Components/Post/my-post/my-post.component';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './Components/Comment/comments/comments.component';
import { ProfileCommentsComponent } from './Components/Comment/profile-comments/profile-comments.component';
import { AuthService } from './Services/auth.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';




@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostdetailsComponent,
    CreatepostaComponent,
    UpdatepostaComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegsisterComponent,
    ProfileComponent,
    UpdateprofileComponent,
    MyPostComponent,
    CommentsComponent,
    ProfileCommentsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule
    ,CommonModule,
    LazyLoadImageModule

  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
