// audio-recorder.page.ts

import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  IonicModule,
  ToastController
} from '@ionic/angular';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  VoiceRecorder
} from 'capacitor-voice-recorder';

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.page.html',
  styleUrls: ['./audio-recorder.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
})
export class AudioRecorderPage
implements OnDestroy {

  // AUDIO
  audioUrl: string | undefined;

  audioPlayer:
    HTMLAudioElement | undefined;

  // STATES
  isRecording = false;

  isPlaying = false;

  // TIMER
  recordingTime = 0;

  timerInterval: any;

  constructor(
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  // GO HOME
  goHome() {

    this.router.navigate(['/home']);
  }

  // START RECORDING
  async startRecording() {

    const permission =
      await VoiceRecorder
      .requestAudioRecordingPermission();

    if (!permission.value) {

      this.presentToast(
        'Permission micro refusée'
      );

      return;
    }

    await VoiceRecorder.startRecording();

    this.isRecording = true;

    this.recordingTime = 0;

    this.startTimer();

    this.presentToast(
      'Enregistrement démarré'
    );
  }

  // STOP RECORDING
  async stopRecording() {

    const result =
      await VoiceRecorder.stopRecording();

    this.isRecording = false;

    clearInterval(this.timerInterval);

    if (result.value?.recordDataBase64) {

      const audioBlob =
        this.b64toBlob(
          result.value.recordDataBase64,
          `audio/${result.value.mimeType}`
        );

      this.audioUrl =
        URL.createObjectURL(audioBlob);

      this.presentToast(
        'Enregistrement terminé'
      );
    }
  }

  // PLAY / STOP AUDIO
  toggleAudioPlayback() {

    if (!this.audioUrl) return;

    // STOP AUDIO
    if (this.isPlaying) {

      this.audioPlayer?.pause();

      if (this.audioPlayer) {

        this.audioPlayer.currentTime = 0;
      }

      this.isPlaying = false;

      return;
    }

    // PLAY AUDIO
    this.audioPlayer =
      new Audio(this.audioUrl);

    this.audioPlayer.play();

    this.isPlaying = true;

    this.audioPlayer.onended = () => {

      this.isPlaying = false;
    };
  }

  // DELETE AUDIO
  deleteAudio() {

    if (this.audioPlayer) {

      this.audioPlayer.pause();

      this.audioPlayer.currentTime = 0;
    }

    this.isPlaying = false;

    this.audioUrl = undefined;

    this.recordingTime = 0;

    this.presentToast(
      'Audio supprimé'
    );
  }

  // TIMER
  startTimer() {

    this.timerInterval =
      setInterval(() => {

        this.recordingTime++;

      }, 1000);
  }

  // FORMAT TIMER
  formatTime(seconds: number): string {

    const mins =
      Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');

    const secs =
      (seconds % 60)
      .toString()
      .padStart(2, '0');

    return `${mins}:${secs}`;
  }

  // BASE64 => BLOB
  b64toBlob(
    b64Data: string,
    contentType = ''
  ) {

    const byteCharacters =
      atob(b64Data);

    const byteNumbers =
      new Array(byteCharacters.length);

    for (
      let i = 0;
      i < byteCharacters.length;
      i++
    ) {

      byteNumbers[i] =
        byteCharacters.charCodeAt(i);
    }

    const byteArray =
      new Uint8Array(byteNumbers);

    return new Blob(
      [byteArray],
      {
        type: contentType
      }
    );
  }

  // TOAST
  async presentToast(message: string) {

    const toast =
      await this.toastCtrl.create({

        message,

        duration: 2000,

        position: 'bottom',
      });

    await toast.present();
  }

  // DESTROY
  ngOnDestroy() {

    clearInterval(this.timerInterval);

    if (this.audioPlayer) {

      this.audioPlayer.pause();
    }
  }
}