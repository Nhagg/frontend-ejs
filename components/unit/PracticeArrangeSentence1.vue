<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Sắp xếp các từ thành 1 câu hoàn chỉnh</h2>
        </div>
      </div>
    </div>
    <div class="listen-item-arrange mt-20vh">
      <button
        v-for="(text, index) in listItem"
        :key="index"
        class="item-arrange"
        @click="() => removeText(index)"
        :disabled="checkedAnswer"
      >
        {{ item.userAnswer ? item.userAnswer[index] : '' }}
      </button>
    </div>
    <div
      v-if="checkedAnswer && userPoint == false"
      class="pt-5 fs-20 fw-500 text-center"
    >
      Đáp án chính xác:
    </div>
    <div
      v-if="checkedAnswer && userPoint == false"
      class="listen-item-arrange mt-4"
    >
      <button
        v-for="(text, index) in correctAnswer.split(breakWork)"
        :key="index"
        class="item-arrange item-selected"
      >
        {{ text }}
      </button>
    </div>
    <div v-if="!checkedAnswer" class="listen-item-arrange mt-5">
      <button
        v-for="(text, index) in listItem"
        :key="index"
        @click="() => selectedText(text)"
        class="item-arrange item-selected"
        :disabled="item.userAnswer && item.userAnswer.find((u) => u == text)"
      >
        {{ text }}
      </button>
    </div>
    <div v-if="!checkedAnswer && unit.type != 'exam'" class="mt-5 text-center">
      <button
        class="btn btn-green btn-check-answer"
        @click="checkAnswer"
        :disabled="item.userAnswer && item.userAnswer.length != listItem.length"
      >
        Kiểm tra
      </button>
    </div>
    <div class="d-none">{{ resetStatus }}</div>
  </div>
</template>
<script>
let breakWork = '***'
export default {
  name: 'PracticeArrangeSentence1',
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
    }
  },
  computed: {
    correctAnswer() {
      return this.$replaceSpecialText(
        this.$_get(this.item, 'content.title2', '')
      )
    },
    listItem() {
      return this.$shuffler(this.correctAnswer.split(breakWork))
    }
  },
  mounted() {
    if (!this.item.userAnswer) {
      this.item.userAnswer = []
    }
  },
  beforeDestroy() {
    if (this.unit.type == 'exam') {
      this.checkAnswer()
    }
  },
  data() {
    return {
      breakWork,
      resetStatus: false,
      checkedAnswer: false,
      userPoint: false,
      disabled: false
    }
  },
  methods: {
    selectedText(text) {
      this.item.userAnswer.push(text)
      this.resetPage()
    },
    removeText(index) {
      this.item.userAnswer.splice(index, 1)
      this.resetPage()
    },
    resetPage() {
      this.resetStatus = !this.resetStatus
    },
    checkAnswer() {
      let res = false
      if (this.item.userAnswer.join(breakWork) == this.correctAnswer) {
        res = true
      }
      this.setAnswer(this.item, res ? this.item.score : 0)
      this.userPoint = res
      this.checkedAnswer = true
    }
  }
}
</script>
