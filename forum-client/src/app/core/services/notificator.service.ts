import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificatorService {

  constructor(
    private readonly notificator: ToastrService,
  ) { }

  public success(message: string): void {
    this.notificator.success(message);
  }

  public error(message: string): void {
    this.notificator.error(message);
  }

  public warning(message: string): void {
    this.notificator.warning(message);
  }
}
