<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 offset-2">
        <div class="h2 border-bottom-red text-center pb-3">
          Thời gian còn lại:
          <span class="h1">
            {{ time }}
          </span>
        </div>
      </div>
      <div class="col-sm-2">Số câu: {{ getProgress() }}</div>
    </div>
  </div>
</template>
<script>
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
    },
    activeItemIndex: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    setInterval(() => {
      let today = new Date()
      let minus = 60 - today.getMinutes()
      let second = 60 - today.getSeconds()
      if (second < 10) {
        second = '0' + second
      }
      if (minus < 10) {
        minus = '0' + minus
      }
      this.time = minus + ':' + second
    }, 1000)
  },
  data() {
    return {
      time: '59:59',
      userAnswer: null,
      listAnswer: this.$shuffler([1, 2, 3, 4])
    }
  },
  methods: {
    getProgress() {
      if (this.activeItemIndex == this.unit.learn_items.length) {
        return this.activeItemIndex + '/' + this.unit.learn_items.length
      }
      return this.activeItemIndex + 1 + '/' + this.unit.learn_items.length
    }
  }
}
</script>
