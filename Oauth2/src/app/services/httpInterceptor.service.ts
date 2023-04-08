import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { LoaderService } from "./loader.service";
import { Authentication } from "../models/authentication";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private loaderService: LoaderService, private router: Router, private storageService: StorageService) { }

    pendings: number = 0;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();

        this.pendings = this.pendings + 1;

        return next.handle(this.addToken(request)).pipe(
            finalize(() => {
                this.pendings = this.pendings - 1;
                if (this.pendings == 0) {
                    this.loaderService.hide();
                }
            }),
            catchError(errorResponse => {
                console.log('ErrorResponse', errorResponse);
                return throwError(() => errorResponse);
            }));
    }

    addToken(request: HttpRequest<any>): HttpRequest<any> {
        let currentUser: Authentication | null = this.storageService.get<Authentication>('__currentUser');
        if (currentUser) {
            let requestClone = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: currentUser.accessToken
                }
            });
            return requestClone;
        }
        return request;
    }
}