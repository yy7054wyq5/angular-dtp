import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

function rnd(seed) {
  seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?
  return seed / 233280.0;
}

function rand(number) {
  const today = new Date();
  const seed = today.getTime();
  return Math.ceil(rnd(seed) * number);
}

class Item {
  width: string;
  height: string;
  name: number;

  size = 20;

  constructor(w,h){
    this.name = rand(w+h+rand(111));
    this.width = w * this.size + 'px';
    this.height = h * this.size + 'px';
  }
}

@Component({
  selector: 'scm-cdk-index',
  templateUrl: './cdk-index.component.html',
  styleUrls: ['./cdk-index.component.less']
})
export class CdkIndexComponent implements OnInit {

  data = [];
  data1 = [];

  constructor() { 
    this.data = ((n)=> {
      const arr = [];
      for (let index = 0; index < n; index++) {
        arr.push(new Item(index+1, index + 2));
      }
      return arr;
    })(10);
  }

  ngOnInit() {
  }

  
  UI_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
}
