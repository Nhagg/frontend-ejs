<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Nghe và điền câu trả lời</h2>
          <div class="volume-icon" @click="playAudio">
            <i class="fa fa-volume-up"></i>
          </div>
        </div>
        <audio ref="myAudio" controls class="d-none">
          <source :src="$getItemAudio(item)" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
    <div class="item-list-answer mt-5">
      <input
        ref="inputListenAndFill1"
        type="text"
        class="form-control ejs-form-control"
        @keypress="checkAnswer"
        :disabled="disabled"
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
    setTimeout(this.playAudio(), 2000)
  },
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    playAudio() {
      this.$refs.myAudio.play()
    },
    checkAnswer(event) {
      if (event.code == 'Enter') {
        this.disabled = true
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
