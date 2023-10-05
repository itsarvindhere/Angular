import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from 'src/app/canDeactivateComponent';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateComponent {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  allowEdit = false;
  fragment = '';

  // Whether the user saved the changes made or not
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    
    this.titleService.setTitle(this.route.snapshot.data.title)

    this.route.params.subscribe(params => {
      this.server = this.serversService.getServer(+params.id);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
    
    // Accessing Query Parameters using snapshot object
    // this.allowEdit = this.route.snapshot.queryParams.allowEdit;

    // Accessing Fragments using snapshot object
    // this.fragment = this.route.snapshot.fragment;

    // Accesing Query Parameters using "queryParams" observable
    // this.route.queryParams.subscribe(params => {
    //   this.allowEdit = params.allowEdit;
    // })

    // Accesing Query Parameters using "queryParamMap" observable
    this.route.queryParamMap.subscribe(params => {
      this.allowEdit = params.get('allowEdit') === '1';
    })

    // Accesing Fragment using "fragment" observable
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});

    // Set changesSaved to True
    this.changesSaved = true;

    // Navigate back to the previous page
    this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }


  // On leaving the page
  onExit() {

    // If the user is not allowed to edit the server at all, return true
    if (!this.allowEdit) return true

    // If any of the values are changes in the input fields but the changes are not saved
    if ((this.serverName != this.server.name || this.serverStatus != this.server.status) && !this.changesSaved) {
      if(confirm("Are you sure you want to leave?"))  {
        return true;
      } else{
        return false;
      }
    }

    return true;
  }

}
