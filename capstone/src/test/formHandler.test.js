import { formHandler } from "../client/js/formHandler"

describe("formHandler should have already been defined", () => {
    test("The test should return true", () => {
        expect(formHandler).toBeDefined();
    });
});

describe("formHandler should have been defined as a function", () => {
    test("formHandler should be a function", () => {
        expect(typeof formHandler).toBe("function");
    });
});