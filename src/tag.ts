import SELF_CLOSING_TAGS from './constants';

class Tag {
  constructor(
    private tagName: string,
    private attributes: Record<string, string> = {},
    private child: string = '',
  ) {}

  private isSelfClosingTag(): boolean {
    return SELF_CLOSING_TAGS.includes(this.tagName);
  }

  private stringifyAttributes(): string {
    if (Object.keys(this.attributes).length === 0) {
      return '';
    }

    return ` ${Object.entries(this.attributes).map(([key, value]) => `${key}="${value}"`).join(' ')}`;
  }

  toString(): string {
    if (this.isSelfClosingTag()) {
      return `<${this.tagName}${this.stringifyAttributes()}>`;
    }

    return `<${this.tagName}${this.stringifyAttributes()}>${this.child}</${this.tagName}>`;
  }
}

export default Tag;
