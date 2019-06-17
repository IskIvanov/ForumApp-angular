import { Component, OnInit, Input } from '@angular/core';
import { Comments } from 'src/app/common/interfaces/comments';

@Component({
  selector: 'app-comments-single-view',
  templateUrl: './comments-single-view.component.html',
  styleUrls: ['./comments-single-view.component.css']
})
export class CommentsSingleViewComponent implements OnInit {

  @Input() 
  comment: Comments;

  constructor() { }

  ngOnInit() {
  }

}
