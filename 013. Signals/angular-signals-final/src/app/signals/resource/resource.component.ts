import { Component, computed, inject, resource, signal } from '@angular/core';
import { DataService } from '../data.service';
import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-resource',
  imports: [JsonPipe],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.css',
})
export class ResourceComponent {
  dataService = inject(DataService);

  userId = signal(1);

  // A resource
  // usersResource = resource({
  //   // The params value recomputes whenever any read signals change.
  //   params: () => ({id: this.userId()}),

  //   // Whenever the params value changes, the loader function is called to fetch new data.
  //   loader: ({params}) => this.dataService.fetchUser(params)
  // });

  // HttpResource
  usersHttpResource = httpResource(() => `https://jsonplaceholder.typicode.com/users/${this.userId()}`);

  // A computed signal that derives its value from the resource's state.
  userData = computed(() => {
    if (this.usersHttpResource.hasValue()) {
      return this.usersHttpResource.value();
    }
    return undefined;
  });

}

  
