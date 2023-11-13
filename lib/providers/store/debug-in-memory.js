
const debugInMemoryStoreProvider = () => {
    const store = {};
    const documentSubscribers = {};

    const get = async (document, id) => {
        console.debug("get", document, id);
        return store[document]?.[id];
    };

    const dispatch = ({ document, id }, data) => {
        console.debug("dispatch", document, id, data, `${documentSubscribers[document]?.[id]?.length || 0} sub(s)`);
        store[document] = store[document] || {};
        store[document][id] = data;
        documentSubscribers[document]?.[id]?.forEach(callback => callback(data));
    };

    const subscribe = ({ document, id }, callback = () => { }) => {
        console.debug("subscribe", document, id);
        documentSubscribers[document] = documentSubscribers[document] || {};
        documentSubscribers[document][id] = documentSubscribers[document][id] || [];
        documentSubscribers[document][id].push(callback);
        return () =>
            documentSubscribers[document][id] = documentSubscribers[document][id].filter(aCallback => aCallback !== callback);
    };

    return {
        get,
        dispatch,
        subscribe,
    };
};

export default debugInMemoryStoreProvider;
