<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Nghe và điền câu trả lời</h2>
          <div class="volume-icon" @click="playVolume">
            <i class="fa fa-volume-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="item-list-answer pt-4">
      <input
        ref="inputListenAndFill1"
        type="text"
        class="form-control"
        @keypress="checkAnswer"
      />
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
  mounted() {
    setTimeout(this.playVolume(), 2000)
  },
  data() {
    return {}
  },
  methods: {
    playVolume() {
      let answer = this.item.content.correct_answer.toString().split('**')[0]
      this.$playVolume(answer)
    },
    checkAnswer(event) {
      console.log('checkAnswer')
      if (event.code == 'Enter') {
        let userAnswer = this.$refs.inputListenAndFill1.value
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
            (a) =>
              this.$clearSpecialText(a) == this.$clearSpecialText(userAnswer)
          )
        ) {
          this.setAnswer(this.item, this.item.score)
        } else {
          this.setAnswer(this.item, 0)
        }
      } else {
        this.item.point = undefined
        this.resetPage()
      }
    }
  }
}
</script>
