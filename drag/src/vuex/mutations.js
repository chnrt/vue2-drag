/**
 * state
 *
 * layout : [{
 *   x: 0,
 *   y: 0,
 *   w: 1,
 *   h: 1,
 * }]
 */
export const state = {
  dragable: true,
  resizable: true,
  isDragging: false,
  holder: { x: 0, y: 0, w: 0, h: 0 },
  layouts: [
    { x: 0, y: 0, w: 2, h: 2 },
    { x: 2, y: 0, w: 2, h: 4 },
    { x: 4, y: 0, w: 2, h: 5 },
    { x: 6, y: 0, w: 2, h: 3 },
    { x: 8, y: 0, w: 2, h: 3 },
    { x: 10, y: 0, w: 2, h: 3 },
    { x: 0, y: 2, w: 2, h: 5 },
    { x: 2, y: 4, w: 2, h: 5 },
    { x: 4, y: 5, w: 2, h: 5 },
    { x: 6, y: 3, w: 2, h: 4 },
    { x: 8, y: 3, w: 2, h: 4 },
    { x: 10, y: 3, w: 2, h: 4 },
    { x: 0, y: 7, w: 2, h: 5 },
    { x: 2, y: 9, w: 2, h: 5 },
    { x: 4, y: 10, w: 2, h: 4 },
    { x: 6, y: 7, w: 2, h: 4 },
    { x: 8, y: 7, w: 2, h: 5 },
    { x: 10, y: 7, w: 2, h: 2 },
    { x: 0, y: 12, w: 2, h: 3 },
    { x: 6, y: 11, w: 2, h: 2 },
  ],
};

export const mutations = {
  ADD_EL(state, { config }) {
    state.layouts.push({
      config,
    });
  },

  DELETE_EL(state, { layout }) {
    state.layouts.splice(state.layouts.indexOf(layout), 1);
  },

  UPDATE_LAYOUT(state, { index, layout }) {
    state.layouts.splice(index, 1, layout);
  },

  UPDATE_ALL(state, { layouts }) {
    state.layouts = layouts;
  },

  UPDATE_HOLDER(state, { holder }) {
    state.holder = holder;
  },

  CHANGE_STATUS(state, { status }) {
    state.isDragging = status;
  },
};
