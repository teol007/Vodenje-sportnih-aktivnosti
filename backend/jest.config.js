/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],  // Transforms TypeScript files using ts-jest
  },
  collectCoverage: true,             // Enables code coverage collection
  coverageDirectory: "coverage",     // Specifies the directory for coverage reports
  coveragePathIgnorePatterns: [      // (Optional) Ignore these directories/files in coverage
    "/node_modules/",
    "/build/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],  // Recognizes these file types
  testMatch: [                       // Looks for test files in these patterns
    "**/tests/**/*.test.ts",
    "**/__tests__/**/*.test.ts"
  ],
  coverageReporters: ['lcov', 'text-summary'],
};
