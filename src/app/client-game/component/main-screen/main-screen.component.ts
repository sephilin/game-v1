import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SoundsService } from '../../sounds/sounds.service';

const statusOn = 'ON';
const statusOff = 'OFF';

const musicOnClass = 'music-on';
const musicOffClass = 'music-off';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  @ViewChild('statusBGSong', { static: true }) statusBGSong: ElementRef<HTMLSpanElement>;

  constructor(private soundsService: SoundsService, private render: Renderer2) { }


  ngOnInit() {
    const span = this.statusBGSong.nativeElement;
    this.render.addClass(span, musicOnClass);
    this.statusBGSong.nativeElement.innerText = statusOn;
  }


  toggleBackgroundSong = () => {
    const span = this.statusBGSong.nativeElement;

    if (span.innerText === statusOn) {
      this.render.removeClass(span, musicOnClass);
      this.render.addClass(span, musicOffClass);
      this.statusBGSong.nativeElement.innerText = statusOff;
    } else {
      this.render.removeClass(span, musicOffClass);
      this.render.addClass(span, musicOnClass);
      this.statusBGSong.nativeElement.innerText = statusOn;
    }

    this.soundsService.muteBackgroundSound();
  }
}
