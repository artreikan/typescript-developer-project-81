import Tag from './tag';

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
      action: params.url ?? '#',
      method: params.method ?? 'post',
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

    const field = new Tag(
      as,
      {
        name,
        value: as === 'input' ? this.template[name] : '',
        cols: as === 'textarea' ? cols : '',
        rows: as === 'textarea' ? rows : '',
        ...rest,
      },
      this.template[name],
    ).toString();

    this.fields.push(field);
  }
}

export default HexletCode;
