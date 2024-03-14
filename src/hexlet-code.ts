import Tag from './tag';
import capitalize from './utils/capitalize';

interface FormParams {
  url?: string;
  method?: string;
}

type InputParams = {
  as?: 'textarea' | 'input';
} & Record<string, string | number>;

class HexletCode {
  private static formTag: Tag;

  private fields: string[] = [];

  private constructor(private readonly template: Record<string, string>) {}

  private formatFields(): string {
    return this.fields.join('');
  }

  public static formFor(
    template: Record<string, string>,
    params: FormParams,
    callback: (form: HexletCode) => void,
  ): string {
    const hc = new HexletCode(template);
    callback(hc);

    this.formTag = new Tag('form', {
      method: params.method ?? 'post',
      action: params.url ?? '#',
    }, hc.formatFields());

    return this.formTag.toString();
  }

  public input(name: string, params: InputParams = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const {
      as = 'input', cols = '20', rows = '40', ...rest
    } = params;

    const label = new Tag('label', { for: name }, capitalize(name)).toString();

    let field = '';

    switch (as) {
      case 'input': {
        field = new Tag('input', {
          name,
          type: 'text',
          value: this.template[name],
          ...rest,
        }).toString();
        break;
      }
      case 'textarea': {
        field = new Tag('textarea', {
          cols,
          rows,
          name,
          ...rest,
        }).toString();
        break;
      }
      default:
        field = '';
        break;
    }

    this.fields.push(label, field);
  }

  public submit(label: string = 'Save'): void {
    const button = new Tag('input', { type: 'submit', value: label }).toString();
    this.fields.push(button);
  }
}

export default HexletCode;
