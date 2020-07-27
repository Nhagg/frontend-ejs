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
  name: 'PracticeListenAndChooseImage1',
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
