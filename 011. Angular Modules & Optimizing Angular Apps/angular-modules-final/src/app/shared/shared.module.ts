import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { BrowserModule } from "@angular/platform-browser";
import {LucideAngularModule, MoveLeft, Save, PlusCircle, Trash2, Pencil, RotateCcw, FilePlus2} from 'lucide-angular';


@NgModule({
    declarations: [
        AlertComponent
    ],

    imports : [
        BrowserModule,
        LucideAngularModule.pick({Save, MoveLeft, PlusCircle, Trash2, Pencil, RotateCcw, FilePlus2})
    ],

    exports: [
        AlertComponent,
        BrowserModule,
        LucideAngularModule
    ]
})
export class SharedModule {}