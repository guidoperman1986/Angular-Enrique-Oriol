import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{

  @Input() init: number = null;
  @Output() onDecrease: EventEmitter<number> = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  public counter:number = 0;
  private countdownTimeRef: any = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.startCountdown = changes.init.currentValue;
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(){
    if(this.init && this.init > 0){
      this.clearTimeout();
      this.counter = this.init;
      this.processCountdown();
    }
  }

  doCountdown(){
    this.countdownTimeRef = setTimeout(()=> {
      this.counter-= 1;
      this.processCountdown();
    },1000);
  }

  private clearTimeout(){
    if (this.countdownTimeRef){
      clearTimeout(this.countdownTimeRef);
      this.countdownTimeRef = null;
    }
  }

  processCountdown() {
    //emit event
    this.onDecrease.emit(this.counter);
    console.log('counter is ', this.counter);

    if (this.counter === 0){
      this.onComplete.emit();
    } else {
      this.doCountdown();
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

}
