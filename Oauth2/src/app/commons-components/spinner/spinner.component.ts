import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  loadingSubscriber!: Subscription;
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loadingSubscriber = this.loaderService.isLoading().subscribe({
      next: isLoading => {
        this.isLoading = isLoading
      }
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscriber.unsubscribe();
  }

}
