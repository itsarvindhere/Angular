import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.route.snapshot.data.title)
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
