import { Component, OnInit, forwardRef, Input, AfterViewInit, HostListener, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { I18nService } from '@am/i18n';
// import { formatDateWithTimezone } from '@am/utils';
import { parse, format } from 'date-fns';

export class DateObject {
  years: number = null;
  months: number = null;
  days: number = null;
}

export class TimeObject {
  hours: number = null;
  minutes: number = null;
  seconds: number = null;
}

const newArray = (start: number, end: number): Array<number> => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

@Component({
  selector: 'scm-time-range-picker',
  templateUrl: './time-range-picker.component.html',
  styleUrls: ['./time-range-picker.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeRangePickerComponent),
      multi: true,
    },
  ],
})
export class TimeRangePickerComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  startTime: Date = null;
  endTime: Date = null;

  @Input()
  placeHolders: Array<string> = ['dateTime.start', 'dateTime.end'];
  @Input()
  formatBackFillWithTimezone = true;

  @HostListener('click', ['$event'])
  onClick(e) {
    // console.log('触发');
    this.disabeldStartHours = () => {
      return this._disabeldStartHours();
    };
    this.disabeldStartMinutes = hours => {
      return this._disabeldStartMinutes(hours);
    };

    // console.log('改变结束可选时间段');
    this.disabeldEndHours = () => {
      return this._disabeldEndHours();
    };
    this.disabeldEndMinutes = hours => {
      return this._disabeldEndMinutes(hours);
    };
  }

  //////////////////////////////////////////////////////

  constructor(private e: ElementRef, private render: Renderer2) {}

  /**
   * 值回填
   *
   */
  writeValue(value: any) {
    if (value) {
      let tmp: any;
      if (Array.isArray(value)) {
        tmp = value;
      } else if (typeof value === 'string') {
        tmp = value.split(',');
      }
      this.startTime = this.formatValue(tmp[0]);
      this.endTime = this.formatValue(tmp[1]);
    }
  }

  propagateChange = (_: Array<string>) => {};

  propagateTouched = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  ngOnDestroy() {}

  ////////////////////////////////////////////

  private clearInput(idx: number) {
    setTimeout(() => {
      const $self: Element = this.e.nativeElement;
      const $nzTimePickers = $self.querySelectorAll('nz-time-picker');
      $nzTimePickers.item(idx).querySelector('input').value = null;
    }, 100);
  }

  /**
   * 转时区
   *
   */
  private formatValue(value: string): Date {
    if (value) {
      const now = new Date();
      const nowDateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      value = nowDateStr + ' ' + value;
      // if (this.formatBackFillWithTimezone) {
      //   value = formatDateWithTimezone(value);
      // }
      return parse(value);
    }
    return null;
  }

  /**
   * 返回时分秒
   *
   */
  private backHMS(time: Date): TimeObject {
    if (!time) {
      return new TimeObject();
    }
    const tmp = new TimeObject();
    tmp.hours = time.getHours();
    tmp.minutes = time.getMinutes();
    tmp.seconds = time.getSeconds();
    return tmp;
  }

  timeChange(start: Date, end: Date) {
    const tmp = ['', ''];
    // console.log(start, end);
    if (start) {
      tmp[0] = format(start, 'HH:mm:ss');
    } else {
      this.startTime = null;
    }
    if (end) {
      tmp[1] = format(end, 'HH:mm:ss');
    } else {
      this.endTime = null;
    }
    // console.log(this.startTime, this.endTime, tmp);
    this.propagateChange(tmp);
  }

  //////////////

  private _disabeldStartHours(): Array<number> {
    const end = this.backHMS(this.endTime).hours;
    return end ? newArray(end + 1, 24) : [];
  }

  private _disabeldEndHours(): Array<number> {
    const start = this.backHMS(this.startTime).hours;
    return start ? newArray(0, start) : [];
  }

  // prettier-ignore
  disabeldStartHours = (): Array<number> => {
    return this._disabeldStartHours();
  }

  // prettier-ignore
  disabeldEndHours = (): Array<number> => {
    return this._disabeldEndHours();
  }

  //////////////

  private _disabeldStartMinutes(startHours): Array<number> {
    startHours = startHours || this.backHMS(this.startTime).hours;
    const end = this.backHMS(this.endTime);
    if (end && startHours === end.hours) {
      return newArray(end.minutes + 1, 60);
    }
    return [];
  }

  private _disabeldEndMinutes(endHours): Array<number> {
    endHours = endHours || this.backHMS(this.endTime).hours;
    // console.log(this.startTime, endHours);
    const start = this.backHMS(this.startTime);
    if (start && endHours === start.hours) {
      return newArray(0, start.minutes);
    }
    return [];
  }

  // prettier-ignore
  disabeldStartMinutes = (hours): Array<number> => {
    return this._disabeldStartMinutes(hours);
  }

  // prettier-ignore
  disabeldEndMinutes = (hours): Array<number> => {
    return this._disabeldEndMinutes(hours);
  }
}

