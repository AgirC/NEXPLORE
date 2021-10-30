import { Component } from '@angular/core';
import { DutyService } from "../../services/duty.service";
import { Duty } from "../../models/duty.model";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DutyDialog } from "../../components/dutyDialog/dialogDuty";
import { ErrorService } from "../../services/error.service";


@Component({
  selector: 'page-duties',
  templateUrl: './duties.html',
  styleUrls: ['./duties.less']
})
export class Duties {

  //List of duties
  duties: Duty[];
  //var for showing the spinner
  spinner: boolean = false;

  constructor(
    private dutyServ: DutyService,
    private dialog: MatDialog,
    private errorSrv: ErrorService
  ) { }

  /**
   * We use the life cicle of Angular to initialize the data.
   * In the ngOnInit we get the duties 
   */
  ngOnInit(): void {
    this.initDuties();
  }

  /**
   * initDuties() call the service for getting the duties from back
   */
  initDuties(): void {
    //start the spinner
    this.spinner = true;

    //call service
    this.dutyServ.getDuties().subscribe((duties) => {
      //init the var duties
      this.duties = duties;
      //stop the spinner
      this.spinner = false;
    },
      (err) => {
        this.errorSrv.showError(err);
        //stop the spinner
        this.spinner = false;
      });

  }

  /**
   * This method is used for open the dialog. When id is provided we open in edit mode, if not we open create mode
   * @param id id of the duty to edit
   */
  openDialog(id?: string): void {
    //inicialice the title for the dialog
    let title = '';
    if (id) {
      const duty = this.dutyServ.getDuty(id);
      title = duty.name;
    }

    //init the config for dialog
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    //init the data of dialog
    dialogConfig.data = {
      title: title
    };

    //open dialog
    const dialogRef = this.dialog.open(DutyDialog, dialogConfig);

    //when dialog close if there is id we update, if not we create
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (id) {
          this.updateDuty(id, data.name);
        } else {
          this.createDuty(data.name);
        }
      },
      (err) => {
        this.errorSrv.showError(err);
      }
    );
  }

  /**
   * Method to create a new duty
   * @param name the name of the duty
   */
  createDuty(name: string): void {
    //start the spinner
    this.spinner = true;

    this.dutyServ.createDuty(name).subscribe((data) => {
      this.spinner = false;
      //when duty is created we init the list again
      this.initDuties();
    },
      (err) => {
        this.errorSrv.showError(err);
        this.spinner = false;

      });

  }

  /**
   * Method to delete a duty
   * @param id id of the duty to delete
   */
  deleteDuty(id: string): void {
    //start the spinner
    this.spinner = true;

    this.dutyServ.deleteDuty(id).subscribe((data) => {
      this.spinner = false;
      //when duty is deleted we init the list again
      this.initDuties();
    },
      (err) => {
        this.errorSrv.showError(err);
        this.spinner = false;

      });
  }

  /**
   * method to update a duty
   * @param id id of the duty
   * @param name name to update
   */
  updateDuty(id: string, name: string): void {
    //start the spinner
    this.spinner = true;

    this.dutyServ.updateDuty(id, name).subscribe((data) => {
      this.spinner = false;
      //when duty is deleted we init the list again
      this.initDuties();
    },
      (err) => {
        this.errorSrv.showError(err);
        this.spinner = false;
      });
  }
}

