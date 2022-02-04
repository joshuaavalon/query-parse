import type { QueryParserConfig } from "../query-parser-config";
import type { QueryToken } from "../query-token";

export abstract class ParserState {
  protected readonly config: QueryParserConfig;
  protected tokens: QueryToken[];

  protected get currentToken(): QueryToken {
    return this.tokens[this.tokens.length - 1];
  }

  public constructor(config: QueryParserConfig, tokens: QueryToken[] = []) {
    this.config = config;
    this.tokens = tokens;
  }

  protected isPrefix(char: string): boolean {
    return this.config.prefixes.includes(char);
  }

  protected isEscape(char: string): boolean {
    return this.config.escapeChar === char;
  }

  protected isSpace(char: string): boolean {
    return /\s/gu.test(char);
  }

  protected isKeyword(char: string): boolean {
    return this.config.keywordChar === char;
  }

  protected isExact(char: string): boolean {
    return this.config.exactChar === char;
  }

  abstract input(char: string, pos: number): ParserState;

  public output(): QueryToken[] {
    return this.tokens;
  }
}
