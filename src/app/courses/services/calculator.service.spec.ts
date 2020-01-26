import { TestBed, inject } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
    let loggerSpy: any;
    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });
    });

    it('should add two numbers', inject([CalculatorService], (calculator: CalculatorService) => {
        // const logger = new LoggerService();
        // spyOn(logger, 'log');
        // const logger = jasmine.createSpyObj('LoggerService', ["log"]);
        // let calculator = new CalculatorService(logger);
        //// used to return value
        // logger.log.and.returnValue();    
        const result = calculator.add(2, 2);
        expect(result).toBe(4, "Unexpected addition result");
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
    );

    it('should subtract two numbers', inject([CalculatorService], (calculator: CalculatorService) => {
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, "Unexpected subtraction result");
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
    );
});