import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  // you can add more attributes like button, div...
  // selector: '[appHighlight]',
  selector: 'button[appHighlight] ',

  standalone: true
})
export class HighlightDirective {


@HostBinding('style.background-color')

backgroundColor: string = 'yellow';

@HostListener('click', ['$event.target'])
onClick() {
  this.backgroundColor = this.backgroundColor === 'yellow' ? 'blue' : 'yellow'
  console.log('button clicked');
}


  constructor() { }

}
