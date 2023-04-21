import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'my-app';

    constructor(private contexts: ChildrenOutletContexts,
      public translate: TranslateService
      ) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    getRouteAnimationData() {
      return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }

    useLanguage(language: string): void {
      this.translate.use(language);
  }
}
