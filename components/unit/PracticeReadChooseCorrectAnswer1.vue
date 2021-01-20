<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col text-center">
        <div class="speak-title">
          <h2>
            Đọc đoạn văn sau và chọn đáp án đúng
          </h2>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-sm-8">
        <img
          :src="domainAPI + '/images/practice/' + item.title2"
          class="w-100"
          @error="$errorImage"
        />
      </div>
      <div class="col-sm-3 offset-1">
        <div v-for="i in listAnswer" :key="i" class="item-answer">
          <div class="item-answer" @click="() => checkAnswer(i)">
            <div class="item-img ratio-4-2">
              <img :src="$getItemImg(unit, item, i)" @error="$errorImage" />
              <i
                v-if="userAnswer !== null && i === 1"
                class="fas fa-check-circle text-success"
              />
              <i
                v-if="userAnswer === i && i !== 1"
                class="fas fa-check-circle text-danger"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PracticeReadChooseCorrectAnswer1',
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
  methods: {
    checkAnswer(i) {
      console.log(this.item)
      if (this.userAnswer != null) {
        return
      }
      this.userAnswer = i
      this.setAnswer(this.item, i === 1 ? this.item.score : 0)
    }
  }
}
</script>
