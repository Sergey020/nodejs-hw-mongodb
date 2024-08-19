const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'string') {
    if (isFavourite.toLowerCase() === 'true') {
      return isFavourite;
    }
    if(typeof isFavourite === 'string') {
        if(isFavourite.toLocaleLowerCase() === 'false') {
            return isFavourite;
        }
    }
  }
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  }
  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
