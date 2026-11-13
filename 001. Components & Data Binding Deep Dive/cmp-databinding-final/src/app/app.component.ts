import { Component, ViewEncapsulation } from '@angular/core';
import { Element } from './Element.model';
import { InputformComponent } from './inputform/inputform.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [InputformComponent, ServerElementComponent, GameControlComponent, OddComponent, EvenComponent],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  serverElements: Element[] = [new Element('server', 'TestServer', 'Content of Test Server 1')];

  gameValues: number[] = [];

  showGameControls: boolean = false;

  onShowGameControlsClick() {
    this.showGameControls = !this.showGameControls;
  }

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


  onGameStarted(data: number) {
    this.gameValues.push(data);
  }
}
