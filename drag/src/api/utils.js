export const isCover = () => {};

/**
 * 每一次移动都重新计算
 * @param  { JSON } options.dragEL  { index, x, y, w, h }
 * @param  { Array } options.layouts [{}...]
 */
export const resetLayouts = ({ dragEL: { index, x, y, w, h }, layouts }) => {
  const holder = layouts[index]; // holder原始位置

  const oX = x - holder.x;
  const oY = y - holder.y;
  const toMoveItem = {};

  layouts.map((item, i) => {
    // 移动后位置上面的模块不动
    if (item.y < y) {
      return item;
    }

    toMoveItem[i] = item;

    if (isCover(item, dragEL)) {

    }

    return item;
  });

  return { holder, layouts };
};

export const moveHolder = () => {};
