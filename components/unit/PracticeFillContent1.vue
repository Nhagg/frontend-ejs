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
<!--      <h3-->
<!--        v-for="(text, index) in $_get(item, 'content.title2', '')-->
<!--          .toString()-->
<!--          .replace('…', '...')-->
<!--          .split('...')"-->
<!--        :key="index"-->
<!--        class="mt-5"-->
<!--      >-->
<!--        <span-->
<!--          class="japan-name d-inline"-->
<!--          v-html="$convertNameToHtml(text.split('***')[0])"-->
<!--        ></span>-->
<!--        <input-->
<!--          v-if="text.split('***').length > 1"-->
<!--          type="text"-->
<!--          v-model="item.userAnswer"-->
<!--        />-->
<!--        <span-->
<!--          class="japan-name d-inline"-->
<!--          v-html="$convertNameToHtml(text.split('***')[1])"-->
<!--        ></span>-->
<!--      </h3>-->
      <h3> asasajsj</h3>
      <span
        class="japan-name d-inline"
        v-html="$convertNameToHtml(text.split('***')[0])"
      ></span>
      <input
        v-if="text.split('***').length > 1"
        type="text"
        v-model="item.userAnswer"
      />
      <span
        class="japan-name d-inline"
        v-html="$convertNameToHtml(text.split('***')[1])"
      ></span>
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
    <div v-if="!checkedAnswer && unit.type != 'exam'" class="mt-5 text-center">
      <button
        class="btn btn-check-answer btn-green"
        @click="checkAnswer"
        :disabled="!item.userAnswer"
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
    }
  },
  mounted() {},
  beforeDestroy() {
    if (this.unit.type == 'exam') {
      this.checkAnswer()
    }
  },
  data() {
    return {
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
      let userAnswer = this.item.userAnswer
      let listCorrectAnswers = this.item.content.correct_answer
        .toString()
        .split('**')
      console.log('listCorrectAnswers ', listCorrectAnswers)
      if (
        listCorrectAnswers.find((a) => {
          console.log(' | a: ', a)
          this.$clearSpecialText(a) == this.$clearSpecialText(userAnswer)
        })
      ) {
        this.userPoint = true
        this.setAnswer(this.item, this.item.score)
      } else {
        this.setAnswer(this.item, 0)
      }
    }
  }
}
</script>
