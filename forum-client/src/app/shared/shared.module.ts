import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbModule, HttpClientModule, RouterModule],
  exports: [CommonModule, NgbModule, RouterModule]
})
export class SharedModule {}
