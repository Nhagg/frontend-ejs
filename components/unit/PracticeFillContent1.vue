<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2>Điền từ thích hợp vào chỗ trống</h2>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <!-- Completed sentences -->
      <h3
        v-for="(completedSentence, index) in completedSentences"
        :key="`completedSentences-${index}`"
        class="mt-5"
      >
        <div
          v-for="(text,
          textIndex) in completedSentence.content.title2.toString().split('…')"
          :key="`content-title2-${textIndex}`"
        >
          <div style="margin-bottom: 35px">
            <span
              class="japan-name d-inline"
              v-html="
                displayCompletedAnswers(text, completedSentence.userAnswer)
              "
            ></span>
          </div>
        </div>
      </h3>
      <!-- Current question -->
      <h3
        v-for="(text, index) in $_get(item, 'content.title2', '')
          .toString()
          .replace('…', '...')
          .split('...')"
        :key="index"
        class="mt-5"
      >
        <div>
          <span
            class="japan-name d-inline"
            v-html="$convertNameToHtml(text.split('***')[0])"
          ></span>
          <input
            v-if="text.split('***').length > 1"
            type="text"
            v-model="userAnswer"
            v-on:keypress="onKeyPress"
          />
          <span
            class="japan-name d-inline"
            v-html="$convertNameToHtml(text.split('***')[1])"
          ></span>
        </div>
      </h3>
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
    },
    completedSentences: {
      type: Array,
      default: Array
    }
  },
  mounted() {},
  data() {
    return {
      conversation: '',
      userAnswer: '',
      checkedAnswer: false,
      userPoint: false,
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
      if (
        listCorrectAnswers.find(
          (a) => this.$clearSpecialText(a) == this.$clearSpecialText(userAnswer)
        )
      ) {
        this.userPoint = true
        this.setAnswer(this.item, this.item.score, userAnswer)
      } else {
        this.setAnswer(this.item, 0, userAnswer)
      }
    },
    displayCompletedAnswers(text, replaceString) {
      return text.replace('***', ' ' + replaceString + ' ')
    }
  }
}
</script>
