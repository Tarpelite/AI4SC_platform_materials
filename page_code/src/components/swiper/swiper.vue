<template v-if="list.length">
  <swiper :options="options" ref="mySwiper" class="buaa-swiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in list" class="buua-swiper-slide">
      <div class="item">
        <div class="itemImg">
          <img :src="item.image" alt=""/>
        </div>
        <div class="msg">
          <div class="text">{{ item.description }}</div>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev">
      <img :src="imageList.left" alt=""/>
    </div>
    <div class="swiper-button-next" slot="button-next">
      <img :src="imageList.right" alt=""/>
    </div>
  </swiper>
</template>

<script>
import images from "@/utils/js/exportImage";

export default {
  name: "swiper",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      imageList: images,
      options: {
        // swiper options 所有的配置同swiper官方api配置
        // autoplay: 3000,
        slidesPerView: 3,
        spaceBetween: 40,
        autoHeight: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
      },
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
