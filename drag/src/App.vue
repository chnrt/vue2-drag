<template>
<div>
  <div class="dragging-area"
    @mouseup="up">

    <div class="box draggable"
      @mousedown="down"
      @mousemove="move">
      <span class="rest">Drag</span>
      <span class="drag">Drop</span>
      me, baby!
    </div>

  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      interactObj: null,
      canMove: false,
      dragOffset: {},
    };
  },

  methods: {
    down(e) {
      e.preventDefault();

      this.dragOffset = {
        dx: e.clientX - e.target.offsetLeft,
        dy: e.clientY - e.target.offsetTop,
      };

      this.canMove = true;
      e.target.classList.add('dragging');
    },

    move(e) {
      if (this.canMove) {
        const els = e.target.style;
        els.left = `${(e.clientX - this.dragOffset.dx)}px`;
        els.top = `${(e.clientY - this.dragOffset.dy)}px`;
      }
    },

    up() {
      this.canMove = false;
      this.$el.querySelector('.draggable').classList.remove('dragging');
    },
  },
};
</script>

<style>
@import url('./assets/css/reset.css');

.dragging-area {
  width: 100%;
  height: 100%;
}
.box {
  -webkit-transition: box-shadow 100ms ease;
  color: white;
  background: #28f;
  text-align: center;
  padding: 1em;
  box-shadow: 1px 1px 5px #444;
}
.draggable {
  transform: translate3d(0,0,0);
  cursor: move;
  width: 150px;
  height: 150px;
  position: absolute;
}
.dragging {
  box-shadow: 10px 10px 40px #444;
}
.draggable .drag {
  font-style: italic;
  font-weight: bold;
  display: none;
}
.dragging .drag {
  display: inline;
}
.dragging .rest {
  display: none;
}
</style>
