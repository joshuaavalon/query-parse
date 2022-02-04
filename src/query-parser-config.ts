export interface QueryParserConfig {
  keywords: string[];
  keywordChar: string;
  escapeChar: string;
  exactChar: string;
  prefixes: string[];
  array: boolean;
  allowKeywordCharInValue: boolean;
  allowMissingCloseExactChar: boolean;
  allowEscapeNothingAtEnd: boolean;
}

export const defaultConfig: QueryParserConfig = {
  keywords: [],
  keywordChar: ":",
  escapeChar: "\\",
  exactChar: '"',
  prefixes: ["-"],
  array: true,
  allowKeywordCharInValue: false,
  allowMissingCloseExactChar: false,
  allowEscapeNothingAtEnd: false
};
