import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

// const enterTransition = transition(':enter', [
//   style({
//     opacity: 0
//   }),
//   animate('0.5s ease-in', style({
//     opacity: 1
//   }))
// ]);

// const leaveTransition = transition(':leave', [
//   style({
//     opacity: 1
//   }),
//   animate('0.5s ease-out', style({
//     opacity: 0
//   }))
// ]);


// const fadeIn = trigger('fadeIn', [enterTransition]);
// const fadeOut = trigger('fadeOut', [leaveTransition]);

// USING STATE
const fadeInOut = trigger('fadeInOut', [
  state('open', style({
    opacity: 1,
  })),

  state('close', style({
    opacity: 0,
  })),

  transition('open => close', [
    animate('1s ease-out')
  ]),

  transition('close => open', [
    animate('1s ease-in')
  ]),

]);

// List Item
// const listItem = trigger('listItem', [

//   transition(':enter', [
//     style({
//       opacity: 0,
//       transform: 'translateX(-100px)'
//     }),
//     animate("0.1s ease-in", style({
//       opacity: 1,
//       transform: 'translateX(0)'
//     }),)
//   ]),

//   transition(':leave', [
//     animate("0.1s ease-out", style({
//       opacity: 0,
//       transform: 'translateX(100px)'
//     }),)
//   ])
// ])

// USING KEYFRAMES
const listItem = trigger('listItem', [

  transition(':enter', [
    animate("4s ease-in", keyframes([
      style({
        opacity: 0,
        transform: 'translateX(-100px)',
        offset: 0
      }),

      style({
        transform: 'translateY(-50px)',
        opacity: 0.5,
        offset: 0.5
      }),

      style({
        transform: 'translateY(50px)',
        opacity: 1,
        offset: 0.9
      }),

      style({
        transform: 'translateX(0)',
        offset: 1
      })
    ]))
  ]),

  transition(':leave', [
    group([
      animate("0.5s ease-in", style({
        color: 'red'
      }),),
      animate("1s ease-out", style({
        opacity: 0,
        transform: 'translateX(100px)'
      }))
    ])
  ])
])

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [fadeInOut, listItem]
    // animations: [fadeIn,fadeOut]
    ,
    standalone: false
})
export class AppComponent {

  isShown: boolean = false;
  items: string[] = [];

  fadeInOut() {
    this.isShown = !this.isShown;
  }

  onAnimationStart(event: any) {
    console.log("Animation started", event)
  }

  onAnimationEnd(event: any) {
    console.log("Animation Ended", event)
  }

  addItem(name: string) {
    this.items.push(name);
  }

  deleteItem(index: number) {
    this.items.splice(index, 1)
  }
}

