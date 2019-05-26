import {
  Directive,
  ElementRef,
  OnInit,
  Renderer,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appIframeTracker]'
})

export class IframeTrackerDirective implements OnInit {
  private iframeMouseOver: boolean;

  @Input() debug: boolean;

  @Output() iframeClick = new EventEmitter<ElementRef>();

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit(): void {
    this.debug = true;
    this.renderer.listen(window, 'blur', () => this.onWindowBlur());
  }

  @HostListener('mouseover')
  private onIframeMouseOver() {
    this.log('Iframe mouse over');
    this.iframeMouseOver = true;
    this.resetFocusOnWindow();
  }
   
  //@HostListener('mouseup')
  //private onIframeMouseUp() {
  //  this.log('Iframe mouse up');

  //}

  @HostListener('click') onClick() {

    window.alert('Host Element Clicked');

  }

  @HostListener('mouseout')
  private onIframeMouseOut() {
    this.log('Iframe mouse out');
    this.iframeMouseOver = false;
    this.resetFocusOnWindow();
  }
   
  private onWindowBlur() {
    if (this.iframeMouseOver) {
     
      this.resetFocusOnWindow();

      if (this.el) {
        this.log('WOW! Iframe click!!!');
       // this.iframeClick.emit(this.el);
      }
      else {
        this.log("element not found");
      }
    }
  }

  private resetFocusOnWindow() {
    setTimeout(() => {
      this.log('reset focus to window');
      window.focus();
    }, 100);
  }

  private log(message: string) {
    if (this.debug) {
      console.log(message);
    }
  }
}
