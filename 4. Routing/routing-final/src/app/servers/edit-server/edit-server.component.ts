import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  allowEdit = false;
  fragment = '';

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {

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
  }

}
