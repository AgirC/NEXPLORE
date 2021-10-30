import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Duty } from "../models/duty.model";
import { GET_DUTIES, CREATE_DUTY, UPDATE_DUTY, DELETE_DUTY } from "../constants/queries";
import { Apollo } from "apollo-angular";

@Injectable({
    providedIn: 'root',
})
export class DutyService {
    private duties: Duty[] = [];

    constructor(private apollo: Apollo) { }

    /**
     * This method returns the complete list of dutys
     * @returns an Observable of Duty[] with all the dutys of trafficMeister
     */
    getDuties(): Observable<Duty[]> {
        return this.apollo
            .query<any>({
                query: GET_DUTIES
            }).pipe(map(res => {
                console.log(res);
                this.duties = res.data.duties.map(element => {
                    return {
                        id: element.id,
                        name: element.name
                    }
                })
                return this.duties
            }))
    }

    /**
     * This method get the duty with the id provided
     * @param id the id of the duty to return
     * @returns the duty with the id provided
     */
    getDuty(id: string): Duty {
        return this.duties.filter((duty) => {
            return duty.id === id;
        })[0];
    }

    /**
     * method to create a duty
     * @param name name of the duty to create
     * @returns an observable of the method create
     */
    createDuty(name: string): Observable<any> {
        return this.apollo.mutate({
            mutation: CREATE_DUTY,
            variables: {
                name: name
            },
        });
    }

    /**
     * method to update a duty
     * @param id id of the duty to update
     * @param name new name for the duty
     * @returns an observable of the method
     */
    updateDuty(id: string, name: string): Observable<any> {
        return this.apollo.mutate({
            mutation: UPDATE_DUTY,
            variables: {
                id: id,
                name: name
            },
        });
    }

    /**
     * method to delete a duty
     * @param id id of the duty to delete
     * @returns an observable of the method
     */
    deleteDuty(id: string): Observable<any> {
        return this.apollo.mutate({
            mutation: DELETE_DUTY,
            variables: {
                id: id
            },
        });
    }


}