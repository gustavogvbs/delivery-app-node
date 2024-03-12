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
  array<dataType>(arr: Array<dataType>) {
    const items: Array<{ id: string; attributes: dataType }> = [];

    arr.forEach((item) => {
      const newObj = Object.assign({}, item);

      delete newObj.id;
      items.push({ id: item.id, attributes: newObj });
    });
    return { data: items };
  }
  update<datatype>(id: string, data: datatype) {
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
