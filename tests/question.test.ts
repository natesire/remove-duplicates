import { Question } from "../index";
//jest.mock("../question");

/*
it("should mock class B", () => {
    const functionNameMock = jest.fn();
    jest.spyOn(Question.prototype, "search").mockImplementation(functionNameMock);
});*/

describe("class Question", () => {
    it("should return property", () => {
        const question = new Question('js.tree.json');
        expect(question.tree).toEqual(1);
    });

    it("should load tree", () => {
        const question = new Question('js.tree.json');
        expect(question.tree).toEqual(1);
    });
});