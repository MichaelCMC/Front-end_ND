import { handleSubmit } from '../client/js/formHandler'

describe("handleSubmit should have already been defined", () => {
    test("The test should return true", () => {
        expect(handleSubmit).toBeDefined();
    });
});

describe("handleSubmit should have been defined as a function", () => {
    test("handleSubmit should be a function", () => {
        expect(typeof handleSubmit).toBe("function");
    });
});