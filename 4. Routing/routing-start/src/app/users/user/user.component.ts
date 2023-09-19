import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Active Route", this.route)
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
    this.paramsSubscription = this.route.paramMap.subscribe( {
      next: data => {
        console.log("Subscription Returned data", data)
        let id  = Number(data.get('id'));
        let name = data.get('name');

        this.user = {
          id,
          name
        }
      }
    })

    
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
