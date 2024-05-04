import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { TagInterface } from "../types/tag.interface";
import { HttpErrorResponse } from "@angular/common/http";

describe('APIService', () => { 

    let apiService: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        apiService = TestBed.inject(ApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('creates a service', () => {
        expect(apiService).toBeTruthy();
    });

    describe('getTags', () => { 

        it('should return a list of tags', () => {

            let tags: TagInterface[] | undefined;
            apiService.getTags().subscribe(response => {
                tags = response;
            });

            const req = httpTestingController.expectOne('http://localhost:3004/tags');

            req.flush([{id: '1', name: 'Foo'}]);

            expect(tags).toEqual([{id: '1', name: 'Foo'}]);
        });

        
        
    });

    describe('createTag', () => { 

        it('should return create a tag', () => {

            let tag: TagInterface | undefined;
            apiService.createTag('foo').subscribe(response => {
                tag = response;
            });

            const req = httpTestingController.expectOne('http://localhost:3004/tags');

            req.flush({id: '1', name: 'Foo'});

            expect(tag).toEqual({id: '1', name: 'Foo'});
        });

        it('should pass the correct body', () => {

            let tag: TagInterface | undefined;
            apiService.createTag('foo').subscribe(response => {
                tag = response;
            });

            const req = httpTestingController.expectOne('http://localhost:3004/tags');

            req.flush({id: '1', name: 'Foo'});

            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual({"name": "foo"});
        });

        it('should throw an error if the requrst fails', () => {

            let error: HttpErrorResponse | undefined;
            apiService.createTag('foo').subscribe({
                next: () => {},
                error: (e) => {
                    error = e;
                }
            });

            const req = httpTestingController.expectOne('http://localhost:3004/tags');

            req.flush('Server Error', {
                status: 403,
                statusText: 'Unauthorized'
            });

            if (!error) throw new Error("Error needs to be defined");

            expect(error.status).toEqual(403);
            expect(error.statusText).toEqual('Unauthorized');
        });

    });


});