<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2>Đọc đoạn văn và trả lời đúng sai</h2>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-sm-7">
        <img
          :src="$getItemImg(unit, item, 1)"
          @error="$errorImage"
          class="w-100"
        />
      </div>
      <div class="col-sm-5">
        <div class="list-true-false list-true-false-read">
          <h2>
            {{ item.content.title2 }}
          </h2>
          <div
            @click="() => checkAnswer('true')"
            class="item-boolean"
            :class="{
              'item-true':
                unit.type != 'exam' && showAnswer && correctAnswer == 'true',
              'item-false':
                unit.type != 'exam' && showAnswer && correctAnswer == 'false'
            }"
          >
            <i
              class="fa fa-times-circle"
              :class="{
                'text-yellow': unit.type == 'exam' && item.userAnswer == 'true'
              }"
            ></i>
            Đúng
          </div>
          <div
            @click="() => checkAnswer('false')"
            class="item-boolean"
            :class="{
              'item-true':
                unit.type != 'exam' && showAnswer && correctAnswer == 'false',
              'item-false':
                unit.type != 'exam' && showAnswer && correctAnswer == 'true'
            }"
          >
            <i
              class="fa fa-times-circle"
              :class="{
                'text-yellow': unit.type == 'exam' && item.userAnswer == 'false'
              }"
            ></i>
            Sai
          </div>
        </div>
      </div>
    </div>
    <div class="d-none">{{ resetPage }}</div>
  </div>
</template>
<script>
export default {
  name: 'PracticeReadChooseTrueFalse1',
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
      return this.item.content.correct_answer.toString().toLowerCase()
    }
  },
  data() {
    return {
      resetPage: false,
      showAnswer: false,
      userAnswer: null
    }
  },
  methods: {
    playAudio() {
      this.$refs.myAudio.play()
    },
    checkAnswer(answer) {
      if (this.unit.type != 'exam' && this.showAnswer) {
        return
      }
      this.item.userAnswer = answer
      this.setAnswer(
        this.item,
        this.correctAnswer === answer ? this.item.score : 0
      )
      if (this.unit.type != 'exam') {
        this.showAnswer = true
      }
      this.resetPage = !this.resetPage
    }
  }
}
</script>
