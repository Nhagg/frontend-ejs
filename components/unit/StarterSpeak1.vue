<template>
  <div class="container newwork-speak-1">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <div class="text-center mr-3">
            <h2
              v-html="$convertNameToHtml(item.content.image_text1)"
              class="japan-name"
            ></h2>
          </div>
          <div class="volume-icon" @click="() => playVolume(0.8)">
            <i class="fa fa-volume-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-sm-4 offset-4">
        <div class="ratio-4-4">
          <img :src="$getItemImg(unit, item, 1)" alt="" @error="$errorImage" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StarterSpeak1',
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
  mounted() {
    setTimeout(this.playVolume(0.6), 2000)
  },
  data() {
    return {
      activeAnswer: 1
    }
  },
  methods: {
    playVolume(speed = 0.8) {
      console.log(
        this.$getNativeName(this.item.content.image_text1),
        this.item.content.image_text1
      )
      this.$playVolume(
        this.$getNativeName(this.item.content.image_text1),
        speed
      )
    }
  }
}
</script>
