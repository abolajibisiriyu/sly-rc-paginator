import { getPager } from "../index";

describe("getPager", () => {
  test("contains currentPage, numberOfPages and pages keys", () => {
    const expected = {
      currentPage: expect.any(Number),
      numberOfPages: expect.any(Number),
      pages: expect.any(Array)
    };
    const result = getPager(20, 1, 10);
    expect(result).toEqual(expect.objectContaining(expected));
  });

  test("returns correct key values", () => {
    const expected = { currentPage: 1, numberOfPages: 2, pages: [1, 2] };
    const result = getPager(20, 1, 10);
    expect(result).toEqual(expected);
  });
});
