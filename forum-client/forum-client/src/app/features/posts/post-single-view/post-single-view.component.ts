import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/common/interfaces/post';

@Component({
  selector: 'app-post-single-view',
  templateUrl: './post-single-view.component.html',
  styleUrls: ['./post-single-view.component.css']
})
export class PostSingleViewComponent implements OnInit {
  @Input()
  post: Post;

  @Output()
  public emitPostId = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public getPostId(event) {
    console.log(event.srcElement.attributes.id);
    //return this.emitPostId.emit(event);
      /* let target = event.target || event.srcElement || event.currentTarget;
      let idAttr = target.attributes.id;
      let value = idAttr.nodeValue;
      console.log(value); */
      
  }
}
