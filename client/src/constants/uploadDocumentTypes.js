const uploadDocumentTypes = {
  LICENSE: 0,
  AUSTRALIAN_PASSPORT: 1,
  FOREIGN_PASSPORT: 2,
  UTILITY_BILL: 3,
  RENT_RECEIPT: 4
};

const uploadDocumentLookup = {
  [uploadDocumentTypes.LICENSE]: 'License',
  [uploadDocumentTypes.AUSTRALIAN_PASSPORT]: 'Australian Passport',
  [uploadDocumentTypes.FOREIGN_PASSPORT]: 'Foreign Passport',
  [uploadDocumentTypes.UTILITY_BILL]: 'Utility Bill',
  [uploadDocumentTypes.RENT_RECEIPT]: 'Rent Receipt'
};

Object.defineProperty(uploadDocumentTypes, 'getDescription', {
  enumerable: false,
  writable: false,
  value(uploadDocumentTypes) {
    return uploadDocumentLookup[uploadDocumentTypes];
  }
});

export default uploadDocumentTypes;
