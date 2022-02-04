import { ParserState } from "./parser-state";
import { ParserInputState } from "./parser-input-state";
import { ParserEscapeState } from "./parser-escape-state";
import { ParserExactState } from "./parser-exact-state";

export class ParserStartState extends ParserState {
  input(char: string, pos: number): ParserState {
    if (this.isEscape(char)) {
      return new ParserEscapeState(this.config, [
        ...this.tokens,
        { value: "", type: "", start: pos, end: pos + 1 }
      ]);
    }
    if (this.isExact(char)) {
      return new ParserExactState(this.config, [
        ...this.tokens,
        { value: "", type: "", start: pos, end: pos + 1 }
      ]);
    }
    if (this.isSpace(char)) {
      return this;
    }
    if (this.isPrefix(char)) {
      return new ParserInputState(this.config, [
        ...this.tokens,
        {
          value: "",
          type: "",
          prefix: char,
          start: pos,
          end: pos + 1
        }
      ]);
    }
    return new ParserInputState(this.config, [
      ...this.tokens,
      { value: char, type: "", start: pos, end: pos + 1 }
    ]);
  }
}
