export const loadState = () => {
    try {
        const serialzedState = localStorage.getItem('state');
        if (serialzedState === null) {
            return undefined;
        }
        return JSON.parse(serialzedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        //
    }
};
