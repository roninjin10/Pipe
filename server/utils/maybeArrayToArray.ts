type NonArray = Exclude<any, any[]>;

export const maybeArrayToArray = <TItemType extends NonArray>(
  maybeArray: TItemType | TItemType[]
): TItemType[] => (Array.isArray(maybeArray) ? maybeArray : [maybeArray]);
