function makeAction(type) {
  return ({ commit }, payload) => commit(type, payload);
}

export const addEl = makeAction('ADD_EL');
export const deleteEl = makeAction('DELETE_EL');
