import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { KeyboardArrowService } from '../services/keyboard-arrow.service';

const classActive = 'key-active';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[directive-click-button]'
})
export class ClickButtonDirective implements OnInit {

  private timeOutReference: any;

  private get button(): HTMLButtonElement {
    return this.el.nativeElement as HTMLButtonElement;
  }

  private get arrow(): string {
    return this.button.getAttribute('data-arrow');
  }

  constructor(private el: ElementRef,
              private keyboardArrowService: KeyboardArrowService,
              private renderer: Renderer2) {
  }

  setClassActive = (nativeElement: HTMLElement) => {
    this.renderer.addClass(nativeElement, classActive);
  }

  checkClassActive = (nativeElement: HTMLElement): boolean => {
    return nativeElement.classList.contains(classActive);
  }

  removeClassActive = (nativeElement: HTMLElement) => {
    if (this.checkClassActive(nativeElement)) {
      this.renderer.removeClass(nativeElement, classActive);
    }
  }


  ngOnInit(): void {
    this.keyboardArrowService.arrowObservable.subscribe((key: string) => {
      if (key === this.arrow) {

        clearTimeout(this.timeOutReference);
        this.setClassActive(this.button);
        this.timeOutReference = setTimeout(() => {
          this.removeClassActive(this.button);
        }, 250);

      }
    });
  }
}
