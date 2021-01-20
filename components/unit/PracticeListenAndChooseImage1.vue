<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Nghe và Chọn đáp án đúng</h2>
          <div class="volume-icon" @click="playAudio">
            <i class="fa fa-volume-up"></i>
          </div>
        </div>
        <audio ref="myAudio" controls class="d-none">
          <source :src="$getItemAudio(item)" type="audio/mpeg" />
          <source :src="$getItemAudio()" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
    <div class="row mt-5">
      <div v-for="i in listAnswer" :key="i" class="col-sm-4">
        <div class="item-answer">
          <div class="item-img ratio-4-3">
            <img
              :src="$getItemImg(unit, item, i)"
              alt=""
              @error="onErrorImg"
              @click="() => checkAnswer(i)"
            />
            <!--            <i-->
            <!--              class="fas fa-check-circle"-->
            <!--              :class="unit.type != 'exam' && userAnswer === i && i == getCorrectAnswer ? 'text-success' : 'text-danger'"-->
            <!--            />-->
            <!--            <i-->
            <!--              v-if="unit.type != 'exam' && userAnswer === i && i != getCorrectAnswer"-->
            <!--              class="fas fa-check-circle text-danger"-->
            <!--            />-->
            <!--            <i-->
            <!--              v-if="unit.type == 'exam' && userAnswer === i"-->
            <!--              class="fas fa-check-circle text-yellow"-->
            <!--            />-->
          </div>
        </div>
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
      userAnswer: null,
      listAnswer: this.$shuffler([1, 2, 3])
    }
  },
  methods: {
    onErrorImg(event) {
      event.target.src = require('~/assets/img/default.png')
    },
    playAudio() {
      this.$refs.myAudio.play()
    },
    checkAnswer(i) {
      if (this.unit.type != 'exam' && this.userAnswer != null) {
        return
      }
      this.userAnswer = i
      this.item.userAnswer = i
      this.setAnswer(
        this.item,
        i === this.getCorrectAnswer() ? this.item.score : 0
      )
    },
    getCorrectAnswer() {
      return parseInt(this.item.content.correct_answer)
    }
  }
}
</script>
