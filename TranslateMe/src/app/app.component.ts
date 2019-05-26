import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'TranslateMe';

  @Input()
  //url: string = "https://elcomercio.pe/";
  //url: string = "https://rpp.pe/";
  //url: string = "https://lamula.pe/";
  //url: string = "https://laraza.com/";
  url: string = "https://www.univision.com/noticias";
  urlSafe: SafeResourceUrl;
  translationUrl: string = "https://context.reverso.net/translation/spanish-english/saber";
  translationUrlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer, private httpClient: HttpClient) { }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.translationUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.translationUrl);
  }

  urlUpdate(value: string): void {
    console.log("Searching value: " + value);
  }
   
  click() {
    console.log('copying to clipboard');
    document.execCommand("copy");
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67)
      console.log('CTRL + C');
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86)
      console.log('CTRL +  V');
  }
}
