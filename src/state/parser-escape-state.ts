import { ParserState } from "./parser-state";
import { ParserInputState } from "./parser-input-state";

import type { QueryToken } from "../query-token";

export class ParserEscapeState extends ParserState {
  input(char: string, pos: number): ParserState {
    this.currentToken.end = pos + 1;
    this.currentToken.value += char;
    return new ParserInputState(this.config, [...this.tokens]);
  }

  output(): QueryToken[] {
    if (!this.config.allowEscapeNothingAtEnd) {
      throw new Error("Escaping nothing at the end!");
    }
    return super.output();
  }
}
