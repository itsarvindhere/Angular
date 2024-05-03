import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { TagInterface } from "../types/tag.interface";

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

    });


});