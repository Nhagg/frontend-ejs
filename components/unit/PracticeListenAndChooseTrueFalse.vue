<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Nghe và chọn đúng sai</h2>
          <div class="volume-icon" @click="playAudio">
            <i class="fa fa-volume-up"></i>
          </div>
          <audio ref="myAudio" controls class="d-none">
            <source :src="$getItemAudio(item)" type="audio/mpeg" />
            <source :src="$getItemAudio()" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    <div class="list-true-false">
      <div
        @click="() => checkAnswer('o')"
        class="item-boolean"
        :class="{
          'item-true':
            unit.type != 'exam' && showAnswer && correctAnswer == 'true',
          'item-false':
            unit.type != 'exam' && showAnswer && correctAnswer == 'false'
        }"
      >
        <i
          class="fa fa-check-circle"
          :class="{
            'text-yellow': unit.type == 'exam' && item.userAnswer == 'true'
          }"
        ></i>
        Đúng
      </div>
      <div
        @click="() => checkAnswer('ｘ')"
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
    <div class="d-none">{{ resetPage }}</div>
  </div>
</template>
<script>
export default {
  name: 'PracticeListenAndChooseImage1',
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
      return this.item.content.correct_answer.toString().toLowerCase().replace(/(\r\n|\n|\r)/gm, "")
    }
  },
  data() {
    return {
      resetPage: false,
      showAnswer: false,
      domainAPI: this.$store.state.domainAPI,
      userAnswer: null,
      listAnswer: this.$shuffler([1, 2, 3])
    }
  },
  mounted() {
    setTimeout(this.playAudio(), 2000)
  },
  methods: {
    playAudio() {
      this.$refs.myAudio.play()
    },
    checkAnswer(answer) {
      answer = answer.toString().toLowerCase()
      console.log('answer', answer)
      console.log('correctans', this.correctAnswer)
      if (this.unit.type != 'exam' && this.showAnswer) {
        console.log('ran to here')
        return
      }
      this.item.userAnswer = answer
      this.setAnswer(
        this.item,
        this.correctAnswer == answer ? this.item.score : 0
      )
      if (this.unit.type != 'exam') {
        this.showAnswer = true
      }
      this.resetPage = !this.resetPage
    }
  }
}
</script>
