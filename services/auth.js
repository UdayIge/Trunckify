const sessionUserMap = new Map();

export const setUser = (id, user) => {
    sessionUserMap.set(id, user);
}

export const getUser = (id) => {
    return sessionUserMap.get(id);
}


export const removeUser = (id) => {
    sessionUserMap.delete(id);
}
