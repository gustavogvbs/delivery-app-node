interface ResponseArray<T> {
  data: {
    id: string;
    attributes: T;
  }[];
}

export class FormatterResponse {
  execute<T>(id: string, data: T) {
    const res = {
      data: {
        id,
        attributes: data,
      },
    };

    return res;
  }

  array<T>(
    callback: () => {
      ids: Array<string>;
      datas: Array<T>;
      i: Array<number>;
    },
  ) {
    const { ids, datas, i } = callback();

    const res: ResponseArray<T> = { data: [] };

    i.forEach((index) => {
      res.data.push({
        id: ids[index],
        attributes: datas[index],
      });
    });

    return res;
  }
}

export const formatterResponse = new FormatterResponse();
