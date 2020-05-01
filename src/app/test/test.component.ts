import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "scm-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.less"],
})
export class TestComponent implements OnInit {
  constructor() {}

  @Input() data: any;
  @Output() oclick = new EventEmitter<any>();

  @ViewChild("ooo") ooo: TemplateRef<any>;

  ngOnInit() {}

  outClick() {
    alert(1);
    this.oclick.emit({
      data: this.data,
      other: 1,
    });
  }
}
