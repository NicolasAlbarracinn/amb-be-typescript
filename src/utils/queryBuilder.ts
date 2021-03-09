type Operator = '$eq' | '$gt' | '$gte' | '$in' | '$lt' | '$lte' | '$ne' | '$nin';

interface IFilterQueryParameter {
  field: string;
  operator: Operator;
  value: string;
}

export const filterDocument = (args: IFilterQueryParameter) => {};
