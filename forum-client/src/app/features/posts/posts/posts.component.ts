import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/common/interfaces/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postSubscribtion: Subscription;
  posts: { posts: Post[] };

  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);

      this.posts = data.posts;
    });
  }
}
