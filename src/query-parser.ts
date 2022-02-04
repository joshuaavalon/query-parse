import { ParserStartState } from "./state";
import { defaultConfig } from "./query-parser-config";

import type { QueryParserConfig } from "./query-parser-config";
import type { QueryToken } from "./query-token";
import type { ParserState } from "./state";

export class QueryParser {
  private readonly config: QueryParserConfig;

  public constructor(config: Partial<QueryParserConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  public parse(query: string): QueryToken[] {
    let state: ParserState = new ParserStartState(this.config);
    for (let i = 0; i < query.length; i++) {
      const char = query[i];
      state = state.input(char, i);
    }
    return state.output();
  }
}
