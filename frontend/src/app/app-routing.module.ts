import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './Components/Post/posts/posts.component'; 
import { PostdetailsComponent } from './Components/Post/postdetails/postdetails.component';
import { CreatepostaComponent } from './Components/Post/createposta/createposta.component';
import { UpdatepostaComponent } from './Components/Post/updateposta/updateposta.component';
import {LoginComponent} from './Components/User/login/login.component';
import {RegsisterComponent} from './Components/User/regsister/regsister.component';
import { MyPostComponent } from './Components/Post/my-post/my-post.component';
import { AuthGuardService as AuthGuard} from './Services/auth-guard.service';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { UpdateprofileComponent} from './Components/User/updateprofile/updateprofile.component';
const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'postdetails/:id', component: PostdetailsComponent },
  { path: 'createpost', component: CreatepostaComponent, canActivate: [AuthGuard] }, // Apply the AuthGuard here
  { path: 'updatepost/:id', component: UpdatepostaComponent, canActivate: [AuthGuard] }, // Apply the AuthGuard here
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegsisterComponent },
  { path: 'mypost', component: MyPostComponent, canActivate: [AuthGuard] } ,// Apply the AuthGuard here
  {path:'profile',component:ProfileComponent},
 {path :'updateProfile',component:UpdateprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
