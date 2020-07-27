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
    <div class="listen-and-fill-input">
      <input
        ref="inputListenAndFill1"
        type="text"
        class="form-control ejs-form-control"
        v-model="userAnswer"
        @keypress="onKeyPress"
        :disabled="checkedAnswer"
      />
    </div>
    <div
      v-if="checkedAnswer && userPoint == false"
      class="text-center mt-5 fs-20 fw-500"
    >
      Đáp án chính xác:
    </div>
    <h2 v-if="checkedAnswer && userPoint == false" class="text-center mt-4">
      {{ item.content.correct_answer.toString().split('**')[0] }}
    </h2>
    <div v-if="!checkedAnswer" class="mt-5 text-center">
      <button
        class="btn btn-check-answer btn-green"
        @click="checkAnswer"
        :disabled="!userAnswer"
      >
        Kiểm tra
      </button>
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
      userAnswer: '',
      userPoint: false,
      checkedAnswer: false
    }
  },
  methods: {
    playAudio() {
      this.$refs.myAudio.play()
    },
    onKeyPress(event) {
      if (event.code == 'Enter') {
        this.checkAnswer()
      } else {
        this.item.point = undefined
        this.resetPage()
      }
    },
    checkAnswer() {
      if (this.checkedAnswer) {
        return
      }
      this.checkedAnswer = true
      let userAnswer = this.userAnswer
      let listCorrectAnswers = this.item.content.correct_answer
        .toString()
        .split('**')
      if (
        listCorrectAnswers.find(
          (a) => this.$clearSpecialText(a) == this.$clearSpecialText(userAnswer)
        )
      ) {
        this.setAnswer(this.item, this.item.score)
        this.userPoint = true
      } else {
        this.setAnswer(this.item, 0)
      }
    }
  }
}
</script>
