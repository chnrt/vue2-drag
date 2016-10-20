function makeAction(type) {
  return ({ commit }, payload) => commit(type, payload);
}

export const addEL = makeAction('ADD_EL');
export const deleteEL = makeAction('DELETE_EL');

export const updateLayout = makeAction('UPDATE_LAYOUT');
export const updateAll = makeAction('UPDATE_ALL');

export const changeStatus = makeAction('CHANGE_STATUS');
export const updateHolder = makeAction('UPDATE_HOLDER');
