import { Injectable, WritableSignal, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OTPagesStrategy extends TitleStrategy {
  private title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titleBuild = this.buildTitle(snapshot) ?? 'Over Trust';
    this.title.setTitle(titleBuild);
  }
}
