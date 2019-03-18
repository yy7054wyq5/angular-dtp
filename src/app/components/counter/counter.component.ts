import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectsService } from '../../services/behavior-subjects.service';

@Component({
  selector: 'scm-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent implements OnInit {

  constructor(private counter: BehaviorSubjectsService) { }

  currentCount: number;
  subscription;

  ngOnInit(): void {
    this.subscription = this.counter.getCount().subscribe(
      res => {
        this.currentCount = res.value;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  increment(): void {
    this.counter.setCount(this.currentCount, 1);
  }

  decrement(): void {
    this.counter.setCount(this.currentCount, -1);
  }

  reset(): void {
    this.counter.resetCount();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
