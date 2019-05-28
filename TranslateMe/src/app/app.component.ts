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
  url: string = "https://www.univision.com/noticias";
  urlUnivision: string = "https://www.univision.com/noticias";
  urlElComercio: string = "https://elcomercio.pe/";
  urlRPP: string = "https://rpp.pe/";
  urlLamula: string = "https://lamula.pe/";
  urlLaraza: string = "https://laraza.com/";

  //url: string = "https://www.glassdoor.com";
  urlSafe: SafeResourceUrl;
  translationUrl: string = "https://context.reverso.net/translation/spanish-english/saber";
  translationUrlSafe: SafeResourceUrl;

  //data: any = [
  //  {
  //    label: '陕西省',
  //    value: '1.test1',
  //    child: [
  //      {
  //        label: '西安市',
  //        value: '2.test1',
  //        child: [
  //          {
  //            label: '雁塔区',
  //            value: '3.test1',
  //          },
  //          {
  //            label: '高新区',
  //            value: '3.test2',
  //          },
  //        ]
  //      },
  //      {
  //        label: '宝鸡市',
  //        value: '2.test1',
  //      },
  //    ]
  //  }
  //];

  constructor(public sanitizer: DomSanitizer, private httpClient: HttpClient) { }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.translationUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.translationUrl);
  }

  urlUpdate(value: string): void {

    if (!/^https?:\/\//i.test(value)) {
      value = 'https://' + value;
    }

    this.url = value;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(value);

    return;
    var w = window.open(this.url, 'targetWindow', 'toolbar=no, location = no, status = no, menubar = no, scrollbars = yes, resizable = yes, width = ' + (window.innerWidth - 420) +
      ', height = ' + window.innerHeight + ', top = 70, left = 0');
    w.focus();
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
