import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            name: [this.name, Validators.required],
        });
    }

    save() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    close() {
        this.dialogRef.close();
    }

}