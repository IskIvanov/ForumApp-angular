import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/common/interfaces/post';
import { PostService } from 'src/app/core/services/post.service';



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


  mArticles: Array<any>;
  mSources: Array<any>;

  constructor(private posts: PostService) { }

  ngOnInit() {

    //load articles
    this.posts.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.posts.getAllPosts().subscribe(data => this.mSources = data['sources']);
  }


  searchArticles(source) {
    console.log("selected source is: " + source);
    this.posts.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }





}

  // public getPostId(event) {
  //   console.log(event.srcElement.attributes.id);


      


    //return this.emitPostId.emit(event);

    
/* let target = event.target || event.srcElement || event.currentTarget;
let idAttr = target.attributes.id;
let value = idAttr.nodeValue;
console.log(value); */

//   }
// }
