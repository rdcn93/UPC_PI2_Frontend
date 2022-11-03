
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventTypes } from '../models/shared/event-types';
import { ToastEvent } from '../models/shared/toast-event';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showSuccessToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Success,
    });
  }
}