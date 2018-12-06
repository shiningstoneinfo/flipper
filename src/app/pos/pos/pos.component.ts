import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Settings } from '../../common/core/config/settings.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit,AfterViewInit {

  public appearance;
  /**
     * Controls left column visibility.
     */
    public leftColumnIsHidden = false;
    isMobile=false;
  constructor(public setting:Settings,private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {

  }

ngAfterViewInit() {
  this.changeDetectionRef.detectChanges();
}

}
