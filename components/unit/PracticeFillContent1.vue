<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Điền từ thích hợp vào chỗ trống</h2>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <h3
        v-for="(text, index) in $_get(item, 'content.title2', '')
          .toString()
          .split('**')"
        :key="index"
        class="mt-3"
      >
        {{ text }}
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PracticeFillContent1',
  props: {
    setAnswer: {
      type: Function,
      default: Function
    },
    resetPage: {
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
  mounted() {},
  data() {
    return {
      userAnswer: '',
      disabled: false
    }
  },
  methods: {
    onKeyPress(event) {
      if (event.code == 'Enter') {
        this.checkAnswer()
      } else {
        this.item.point = undefined
        this.resetPage()
      }
    },
    checkAnswer() {
      if (this.disabled) {
        return
      }
      this.disabled = true
      let userAnswer = this.userAnswer
      let listCorrectAnswers = this.item.content.correct_answer
        .toString()
        .split('**')
      console.log(this.$clearSpecialText(listCorrectAnswers[0]))
      console.log(
        this.$clearSpecialText(listCorrectAnswers[1]),
        this.$clearSpecialText(userAnswer)
      )
      if (
        listCorrectAnswers.find(
          (a) => this.$clearSpecialText(a) == this.$clearSpecialText(userAnswer)
        )
      ) {
        this.setAnswer(this.item, this.item.score)
      } else {
        this.setAnswer(this.item, 0)
      }
    }
  }
}
</script>
