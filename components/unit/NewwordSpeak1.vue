<template>
  <div class="container newwork-speak-1">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <div class="text-center mr-3">
            <h2>{{ unit.name_forgein_language }}</h2>
            <h2
              v-html="$convertNameToHtml(unit.name_native_language)"
              class="japan-name"
            ></h2>
          </div>
          <div class="volume-icon" @click="() => playVolume(0.8)">
            <i class="fa fa-volume-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="item-list-answer">
      <div class="ratio-4-3">
        <img :src="$getItemImg(unit, item, activeAnswer)" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
let playTimeout1, playTimeout2
export default {
  name: 'NewworkPractice1',
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
    playTimeout1 = setTimeout(() => {
      this.activeAnswer = 2
      this.playVolume()
    }, 6000)
    playTimeout2 = setTimeout(() => {
      this.activeAnswer = 3
      this.playVolume(1)
    }, 9000)
  },
  beforeDestroy() {
    clearTimeout(playTimeout1)
    clearTimeout(playTimeout2)
  },
  data() {
    return {
      activeAnswer: 1
    }
  },
  methods: {
    playVolume(speed = 0.8) {
      this.$playVolume(
        this.$getNativeName(this.unit.name_native_language),
        speed
      )
    }
  }
}
</script>
