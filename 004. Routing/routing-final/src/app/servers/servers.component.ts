import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
  standalone: false
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, private router: Router) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  reloadPage(){
    // Some computation
    console.log("Reloading the page")

    // Using a Relative path
    // this.router.navigate(['servers'], {relativeTo: this.activatedRoute})

    // Without relativeTo property, router.navigate will always use absolute path, no matter if we provide a relative or absolute path to it
    this.router.navigate(['servers'])
  }

}
