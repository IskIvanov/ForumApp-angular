import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private readonly postService: PostService) {}

  ngOnInit() {}


 // To Do AFTTER !;

  // createPost(title: string, content: string) {
  //   const post = { title, content };
  //   this.postService.createPost(post).subscribe(
  //     () => {
  //       // this.notificator.success(`Successful registration!`);
  //       // this.router.navigate(['/login']);
  //     },
  //     () => {
  //       // this.notificator.error('Registration failed!');
  //     }
  //   );
  // }
}
