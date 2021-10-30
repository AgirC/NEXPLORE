import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'dialog-duty',
    templateUrl: 'dialogDuty.html',
})
export class DutyDialog {

    form: FormGroup;
    name: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DutyDialog>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.name = data.title;
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: [this.name, []],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}