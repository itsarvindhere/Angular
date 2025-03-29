import { Component, input, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: false
})
export class UserComponent implements OnInit, OnDestroy {
  // user: {id: number, name: string};
  // paramsSubscription: Subscription;

  // @Input({required: true}) id: number;
  // @Input({required: true}) name: string;

  id = input.required<number>();
  name = input.required<string>();

  constructor() { }

  ngOnInit() {
    // let id  = this.route.snapshot.params['id'];
    // let name = this.route.snapshot.params['name'];

    // this.user = {
    //   id,
    //   name
    // }

    // Using "params" observable
    // this.route.params.subscribe( {
    //   next: data => {
    //     let id  = data['id'];
    //     let name = data['name'];

    //     this.user = {
    //       id,
    //       name
    //     }
    //   }
    // })

    // Using "paramMap" observable
    // this.paramsSubscription = this.route.paramMap.subscribe( {
    //   next: data => {
    //     console.log("Subscription Returned data", data)
    //     let id  = Number(data.get('id'));
    //     let name = data.get('name');

    //     this.user = {
    //       id,
    //       name
    //     }
    //   }
    // })

    
  }

  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }

}
