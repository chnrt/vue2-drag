function makeAction(type) {
  return ({ commit }, payload) => commit(type, payload);
}

export const addEL = makeAction('ADD_EL');
export const deleteEL = makeAction('DELETE_EL');
export const updateLayout = makeAction('UPDATE_LAYOUT');
