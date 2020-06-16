import { checkURL } from "../client/js/checkURL"

describe("checkURL should have been defined as a function", () => {
    test("checkURL should be a function", () => {
        expect(typeof checkURL).toBe("function");
    });
});

describe("checkURL should return valid, for a valid article URL", () => {
    test("for a valid article URL", () => {
        const valid_article = "https://www.buzzfeednews.com/article/henrygomez/mayor-pete-buttigieg-south-bend-gentrification";

        const validity = checkURL(valid_article, 'document');
        expect(validity).toMatch('valid');
    });
});

describe("checkURL should return invalid, for an invalid article URL", () => {
    test("for an invalid article URL", () => {
        const invalid_article = "https://wwzzfeednarticle/henrygomez/mayor-pete-buttigieg-south-bend-gentrification";

        const validity = checkURL(invalid_article, 'document');
        expect(validity).toMatch('invalid');
    });
});

describe("checkURL should return valid, for a valid tweet", () => {
    test("for a valid tweet", () => {
        const valid_tweet = "https://twitter.com/elonmusk/status/1272972228326379520";

        const validity = checkURL(valid_tweet, 'tweet');
        expect(validity).toMatch('valid');
    });
});

describe("checkURL should return invalid, for an invalid tweet", () => {
    test("for an invalid tweet", () => {
        const valid_tweet = "https://twir.at972228326379520";

        const validity = checkURL(valid_tweet, 'tweet');
        expect(validity).toMatch('invalid');
    });
});
