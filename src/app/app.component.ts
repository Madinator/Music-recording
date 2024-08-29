import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IMusicElement } from './service/music.service';
import { MusicService } from './service/music.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'path'];
  public dataSource: IMusicElement[] | undefined = undefined;

  public activeVideo: string | undefined = undefined;
  constructor(
    private cdr: ChangeDetectorRef,
    private MusicService: MusicService
  ) {}

  ngOnInit(): void {
      this.MusicService.getMusicsList().subscribe({
        next: (res) => {
          this.dataSource = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  public playAudio(url: string): void {
    this.activeVideo = undefined;
    setTimeout(() => {
      this.activeVideo = url;
      this.cdr.detectChanges();
    }, 0);
  }
}
