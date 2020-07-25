<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">
            Cho biết các câu dưới đây được viết lại đúng hay sai
          </h2>
        </div>
      </div>
    </div>
    <div class="mt-5 row">
      <div class="col-sm-10 offset-2">
        <div class="h3">
          {{ $_get(item, 'content.image_text' + 1) }}
        </div>
        <div class="h3">
          {{ $_get(item, 'content.image_text' + 2) }}
        </div>
        <div class="h2 mt-4">
          <i class="fa fa-chevron-double-right mr-3 text-green"></i>
          {{ $_get(item, 'content.image_text' + 3) }}
        </div>
      </div>
    </div>
    <div :class="'list-true-false mt-5'">
      <div
        @click="() => checkAnswer('true')"
        class="item-boolean"
        :class="{
          'item-true': showAnswer && correctAnswer == 'true',
          'item-false': showAnswer && correctAnswer == 'false'
        }"
      >
        <i class="fa fa-check-circle"></i>
        Đúng
      </div>
      <div
        @click="() => checkAnswer('false')"
        class="item-boolean"
        :class="{
          'item-true': showAnswer && correctAnswer == 'false',
          'item-false': showAnswer && correctAnswer == 'true'
        }"
      >
        <i class="fa fa-times-circle"></i>
        Sai
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PracticeCombine2SenctenceTrueFalse1',
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
    correctAnswer() {
      return this.item.content.correct_answer.toString().toLowerCase()
    }
  },
  data() {
    return {
      showAnswer: false,
      domainAPI: this.$store.state.domainAPI,
      userAnswer: null,
      listAnswer: [1, 2, 3]
    }
  },
  methods: {
    checkAnswer(answer) {
      if (this.showAnswer) {
        return
      }
      this.setAnswer(
        this.item,
        this.correctAnswer === answer ? this.item.score : 0
      )
      this.showAnswer = true
    }
  }
}
</script>
