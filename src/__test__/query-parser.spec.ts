import { QueryParser } from "../query-parser";

describe("QueryParser", () => {
  test("parse", () => {
    const parser = new QueryParser();
    expect(parser.parse("a")).toEqual([
      { value: "a", type: "", start: 0, end: 1 }
    ]);
    expect(parser.parse("a b")).toEqual([
      { value: "a", type: "", start: 0, end: 1 },
      { value: "b", type: "", start: 2, end: 3 }
    ]);
  });

  test("parse keywords", () => {
    const parser = new QueryParser({ keywords: ["foo"] });
    expect(parser.parse("foo:a")).toEqual([
      { value: "a", type: "foo", start: 0, end: 5 }
    ]);

    expect(parser.parse("foo:a foo:b")).toEqual([
      { value: "a", type: "foo", start: 0, end: 5 },
      { value: "b", type: "foo", start: 6, end: 11 }
    ]);

    expect(() => parser.parse("bar:a foo:b")).toThrow();
  });

  test("parse prefixes", () => {
    const parser = new QueryParser({ keywords: ["foo"] });
    expect(parser.parse("-a")).toEqual([
      { value: "a", type: "", prefix: "-", start: 0, end: 2 }
    ]);

    expect(parser.parse("-a b-c")).toEqual([
      { value: "a", type: "", prefix: "-", start: 0, end: 2 },
      { value: "b-c", type: "", start: 3, end: 6 }
    ]);

    expect(parser.parse("-foo:a foo:-b")).toEqual([
      { value: "a", type: "foo", prefix: "-", start: 0, end: 6 },
      { value: "-b", type: "foo", start: 7, end: 13 }
    ]);
  });

  test("parse exact", () => {
    const parser = new QueryParser({ keywords: ["foo"] });
    expect(parser.parse('"-a"')).toEqual([
      { value: "-a", type: "", start: 0, end: 4 }
    ]);
    expect(parser.parse('"foo:a"')).toEqual([
      { value: "foo:a", type: "", start: 0, end: 7 }
    ]);
    expect(parser.parse('foo:"foo:a"')).toEqual([
      { value: "foo:a", type: "foo", start: 0, end: 11 }
    ]);
    expect(() => parser.parse('"foo:a')).toThrow();
    expect(() => parser.parse('foo:a"b')).toThrow();
  });

  test("parse escape", () => {
    const parser = new QueryParser({ keywords: ["foo"] });
    expect(parser.parse("\\-a")).toEqual([
      { value: "-a", type: "", start: 0, end: 3 }
    ]);
    expect(parser.parse("foo\\:a")).toEqual([
      { value: "foo:a", type: "", start: 0, end: 6 }
    ]);
    expect(() => parser.parse("a\\")).toThrow();
  });
});
