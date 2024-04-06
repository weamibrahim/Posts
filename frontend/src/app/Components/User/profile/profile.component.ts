import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user')|| '{}');
  
  ngOnInit(): void {
      console.log(this.user);
  }
}
