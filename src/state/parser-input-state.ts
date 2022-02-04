import { ParserState } from "./parser-state";
import { ParserStartState } from "./parser-start-state";
import { ParserEscapeState } from "./parser-escape-state";
import { ParserExactState } from "./parser-exact-state";

export class ParserInputState extends ParserState {
  input(char: string, pos: number): ParserState {
    this.currentToken.end = pos + 1;
    if (this.isEscape(char)) {
      return new ParserEscapeState(this.config, [...this.tokens]);
    }
    if (this.isExact(char)) {
      if (this.currentToken.value) {
        throw new Error(
          `${this.config.exactChar} is not allowed in the middle of the value. Please use ${this.config.escapeChar} to escape it.`
        );
      }
      return new ParserExactState(this.config, [...this.tokens]);
    }
    if (this.isSpace(char)) {
      this.currentToken.end = pos;
      return new ParserStartState(this.config, [...this.tokens]);
    }
    if (this.isKeyword(char)) {
      if (this.currentToken.type) {
        if (!this.config.allowKeywordCharInValue) {
          throw new Error(
            `${this.config.keywordChar} is not allowed for value`
          );
        } else {
          this.currentToken.value += char;
        }
      } else if (
        this.config.keywords.length === 0 ||
        this.config.keywords.includes(this.currentToken.value)
      ) {
        this.currentToken.type = this.currentToken.value;
        this.currentToken.value = "";
      } else {
        throw new Error(`Unknown keyword: ${this.currentToken.value}`);
      }
      return this;
    }
    this.currentToken.value += char;
    return this;
  }
}
