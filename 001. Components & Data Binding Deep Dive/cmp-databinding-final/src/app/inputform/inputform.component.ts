import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.css'],
  standalone: false
})
export class InputformComponent implements OnInit, OnChanges{

  // EVENTS that we need to emit from this component
  @Output('someXyzName')
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output()
  blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();
  // newName = '';
  // newContent = '';

  @ViewChild('serverContentInput')
  serverContentInput;

  ngOnChanges() {
    console.log("This will not run even once since there are no @Input properties")
  }

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverNameInput) {
    this.serverCreated.emit({serverName: serverNameInput.value, serverContent: this.serverContentInput.nativeElement.value})
  }

  onAddBlueprint(serverNameInput) {
    this.blueprintCreated.emit({blueprintName: serverNameInput.value, blueprintContent: this.serverContentInput.nativeElement.value})
  }
}
