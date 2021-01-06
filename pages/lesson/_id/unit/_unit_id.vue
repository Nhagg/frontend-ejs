<template>
  <div
    class="container-fluid unit-page"
    :class="{ 'exam-page': unit.type == 'exam' }"
  >
    <span class="d-none">
      {{ resetStatus }}
    </span>
    <div class="study-header">
      <router-link :to="getBackRouter()">
        <img src="@/assets/img/logo.png" alt="" />
      </router-link>
      <div class="study-header-text">
        {{ unit.type == 'grammar' ? 'Học ngữ pháp' : '' }}
        {{ unit.type == 'new_word' ? 'Học từ mới' : '' }}
        {{ unit.type == 'practice' ? 'Luyện tập' : '' }}
        {{ unit.type == 'policy' ? 'Học nội quy' : '' }}
        {{ unit.type == 'starter' ? 'Học chữ cái' : '' }}
        {{ unit.type == 'exam' ? 'Thi cuối khóa' : '' }}
      </div>
    </div>
    <div class="study-content" v-if="unit.id">
      <CountDown
        v-if="unit.type == 'exam'"
        :unit="unit"
        :active-item-index="activeItemIndex"
      />
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
      <PracticeFillContent1
        v-else-if="activeItem.type == 'practice_fill_content_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :resetPage="resetPage"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeArrangeSentence1
        v-else-if="activeItem.type == 'practice_arrange_sentence_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeReadChooseTrueFalse1
        v-else-if="activeItem.type == 'practice_read_choose_true_false_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeChooseWorkAndChangeFormat
        v-else-if="activeItem.type == 'practice_choose_word_and_change_fomart'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeReadChooseCorrectAnswer1
        v-else-if="activeItem.type == 'practice_read_choose_correct_answer_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeVerbChangeFormat1
        v-else-if="activeItem.type == 'practice_verb_change_format_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeSeePictureCompleteScentence1
        v-else-if="
          activeItem.type == 'practice_see_picture_complete_scentence_1'
        "
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeCombine2SenctenceTrueFalse1
        v-else-if="
          activeItem.type == 'practice_combine_2_senctence_true_false_1'
        "
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PracticeCompletedScentenceByExistingWords1
        v-else-if="
          activeItem.type == 'practice_completed_scentence_by_existing_words_1'
        "
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <PolicyInfo1
        v-else-if="activeItem.type == 'policy_intormation_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <StarterSpeak1
        v-else-if="activeItem.type == 'starter_speak_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <StarterExample1
        v-else-if="activeItem.type == 'starter_example_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <StarterPractice1
        v-else-if="activeItem.type == 'starter_practice_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :unit="unit"
        :item="activeItem"
      />
      <StarterPronunciation1
        v-else-if="activeItem.type == 'starter_pronounciation_1'"
        :key="activeItem.id"
        :setAnswer="setAnswer"
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
    <div
      v-if="unit.id && unit.type != 'policy'"
      :class="'study-footer ' + getFooterClass()"
    >
      <div class="study-footer-left" v-if="activeItem.point != undefined">
        <i class="fa fa-check-circle"></i>
        <div v-if="isCorrect()">
          Đáp án chính xác
        </div>
        <div v-else-if="!isCorrect()">
          <span v-if="userAnswer"> Phát âm của bạn: {{ userAnswer }} </span>
          <span v-else>
            Đáp án không chính xác
          </span>
        </div>
      </div>
      <div v-else-if="showResult" class="study-footer-left">
        <i class="fa fa-check-circle"></i>
        {{
          this.resultPoint() >= 80
            ? 'Rất tốt. Bạn có thể thọc từ tiếp theo'
            : 'Bạn nên học lại để có kết quả tốt hơn '
        }}
      </div>
      <div v-else class="study-footer-left"></div>
      <div>
        <button
          class="btn mr-3"
          @click="backPage"
          v-if="activeItem.id && unit.type == 'exam' && activeItemIndex > 0"
        >
          <i class="fa fa-arrow-left"></i>
          Quay lại
        </button>
        <button class="btn" @click="nextPage" v-if="activeItem.id">
          Tiếp theo
          <i class="fa fa-arrow-right"></i>
        </button>
        <div v-if="!activeItem.id && unit.type != 'exam'">
          <button @click="leanAgain" class="btn">
            Học lại
            <i class="fa fa-redo"></i>
          </button>
          <a
            v-if="unit.type != 'starter' && nextUnit.id"
            :href="'/lesson/' + lessonID + '/unit/' + nextUnit.id"
            class="btn ml-3"
          >
            Học tiếp
            <i class="fa fa-arrow-right"></i>
          </a>
          <a
            v-if="unit.type == 'starter' && nextLesson.id"
            :href="'/lesson/' + nextLesson.id"
            class="btn ml-3"
          >
            Học tiếp
            <i class="fa fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
    <div v-if="activeItem.id && unit.type == 'policy'" class="study-footer">
      <div class="study-footer-left"></div>
      <div>
        <button
          class="btn btn-green btn-rule-page"
          @click="nextPage"
          :disabled="countDownPolicy > 0"
        >
          Tiếp theo {{ countDownPolicy ? `(${countDownPolicy})` : '' }}
          <i class="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <SettingSpeed />
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
import PracticeFillContent1 from '~/components/unit/PracticeFillContent1'
import PracticeArrangeSentence1 from '~/components/unit/PracticeArrangeSentence1'
import PracticeReadChooseTrueFalse1 from '~/components/unit/PracticeReadChooseTrueFalse1'
import PracticeChooseWorkAndChangeFormat from '~/components/unit/PracticeChooseWorkAndChangeFormat'
import PracticeReadChooseCorrectAnswer1 from '~/components/unit/PracticeReadChooseCorrectAnswer1'
import PracticeVerbChangeFormat1 from '~/components/unit/PracticeVerbChangeFormat1'
import PracticeSeePictureCompleteScentence1 from '~/components/unit/PracticeSeePictureCompleteScentence1'
import PracticeCombine2SenctenceTrueFalse1 from '~/components/unit/PracticeCombine2SenctenceTrueFalse1'
import PracticeCompletedScentenceByExistingWords1 from '~/components/unit/PracticeCompletedScentenceByExistingWords1'
import PolicyInfo1 from '~/components/unit/PolicyInfo1'
import StarterSpeak1 from '~/components/unit/StarterSpeak1'
import StarterExample1 from '~/components/unit/StarterExample1'
import StarterPractice1 from '~/components/unit/StarterPractice1'
import StarterPronunciation1 from '~/components/unit/StarterPronunciation1'
import SettingSpeed from '~/components/global/SettingSpeed'
import Default from '~/components/unit/Default'
import CountDown from '~/components/CountDown'
import Api from '~/services/Api'
const FREE_TYPE = [
  'newword_speak_1',
  'grammar_speak_1',
  'grammar_speak_2',
  'starter_speak_1',
  'starter_example_1'
]
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
    PracticeFillContent1,
    PracticeArrangeSentence1,
    PracticeReadChooseTrueFalse1,
    PracticeChooseWorkAndChangeFormat,
    PracticeReadChooseCorrectAnswer1,
    PracticeVerbChangeFormat1,
    PracticeSeePictureCompleteScentence1,
    PracticeCombine2SenctenceTrueFalse1,
    PracticeCompletedScentenceByExistingWords1,
    PolicyInfo1,
    StarterSpeak1,
    StarterExample1,
    StarterPractice1,
    StarterPronunciation1,
    CountDown,
    SettingSpeed,
    Default
  },
  computed: {
    ...mapState(['listLesson', 'user']),
    nextUnit() {
      const { unit, lesson } = this
      let listActiveLearnUnit = lesson.learn_units
      let unitIndex = listActiveLearnUnit.findIndex((u) => u.id == unit.id)
      if (unitIndex == -1 || unitIndex == listActiveLearnUnit.length - 1) {
        return {}
      }
      return listActiveLearnUnit[unitIndex + 1]
    },
    nextLesson() {
      const { listLesson, lesson } = this
      let listItem = listLesson.filter((l) => l.course.id == lesson.course.id)
      let itemIndex = listItem.findIndex((u) => u.id == lesson.id)
      if (itemIndex == -1 || itemIndex == listItem.length - 1) {
        return {}
      }
      return listItem[itemIndex + 1]
    },
    activeItem() {
      let { unit, activeItemIndex } = this
      if (unit && unit.learn_items && unit.learn_items[activeItemIndex]) {
        let res = unit.learn_items[activeItemIndex]
        if (!res.score) {
          res.score = 10
        }
        return res
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
  watch: {
    activeItem(val) {
      if (val.type == 'policy_intormation_1') {
        this.createCountDownPolicy()
      }
    }
  },
  async asyncData({ store, route }) {
    let unitId = route.params.unit_id
    let lessonID = route.params.id
    await store.dispatch('GET_LIST_LESSON')
    await store.dispatch('GET_LIST_LEARN_UNIT')
    let lesson = {}
    let unit = {}
    await Api.get('/api/lessions/' + lessonID).then((res) => {
      lesson = res.data
    })
    await Api.get('/api/learn_units/' + unitId).then((res) => {
      unit = res.data
    })
    return {
      lesson,
      unit
    }
  },
  async mounted() {
    await this.$store.dispatch('GET_LIST_LESSON')
    this.createCountDownPolicy()
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
      countDownPolicy: 5,
      activeItemIndex: 0
    }
  },
  methods: {
    createCountDownPolicy() {
      window.setTimeout(() => {
        this.countDownPolicy = 5
      }, 0)
      window.setTimeout(() => {
        this.countDownPolicy = 4
      }, 1000)
      window.setTimeout(() => {
        this.countDownPolicy = 3
      }, 2000)
      window.setTimeout(() => {
        this.countDownPolicy = 2
      }, 3000)
      window.setTimeout(() => {
        this.countDownPolicy = 1
      }, 4000)
      window.setTimeout(() => {
        this.countDownPolicy = 0
      }, 5000)
    },
    getBackRouter() {
      let unit = this.unit
      if (unit.type == 'policy' || unit.type == 'starter') {
        return '/course/1'
      }
      return '/lesson/' + this.lessonID
    },
    isCorrect() {
      const activeItem = this.activeItem
      return (
        activeItem.point != undefined &&
        activeItem.point == activeItem.score &&
        activeItem.point > 0
      )
    },
    backPage() {
      this.activeItemIndex--
    },
    nextPage() {
      if (this.unit.type == 'exam') {
        this.getAnswer
      }
      this.userAnswer = ''
      this.countDownPolicy = 5
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
        Api.post(
          {
            lession_id: this.lessonID,
            learn_unit_id: this.unitId,
            learn_item_id: 0,
            progress: this.resultPoint(),
            user_id: this.user.id ? this.user.id : 18
          },
          '/api/tracking'
        )
        this.showResult = true
      }
      // reset countDownTime
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
      item.point = parseInt(point) ? parseInt(point) : 0
      this.userAnswer = userAnswer
      this.resetPage()
    },
    getFooterClass() {
      if (this.unit.type == 'exam') {
        return ''
      }
      if (this.activeItem.point != undefined) {
        return this.isCorrect() ? 'correct' : 'incorrect'
      }
      if (this.showResult) {
        return this.resultPoint() >= 80 ? 'correct' : 'incorrect'
      }
      return ''
    },
    resultPoint() {
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
