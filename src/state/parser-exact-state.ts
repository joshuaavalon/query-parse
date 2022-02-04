import { ParserState } from "./parser-state";
import { ParserStartState } from "./parser-start-state";

import type { QueryToken } from "../query-token";

export class ParserExactState extends ParserState {
  input(char: string, pos: number): ParserState {
    this.currentToken.end = pos + 1;
    if (this.isExact(char)) {
      return new ParserStartState(this.config, [...this.tokens]);
    }
    this.currentToken.value += char;
    return this;
  }

  output(): QueryToken[] {
    if (!this.config.allowMissingCloseExactChar) {
      throw new Error(`Missing closing ${this.config.exactChar}`);
    }
    return super.output();
  }
}
