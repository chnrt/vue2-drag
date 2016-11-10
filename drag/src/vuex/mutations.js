/**
 * state
 *
 * layouts : [{ x: 0, y: 0, w: 1, h: 1 }...]
 */
export const state = {
  dragable: true,
  resizable: true,
  isDragging: false,
  holder: { x: 0, y: 0, w: 0, h: 0 },
  layouts: [
    // { x: 0, y: 20, w: 1, h: 17, data: { cls: 'classbrand-base' } },
    // { x: 3, y: 0, w: 1, h: 20, data: { cls: 'classbrand-notice' } },
    // { x: 3, y: 20, w: 1, h: 30, data: { cls: 'classbrand-moments' } },
    // { x: 1, y: 20, w: 2, h: 30, data: { cls: 'classbrand-evaluate' } },
    // { x: 0, y: 37, w: 1, h: 13, data: { cls: 'classbrand-timetable' } },
    // { x: 2, y: 0, w: 1, h: 20, data: { cls: 'classbrand-person' } },
    // { x: 0, y: 0, w: 2, h: 20, data: { cls: 'classbrand-class' } },
  ],
  layoutsRect: {},
  wapperHeight: 540,

  modules: [],
  movingModule: null, // module index
  moduleMove: false,
};

export const mutations = {
  ADD_EL(state, { layout }) {
    state.layouts.push(layout);
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

  UPDATE_WAPPER(state, { height }) {
    state.wapperHeight = height;
  },

  UPDATE_LAYOUTS_RECT(state, { rect }) {
    state.layoutsRect = rect;
  },

  MOVE_MODULE(state, { index, module }) {
    Object.keys(module).forEach((key) => {
      state.modules[index][key] = module[key];

      if (key === 'moving') {
        state.moduleMove = module[key];
        state.movingModule = index;
      }
    });
  },

  ADD_MODULE(state, { module }) {
    state.modules.push(module);
  },

  REMOVE_MODULE(state, { index }) {
    state.modules.splice(index, 1);
  },

  UPDATE_MODULES(state, { modules }) {
    state.modules = modules;
  },
};
