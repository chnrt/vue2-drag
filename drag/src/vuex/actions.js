function makeAction(type) {
  return ({ commit }, payload) => commit(type, payload);
}

export const addEL = makeAction('ADD_EL');

export const updateLayout = makeAction('UPDATE_LAYOUT');
export const updateAll = makeAction('UPDATE_ALL');

export const changeStatus = makeAction('CHANGE_STATUS');
export const updateHolder = makeAction('UPDATE_HOLDER');

export const updateWapper = makeAction('UPDATE_WAPPER');
export const updateLayoutsRect = makeAction('UPDATE_LAYOUTS_RECT');

export const moveModule = makeAction('MOVE_MODULE');
export const addModule = makeAction('ADD_MODULE');
export const removeModule = makeAction('REMOVE_MODULE');
