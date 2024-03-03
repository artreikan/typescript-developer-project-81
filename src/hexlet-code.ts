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

  private inputs: string[] = [];

  private constructor(private readonly template: Record<string, string>) {}

  private formatInputs(): string {
    return this.inputs.join('');
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
    }, hc.formatInputs());

    return this.formTag.toString();
  }

  public input(name: string, params: InputParams = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = 'input', ...rest } = params;

    const input = new Tag(
      as,
      {
        name,
        value: as === 'input' ? this.template[name] : '',
        ...rest,
      },
      this.template[name],
    ).toString();

    this.inputs.push(input);
  }
}

export default HexletCode;
