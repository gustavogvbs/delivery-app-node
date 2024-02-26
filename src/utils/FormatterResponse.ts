export class FormatterResponse {
  execute<dataType>(id: string, data: dataType) {
    const res = {
      data: {
        id,
        attributes: data,
      },
    };

    return res;
  }
}

export const formatterResponse = new FormatterResponse();
