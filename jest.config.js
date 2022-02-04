module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  roots: ["src"],
  testMatch: ["**/__test__/**/*(*.)@(test|spec).ts"]
};
