import { Component, ViewEncapsulation } from '@angular/core';
import { Element } from './Element.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  serverElements: Element[] = [new Element('server', 'TestServer', 'Content of Test Server 1')];

    gameValues: Number[] = [];



  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {blueprintName: string, blueprintContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.blueprintName,
      content: blueprintData.blueprintContent
    });
  }


  onGameStarted(data: Number) {
    this.gameValues.push(data);
  }
}
