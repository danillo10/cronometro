import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.page.html',
  styleUrls: ['./cronometro.page.scss'],
})
export class CronometroPage implements OnInit {
  public timer: any;
  public displayTime: string;
  public isRunning: boolean;
  public startTime: number;
  public time: {
    hours: string;
    minutes: string;
    seconds: string;
    millis: string;
  };

  constructor() {
    this.displayTime = '00:00:00.000';
    this.isRunning = false;
    this.startTime = 0;
    this.time = { hours: '00', minutes: '00', seconds: '00', millis: '000' };
  }

  ngOnInit() {}

  startTimer() {
    this.startTime = this.isRunning
      ? this.startTime
      : Date.now() - (this.startTime || 0);
    this.timer = setInterval(() => {
      this.time = this.getSecondsAsDigitalClock(Date.now() - this.startTime);
    }, 1);
    this.isRunning = true;
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.startTime = Date.now() - this.startTime;
    this.isRunning = false;
  }

  stopTimer() {
    clearInterval(this.timer);
    this.time = { hours: '00', minutes: '00', seconds: '00', millis: '000' };
    this.isRunning = false;
    this.startTime = 0;
  }

  getSecondsAsDigitalClock(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const millis = Math.floor(milliseconds % 1000);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      millis: millis.toString().padStart(3, '0'),
    };
  }
}
