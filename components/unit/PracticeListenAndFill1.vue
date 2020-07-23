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
          <div class="volume-icon" @click="playVolume">
            <i class="fa fa-volume-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="item-list-answer pt-4">
      <img :src="$getItemImg(unit, item, activeAnswer)" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PracticeListenAndFill1',
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
    setTimeout(this.playVolume(), 2000)
  },
  data() {
    return {
      activeAnswer: 1
    }
  },
  methods: {
    playVolume() {
      this.$playVolume(this.$getNativeName(this.unit.name_native_language))
    }
  }
}
</script>
