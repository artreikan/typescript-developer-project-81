/* eslint-disable @typescript-eslint/no-unused-vars */
import Tag from './tag';

interface FormParams {
  url?: string;
}

class HexletCode {
  static formFor(
    template: Record<string, string>,
    params: FormParams,
    callback: (form: HexletCode) => void,
  ): string {
    const form = new Tag('form', {
      action: params.url ?? '#',
      method: 'post',
    });
    return form.toString();
  }
}

export default HexletCode;
