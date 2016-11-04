
export function sortLayoutItemsByRowCol(layout) {
  return [].concat(layout).sort((a, b) => {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1;
    }
    return -1;
  });
}

export function collides(l1, l2) {
  if (l1 === l2) return false;
  if (l1.x + l1.w <= l2.x) return false;
  if (l1.x >= l2.x + l2.w) return false;
  if (l1.y + l1.h <= l2.y) return false;
  if (l1.y >= l2.y + l2.h) return false;
  return true;
}

export const getAllCollisions = (layout, layoutItem) => layout.filter(l => collides(l, layoutItem));


export const moveElement = (layout, l, x, y, isUserAction) => {
  const movingUp = y && l.y > y;
  if (typeof x === 'number') l.x = x;
  if (typeof y === 'number') l.y = y;
  l.moved = true;

  let sorted = sortLayoutItemsByRowCol(layout);
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, l);

  collisions.forEach((collision) => {
    if (collision.moved) return;
    if (l.y > collision.y && l.y - collision.y > collision.h / 4) return;

    layout = moveElementAwayFromCollision(layout, l, collision, isUserAction); // eslint-disable-line
  });

  return layout;
};

export function getFirstCollision(layout, layoutItem) {
  let lt;

  layout.forEach((item) => {
    if (collides(item, layoutItem)) {
      lt = item;
      return false;
    }

    return true;
  });

  return lt;
}

export function moveElementAwayFromCollision(
  layout, collidesWith, itemToMove, isUserAction) {
  if (isUserAction) {
    const fakeItem = {
      x: itemToMove.x,
      y: itemToMove.y,
      w: itemToMove.w,
      h: itemToMove.h,
      i: '-1',
    };
    fakeItem.y = Math.max(collidesWith.y - itemToMove.h, 0);
    if (!getFirstCollision(layout, fakeItem)) {
      return moveElement(layout, itemToMove, undefined, fakeItem.y);
    }
  }

  return moveElement(layout, itemToMove, undefined, itemToMove.y + 1);
}

export function getStatics(layout) {
  return layout.filter(l => l.static);
}

export function compactItem(compareWith, l, verticalCompact) {
  if (verticalCompact) {
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y--;
    }
  }

  let collides;
  while ((collides = getFirstCollision(compareWith, l))) { // eslint-disable-line
    l.y = collides.y + collides.h;
  }
  return l;
}

export function compact(layout, verticalCompact) {
  const compareWith = getStatics(layout);
  const sorted = sortLayoutItemsByRowCol(layout);
  const out = Array(layout.length);

  for (let i = 0, len = sorted.length; i < len; i++) {
    let l = sorted[i];

    if (!l.static) {
      l = compactItem(compareWith, l, verticalCompact);

      compareWith.push(l);
    }

    out[layout.indexOf(l)] = l;

    l.moved = false;
  }

  return out;
}

/**
 * 获取当前layout最高点值
 * @param  {[type]} layout [description]
 * @return {[type]}        [description]
 */
export const getMax = (layouts) => {
  let max = 0;

  layouts.forEach((layout) => {
    max = Math.max(layout.y + layout.h, max);
  });

  return max;
};

export const getElementClientRect = (element) => {
  const clientRect = (element instanceof SVGElement // eslint-disable-line
    ? element.getBoundingClientRect()
    : element.getClientRects()[0]);

  return clientRect && {
    left: clientRect.left,
    right: clientRect.right,
    top: clientRect.top,
    bottom: clientRect.bottom,
    width: clientRect.width || clientRect.right - clientRect.left,
    height: clientRect.height || clientRect.bottom - clientRect.top,
  };
};
