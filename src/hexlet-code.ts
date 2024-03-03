/* eslint-disable @typescript-eslint/no-unused-vars */
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

  private static inputs: string[] = [];

  private constructor(private readonly template: Record<string, string>) {}

  private static formatInputs(): string {
    return this.inputs.join('');
  }

  static formFor(
    template: Record<string, string>,
    params: FormParams,
    callback: (form: HexletCode) => void,
  ): string {
    callback(new HexletCode(template));

    this.formTag = new Tag('form', {
      action: params.url ?? '#',
      method: params.method ?? 'post',
    }, HexletCode.formatInputs());

    return this.formTag.toString();
  }

  input(name: string, params: InputParams = {}): void {
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

    HexletCode.inputs.push(input);
  }
}

export default HexletCode;
