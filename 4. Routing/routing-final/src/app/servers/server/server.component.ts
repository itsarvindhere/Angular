import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.route.snapshot.data.title)
    this.route.params.subscribe(params => {
      this.server = this.serversService.getServer(+params.id);
    });
  }

}
