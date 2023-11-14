import { DocumentReference, StoreProvider } from './store-provider.interface';

type Store = Record<string, Record<string, any>>;
type StoreSubscribers = Record<string, Record<string, ((data: any) => void)[]>>;

export const debugInMemoryStoreProvider = (): StoreProvider => {
  const store: Store = {};
  const storeSubscribers: StoreSubscribers = {};

  const get = async (document: string, id: string): Promise<any> => {
    console.debug('get', document, id);
    return store[document]?.[id];
  };

  const dispatch = ({ document, id }: DocumentReference, data: any): void => {
    console.debug('dispatch', document, id, data, `${storeSubscribers[document]?.[id]?.length || 0} sub(s)`);
    store[document] = store[document] || {};
    store[document][id] = data;
    storeSubscribers[document]?.[id]?.forEach(callback => callback(data));
  };

  const subscribe = ({ document, id }: DocumentReference, callback: (data: any) => void = () => {}): (() => void) => {
    console.debug('subscribe', document, id);
    storeSubscribers[document] = storeSubscribers[document] || {};
    storeSubscribers[document][id] = storeSubscribers[document][id] || [];
    storeSubscribers[document][id].push(callback);
    return () =>
      (storeSubscribers[document][id] = storeSubscribers[document][id].filter(aCallback => aCallback !== callback));
  };

  return {
    get,
    dispatch,
    subscribe
  };
};
