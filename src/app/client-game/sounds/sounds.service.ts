import { Injectable } from '@angular/core';
import { Howl } from 'howler';

const volumeDefault = 0.3;

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  private audio = new Audio();
  private bgAudio = new Howl({
    src: ['assets/bg-song.mp3'],
    loop: true,
    volume: volumeDefault,
    autoplay: true
  });


  constructor() {
  }

  public playBackgroundSound = () => {
    this.bgAudio.play();
  }

  public muteBackgroundSound = () => {
    if (this.bgAudio.volume() === volumeDefault) {
      this.bgAudio.volume(0);
    } else {
      this.bgAudio.volume(volumeDefault);
    }
  }

  public launchSound = (type: string) => {
    this.playSound(type);
  }

  private playSound = (type: string) => {

    // this.audio.src = `../assets/${this.(type)}.wav`;
    // this.audio.load();
    // this.audio.play();
  }
}
