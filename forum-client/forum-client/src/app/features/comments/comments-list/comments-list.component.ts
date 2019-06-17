import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';


@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  constructor(private readonly commentService: CommentService) { }

  ngOnInit() {
  }

  /* getComments() {
    this.commentService.getAllComments();
  } */

  getPostId(event: any) {
    console.log(event);
  }

}
