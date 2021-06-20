<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isShow"
    />
    <scroll class="content" ref="scroll"
            @scroll="contentScroll"
            @pulling-up="loadMore"
            :probe-type="3"
            :pull-up-load="true"
    >
      <home-swiper :banners="banners" @home-swiper-img-load="homeSwiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
      />
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" :probe-type="3" v-show="isShowBackTop"/>
  </div>
</template>

<script>

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultiData, getHomeGoods} from "@/network/home";
import {debounce} from "@/common/Utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isShow: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods(this.currentType, 0);
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    //总线事件监听
    this.$bus.on('itemImgLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听
     */
    homeSwiperImgLoad() {
      //获取tabControl,待到图片加载完成之后在发出事件
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //防抖函数
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.决定tabControl是否吸顶
      this.isShow = (-position.y) > this.tabOffsetTop
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
        default:
          this.currentType = 'pop'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultiData() {
      //1.请求多个数据
      getHomeMultiData()
        .then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      //2.请求商品数据
      getHomeGoods(type, page)
        .then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll && this.$refs.scroll.finishPullUp()
        })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: var(--color-background);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
