<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'

BScroll.use(ObserveImage)
BScroll.use(ObserveDOM)
BScroll.use(PullUp)
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {

    this.scroll = new BScroll(
      this.$refs.wrapper,
      {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        ObserveDOM: true,
        ObserveImage: true
      }
    )
    this.scroll.on('scroll', position => {
      this.scroll && this.$emit('scroll', position)
    })
    //判断是否需要监听滚动到底部事件
    if (this.probeType === 2 || this.probeType === 3 && this.pullUpLoad) {
      this.scroll && this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      if (this.scroll) {
        this.scroll && this.scroll.refresh();
      }
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
