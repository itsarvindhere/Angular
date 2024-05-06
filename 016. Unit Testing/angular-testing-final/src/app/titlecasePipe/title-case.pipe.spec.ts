import { TitleCasePipe } from "@angular/common";

describe('TitleCasePipe', () => { 

    const pipe = new TitleCasePipe();

    it ('transforms "abc" to "Abc"', () => {
        expect(pipe.transform("abc")).toBe("Abc");
    });

    it ('transforms "abc def" to "Abc Def"', () => {
        expect(pipe.transform("abc def")).toBe("Abc Def");
    });

    it ('transforms "" to ""', () => {
        expect(pipe.transform('')).toBe('');
    });

});