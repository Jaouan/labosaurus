export interface StoreProvider {
  get: (document: string, id: string) => Promise<unknown>;
  dispatch: (documentReference: DocumentReference, data: unknown) => void;
  subscribe: (documentReference: DocumentReference, callback: (data: unknown | undefined) => void) => () => void;
}

export interface DocumentReference {
  document: string;
  id: string;
}
