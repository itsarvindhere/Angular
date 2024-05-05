import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ErrorMessageComponent } from "./errorMessage.component";
import { By } from "@angular/platform-browser";

describe('ErrorMessageComponent', () => {
    let component: ErrorMessageComponent;
    let fixture: ComponentFixture<ErrorMessageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ErrorMessageComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('creates a component', () => {
        expect(component).toBeTruthy();
    });

    it('should render a default error message', () => {
        const messageContainer = fixture.debugElement.query(By.css('[data-testid="message-container"]'));

        expect(messageContainer.nativeElement.textContent).toBe('Something went wrong');
    });

    it('should render a custom error message', () => {

        component.message = "Email is already taken!";

        fixture.detectChanges();

        const messageContainer = fixture.debugElement.query(By.css('[data-testid="message-container"]'));

        expect(messageContainer.nativeElement.textContent).toBe('Email is already taken!');
    });


});