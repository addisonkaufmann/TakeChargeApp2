import { Input } from '@angular/core';


export class Event {	

	@Input()
	public title: string = "";

	@Input()
	public details: string = "";

	@Input()
	public type: string = "";

	public readonly typeChoices = ["Food", "Medication", "Seizure", "Other"];

	public date: Date;

	public prepare(): void {
	}

	constructor(
	) { }

}