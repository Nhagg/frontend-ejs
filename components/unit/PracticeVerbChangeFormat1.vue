<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2>{{ item.content.title1 }}</h2>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <h3>
        {{ item.content.title2 }}
      </h3>
      <div class="item-list-answer">
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
        <button class="btn btn-check-answer btn-green" @click="checkAnswer">
          Kiểm tra
        </button>
      </div>
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
      checkedAnswer: false,
      userPoint: false,
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
      if (this.checkedAnswer) {
        return
      }
      this.checkedAnswer = true
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
        this.userPoint = true
      } else {
        this.setAnswer(this.item, 0)
      }
    }
  }
}
</script>
