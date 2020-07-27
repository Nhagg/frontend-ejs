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
    <div class="mt-20vh text-center">
      <div class="starter-speak-1-work">
        {{ item.content.image_text1 }}
      </div>
      <div class="h1">
        {{ item.content.title2 }}
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
