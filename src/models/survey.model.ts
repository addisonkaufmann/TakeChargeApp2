import { Input } from '@angular/core';


export class Survey {	

	@Input()
	public mood: number = 4;

	@Input()
	public sleepTime: number = 8;

	@Input()
	public sleepQuality: number = 4;

	@Input()
	public social: number = 4;

	public moodDisplay: string;
	public sleepQualityDisplay: string;
	public socialDisplay: string;

	public readonly moodStrings = ['Very Bad', 'Bad', 'Not So Good', 'Fine', 'Good', 'Very Good', 'Great'];
	public readonly sleepStrings = ['Very Bad', 'Bad', 'Not So Good', 'Fine', 'Good', 'Very Good', 'Great'];
	public readonly socialStrings = ['Very Bad', 'Bad', 'Not So Good', 'Fine', 'Good', 'Very Good', 'Great'];

	public date: Date;
	public dateISO: any;

	public prepare(): void {
		this.moodDisplay = this.moodStrings[this.mood - 1];
		this.sleepQualityDisplay = this.sleepStrings[this.sleepQuality - 1];
		this.socialDisplay = this.socialStrings[this.social - 1];
		this.date = new Date();
		this.dateISO = this.date.toISOString();
	}

	constructor(
	) { }

}