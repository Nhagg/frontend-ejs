<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Chọn từ thích hợp để hoàn thành câu dưới</h2>
        </div>
      </div>
    </div>
    <div class="mt-5 listen-item-arrange">
      <button
        v-for="(text, index) in listItem"
        :key="index"
        class="item-arrange"
      >
        {{ text }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PracticeChooseWorkAndChangeFormat',
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
  computed: {
    listItem() {
      let res = this.$replaceSpecialText(
        this.$_get(this.item, 'content.title2', '')
      )
      return this.$shuffler(res.split('/'))
    }
  },
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
