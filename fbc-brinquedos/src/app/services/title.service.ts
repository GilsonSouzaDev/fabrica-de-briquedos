import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {

  mainTitle = new BehaviorSubject<string>('');
  subTitle = new BehaviorSubject<string>('');

  setMainTitle(title: string) {
    this.mainTitle.next(title);
  }

  setSubTitle(title: string) {
    this.subTitle.next(title);
  }
}
