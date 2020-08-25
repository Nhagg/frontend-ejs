<template>
  <div class="container-fluid unit-page exam-page">
    <SettingSpeed />
    <span class="d-none">
      {{ resetStatus }}
    </span>
    <div class="study-header">
      <router-link to="/exam">
        <img src="@/assets/img/logo.png" alt="" />
      </router-link>
      <div class="study-header-text">
        Thi cuối khóa
      </div>
    </div>
    <div class="study-content" v-if="unit.id">
      <CountDown :unit="unit" :active-item-index="activeItemIndex" />
      <PracticeListenAndFill1
        v-if="activeItem.type == 'practice_listen_and_fill_1'"
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
      <Default
        v-else
        :key="activeItem.id"
        :setAnswer="setAnswer"
        :result-point="resultPoint()"
        :unit="unit"
        :item="activeItem"
      />
    </div>
    <div v-if="unit.id && activeItem.id" class="study-footer">
      <div>
        <button
          class="btn"
          @click="backPage"
          v-if="activeItem.id && activeItemIndex > 0"
        >
          Quay lại
        </button>
      </div>
      <button class="btn" @click="nextPage" v-if="activeItem.id">
        Tiếp theo
      </button>
    </div>
    <div v-else class="study-footer justify-content-center">
      <nuxt-link to="/" class="btn">
        Trở về trang chủ
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
import Default from '~/components/unit/Default'
import CountDown from '~/components/CountDown'
import Api from '~/services/Api'
export default {
  name: 'Unit',
  layout: 'unit',
  components: {
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
    CountDown,
    Default
  },
  async asyncData({ store, route }) {
    let unitId = route.params.unit_id
    await store.dispatch('GET_LIST_LESSON')
    await store.dispatch('GET_LIST_LEARN_UNIT')
    let unit = {}
    await Api.get('/api/learn_units/' + unitId).then((res) => {
      unit = res.data
    })
    return {
      lessonID: unit.lession_id,
      unit
    }
  },
  computed: {
    ...mapState(['listLesson', 'listLearnUnit', 'user', 'activeCourse']),
    activeItem() {
      let { unit, activeItemIndex } = this
      if (unit && unit.learn_items && unit.learn_items[activeItemIndex]) {
        console.log('activeItem', unit.learn_items[activeItemIndex])
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
  data() {
    return {
      unitId: this.$route.params.unit_id,
      lessonID: 0,
      resetStatus: false,
      unit: {},
      activeItemIndex: 0
    }
  },
  methods: {
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
      this.activeItemIndex++
      //if this is last page => send point
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
      }
    },
    resetPage() {
      this.resetStatus = !this.resetStatus
    },
    setAnswer(item, point, userAnswer = '') {
      console.log('setAns', point, userAnswer)
      item.point = parseInt(point) ? parseInt(point) : 0
      this.resetPage()
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
      })
      return parseInt((totalPoint * 100) / totalScore)
    }
  }
}
</script>
