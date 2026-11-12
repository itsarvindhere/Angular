import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import {LucideAngularModule, MoveLeft, Save, PlusCircle, Trash2, Pencil, RotateCcw, FilePlus2} from 'lucide-angular';
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        AlertComponent
    ],

    imports : [
        CommonModule,
        LucideAngularModule.pick({Save, MoveLeft, PlusCircle, Trash2, Pencil, RotateCcw, FilePlus2})
    ],

    exports: [
        AlertComponent,
        CommonModule,
        LucideAngularModule
    ]
})
export class SharedModule {}