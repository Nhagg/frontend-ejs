<template>
  <div class="container-fluid unit-page">
    <span class="d-none">
      {{ resetStatus }}
    </span>
    <div class="study-header">
      <router-link :to="'/lesson/' + lessonID">
        <img src="@/assets/img/logo.png" alt="" />
      </router-link>
      <div class="study-header-text">
        {{ unit.type == 'grammar' ? 'Học ngữ pháp' : '' }}
        {{ unit.type == 'new_word' ? 'Học từ mới' : '' }}
        {{ unit.type == 'practice' ? 'Luyện tập' : '' }}
      </div>
    </div>
    <div class="study-content" v-if="unit.id">
      <NewwordPractice1
        v-if="
          activeItem.type == 'newword_practice_1' ||
            activeItem.type == 'grammar_practice_1'
        "
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <NewwordPractice2
        v-else-if="
          activeItem.type == 'newword_practice_2' ||
            activeItem.type == 'grammar_practice_2'
        "
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <NewwordSpeak1
        v-else-if="
          activeItem.type == 'newword_speak_1' ||
            activeItem.type == 'grammar_speak_1'
        "
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <NewwordPronunciation1
        v-else-if="
          activeItem.type == 'newword_pronounciation_1' ||
            activeItem.type == 'grammar_pronounciation_1'
        "
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <GrammarInformation2
        v-else-if="
          activeItem.type == 'grammar_information_1' ||
            activeItem.type == 'grammar_information_2'
        "
        :key="activeItem.id + activeItem.showText"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <GrammarSpeak2
        v-else-if="activeItem.type == 'grammar_speak_2'"
        :key="activeItem.id + activeItem.showText"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeListenAndFill1
        v-else-if="activeItem.type == 'practice_listen_and_fill_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :resetPage="resetPage"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeListenAndChooseImage1
        v-else-if="activeItem.type == 'practice_listen_and_choose_image_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :resetPage="resetPage"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeListenAndChooseTrueFalse
        v-else-if="activeItem.type == 'practice_listen_and_choose_true_false'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :resetPage="resetPage"
        :unit="unit"
        :item="activeItem"
      />
      <Default
        v-else
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :result-point="resultPoint()"
        :unit="unit"
        :item="activeItem"
      />
    </div>
    <div v-if="unit.id" :class="'study-footer ' + getFooterClass()">
      <div class="study-footer-left" v-if="!showResult">
        <i class="fa fa-check-circle"></i>
        <div v-if="isCorrect()">
          Đáp án chính xác
        </div>
        <div v-else-if="!isCorrect()">
          <span v-if="userAnswer"> Phát âm của bạn: {{ userAnswer }} </span>
          <span v-else>
            Đáp án không chính xác
          </span>
          <span v-if="showCorrectAnswer()">
            Đáp án chính xác: {{ correctAnswer }}
          </span>
        </div>
      </div>
      <div v-else class="study-footer-left">
        <i class="fa fa-check-circle"></i>
        {{
          this.resultPoint() >= 80
            ? 'Rất tốt. Bạn có thể thọc từ tiếp theo'
            : 'Bạn nên học lại để có kết quả tốt hơn '
        }}
      </div>
      <div>
        <button class="btn" @click="nextPage" v-if="activeItem.id">
          Tiếp theo
          <i class="fa fa-arrow-right"></i>
        </button>
        <div v-else>
          <button @click="leanAgain" class="btn">
            Học lại
            <i class="fa fa-redo"></i>
          </button>
          <a
            v-if="nextUnit.id"
            :href="'/lesson/' + lessonID + '/unit/' + nextUnit.id"
            class="btn ml-3"
          >
            Học tiếp
            <i class="fa fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NewwordPractice1 from '~/components/unit/NewwordPractice1'
import NewwordPractice2 from '~/components/unit/NewwordPractice2'
import NewwordSpeak1 from '~/components/unit/NewwordSpeak1'
import NewwordPronunciation1 from '~/components/unit/NewwordPronunciation1'
import GrammarInformation2 from '~/components/unit/GrammarInformation2'
import GrammarSpeak2 from '~/components/unit/GrammarSpeak2'
import PracticeListenAndFill1 from '~/components/unit/PracticeListenAndFill1'
import PracticeListenAndChooseImage1 from '~/components/unit/PracticeListenAndChooseImage1'
import PracticeListenAndChooseTrueFalse from '~/components/unit/PracticeListenAndChooseTrueFalse'
import Default from '~/components/unit/Default'
import Api from '~/services/Api'
const FREE_TYPE = ['newword_speak_1', 'grammar_speak_1', 'grammar_speak_2']
export default {
  name: 'Unit',
  layout: 'unit',
  components: {
    NewwordPractice1,
    NewwordPractice2,
    NewwordSpeak1,
    NewwordPronunciation1,
    GrammarInformation2,
    GrammarSpeak2,
    PracticeListenAndFill1,
    PracticeListenAndChooseImage1,
    PracticeListenAndChooseTrueFalse,
    Default
  },
  async asyncData({ store, route }) {
    let unitId = route.params.unit_id
    let lessonID = route.params.lesson_id
    await store.dispatch('GET_LIST_LESSON')
    await store.dispatch('GET_LIST_LEARN_UNIT')
    let lesson = {}
    let unit = {}
    await Api.get('/api/lessions/' + lessonID)
      .then((res) => {
        lesson = res.data
      })
      .catch((e) => {
        console.log(e)
      })
    await Api.get('/api/learn_units/' + unitId)
      .then((res) => {
        unit = res.data
      })
      .catch((e) => {
        console.log(e)
      })
    return {
      lesson,
      unit
    }
  },
  computed: {
    ...mapState(['listLesson', 'listLearnUnit', 'user']),
    nextUnit() {
      const { unit, lesson } = this
      let listActiveLearnUnit = lesson.learn_units
      let unitIndex = listActiveLearnUnit.findIndex((u) => u.id == unit.id)
      if (unitIndex == -1 || unitIndex == listActiveLearnUnit.length - 1) {
        return {}
      }
      return listActiveLearnUnit[unitIndex + 1]
    },
    activeItem() {
      let { unit, activeItemIndex } = this
      if (unit && unit.learn_items && unit.learn_items[activeItemIndex]) {
        console.log('activeItem', unit.learn_items[activeItemIndex])
        return unit.learn_items[activeItemIndex]
      }
      return {}
    },
    correctAnswer() {
      return this.activeItem.content.correct_answer
        .toString()
        .toLowerCase()
        .replace('**', ' / ')
    }
  },
  data() {
    return {
      unitId: this.$route.params.unit_id,
      lessonID: this.$route.params.id,
      lesson: {},
      userAnswer: '',
      resetStatus: false,
      showResult: false,
      unit: {},
      activeItemIndex: 0
    }
  },
  methods: {
    isCorrect() {
      const activeItem = this.activeItem
      return (
        activeItem.point != undefined && activeItem.point == activeItem.score
      )
    },
    nextPage() {
      this.userAnswer = ''
      if (
        this.activeItem.type == 'grammar_information_2' &&
        this.activeItem.showText != true
      ) {
        this.activeItem.showText = true
        this.resetPage()
        return
      }
      this.activeItemIndex++
      //if this is last page => send pint
      if (this.activeItemIndex == this.unit.learn_items.length) {
        console.log(Api)
        // Api.savePoint({
        //   lession_id: this.lessonID,
        //   learn_unit_id: this.unitId,
        //   learn_item_id: 0,
        //   progress: this.resultPoint(),
        //   user_id: this.user.id
        // })
        this.showResult = true
      }
    },
    resetPage() {
      this.resetStatus = !this.resetStatus
    },
    leanAgain() {
      this.unit.learn_items.forEach((item) => {
        item.point = undefined
        if (item.type == 'grammar_information_2') {
          item.showText = undefined
        }
      })
      this.showResult = false
      this.activeItemIndex = 0
    },
    setAnswer(item, point, userAnswer = '') {
      console.log('setAns', point, userAnswer)
      item.point = parseInt(point) ? parseInt(point) : 0
      this.userAnswer = userAnswer
      this.resetPage()
    },
    showCorrectAnswer() {
      const listTypeShowAnswer = [
        'practice_listen_and_fill_1',
        'practice_listen_and_fill_1',
        'practice_listen_and_fill_1'
      ]
      if (
        this.activeItem.point != undefined &&
        listTypeShowAnswer.find((d) => d == this.activeItem.type)
      ) {
        return true
      }
      return false
    },
    getFooterClass() {
      console.log('getFooterClass', this.activeItem)
      if (this.activeItem.point != undefined) {
        return this.isCorrect() ? 'correct' : 'incorrect'
      }
      if (this.showResult) {
        return this.resultPoint() >= 80 ? 'correct' : 'incorrect'
      }
      return ''
    },
    resultPoint() {
      console.log('resultPoint')
      let totalPoint = 0
      const listItem = this.unit.learn_items
      let totalScore = 0
      listItem.forEach((item) => {
        totalScore += parseInt(item.score)
        if (item.point) {
          totalPoint += parseInt(item.point)
        }
        if (FREE_TYPE.find((t) => t == item.type)) {
          totalPoint += parseInt(item.score)
        }
      })
      return parseInt((totalPoint * 100) / totalScore)
    }
  }
}
</script>
