<template>
  <div class="container newwork-practice-2">
    <div class="speak-title">
      <div class="text-center mr-3">
        <h2
          v-html="$convertNameToHtml(item.content.title1)"
          class="japan-name"
        ></h2>
        <h3>
          {{ item.content.title2 }}
        </h3>
      </div>
      <div class="volume-icon" @click="() => playVolume(0.8)">
        <i class="fa fa-volume-up"></i>
      </div>
    </div>
    <div class="item-list-answer mt-5">
      <div class="ratio-4-3">
        <img :src="$getItemImg(unit, item, 1)" alt="" @error="$errorImage" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StarterExample1',
  props: {
    setAnswer: {
      type: Function,
      default: Function
    },
    unit: {
      type: Object,
      default: Object
    },
    item: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    playVolume(speed = 0.8) {
      this.$playVolume(this.$getNativeName(this.item.content.title1), speed)
    }
  }
}
</script>
