import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate(400)
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
  ],
})
export class AnimationsComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
