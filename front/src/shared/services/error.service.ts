import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from './../components/modal-error/modal-confirm.component';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    constructor(private dialog: MatDialog, private location: Location, ) { }
    
    public showError(err): any {
        console.log(err)
        return this.dialog.open(ModalConfirmComponent, {
            data: {
                error: err
            }
        });
    }
}
