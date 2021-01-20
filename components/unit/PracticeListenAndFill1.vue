<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2 class="mr-3">Nghe và viết lại nội dung nghe được</h2>
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
    <div class="listen-and-fill-input">
      <input
        ref="inputListenAndFill1"
        type="text"
        class="form-control ejs-form-control"
        v-model="item.userAnswer"
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
    // let testStr =
    //   '（話／はなし／）を（聞／き／）いて（正／ただ／）しい（絵／え／）を（選／えら／）んでください'
    // console.log(testStr)
    // let listCharacter = testStr
    //   .split('')
    //   .map((char) => this.addZeros(char.charCodeAt(0).toString(16)))
    //   .join(' ')
    // console.log('listCharacter', listCharacter)
    //
    // // let regex = /（[\w\d]+／/g
    // let kanji = testStr.match(/話[\w\d]+を/g)
    //
    // console.log(kanji)
    //
    // let test = '（話／'
    // let str = test
    //   .split('')
    //   .map((char) => this.addZeros(char.charCodeAt(0).toString(16)))
    //   .join(' ')
    // console.log(test)
    // console.log(str)
  },
  beforeDestroy() {
    if (this.unit.type == 'exam') {
      this.checkAnswer()
    }
  },
  data() {
    return {
      userPoint: false,
      checkedAnswer: false
    }
  },
  methods: {
    addZeros(str) {
      return ('0000' + str).slice(-4)
    },
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
      let userAnswer = this.item.userAnswer
      console.log(this.item)
      let listCorrectAnswers = this.item.content.correct_answer
        .toString()
        .replace(/ /g, '')
        .split('**')
      if (
        listCorrectAnswers.find((correctAns) => {
          // console.log(' | correctAns: ', correctAns)
          this.$clearSpecialText(correctAns) ==
            this.$clearSpecialText(userAnswer)
        })
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
