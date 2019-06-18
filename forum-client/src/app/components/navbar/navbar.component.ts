import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  public loggedIn: boolean;
  @Input()
  public username: string;

  @Output()
  public emitSearch = new EventEmitter<string>();
  @Output()
  public emitLogout = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() {
  }

  public search(searchedTextValue: string) {
    this.emitSearch.emit(searchedTextValue);
  }

  public triggerLogout() {
    this.emitLogout.emit();
  }
}
