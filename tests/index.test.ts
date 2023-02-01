import { Question } from "../index";
jest.mock("../index");

it("should mock class B", () => {
    const functionNameMock = jest.fn();
    jest.spyOn(Question.prototype, "search").mockImplementation(functionNameMock);
});

describe("class", () => {
    it("should return property", () => {
        const question = new Question();
        expect(question.tree).toEqual(1);
        
    });

    /*
    it("should get tree node", () => {
        const question = new Question();
        expect(question.getTree()).toEqual({ test: 'test' });
    });*/
});