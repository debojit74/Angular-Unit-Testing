import { of } from 'rxjs';
import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { delay } from 'rxjs/operators';

describe("Async Testing Example", () => {
    it("Asynchronous test example with jasmine done", (done: DoneFn) => {
        let test = false;
        setTimeout(() => {
            console.log("running assertions");
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });

    it("Asynchronous test example with setTimeout()", fakeAsync(() => {
        let test = false;
        setTimeout(() => { });
        setTimeout(() => {
            console.log("running assertions setTimeout");
            test = true;
        }, 1000);
        //moves the clocks forward by <seconds>
        //tick(1000);
        // clears all async events
        flush();
        expect(test).toBeTruthy();
    }));

    it("Asynchronous test example with promise", fakeAsync(() => {
        let test = false;
        console.log("creating promise");
        Promise.resolve().then(() => {
            console.log("promise evaluated successfully");
            test = true;
        });
        flushMicrotasks();
        console.log("running test assertions");
        expect(test).toBeTruthy();
    }));

    it("Asynchronous test example with promise + setTimeout()", fakeAsync(() => {
        let counter = 0;

        Promise.resolve().then(() => {
            counter += 10;
            setTimeout(() => {
                counter += 1;
            }, 1000);
        });
        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        flush();
        expect(counter).toBe(11);
    }));

    it("Asynchronous test example with Observable ", fakeAsync(() => {
        let test = false;
        console.log("Creating Observable");
        const test$ = of(test).pipe(delay(1000));  //delay calls setTimeout internally i.e. macrotask
        test$.subscribe(() => {
            test = true;
        });
        tick(1000);
        expect(test).toBe(true);
    }));
});