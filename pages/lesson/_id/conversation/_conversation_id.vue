<template>
  <div class="page-conversation">
    <SettingSpeed />
    <span class="d-none">
      {{ resetStatus }}
    </span>
    <div class="study-header">
      <router-link :to="'/lesson/' + lessonID">
        <img src="~/assets/img/logo.png" alt="" />
      </router-link>
      <div class="study-header-text">
        {{ 'Học hội thoại' }}
      </div>
    </div>
    <div class="container-fluid conversation-content" v-if="unit.id">
      <div class="row">
        <div class="col-md-5 left-content">
          <div class="left-main border-right">
            <div class="left-title">
              <h3
                v-html="$convertNameToHtml(unit.name_native_language)"
                class="japan-name"
              ></h3>
              <h3>
                {{ unit.name_forgein_language }}
              </h3>
            </div>
            <div class="context-content" v-if="activeContext.id">
              <div class="img-box">
                <img
                  :src="$getItemImg(unit, activeContext, 1)"
                  alt=""
                  @error="$errorImage"
                />
              </div>
              <div>
                {{ activeContext.content.image_text1 }}
              </div>
            </div>
            <div class="list-person">
              Bạn sẽ là:
              <div
                v-for="i in [1, 2, 3]"
                :key="i"
                class="person"
                :class="{ active: activePersonIndex == i }"
                @click="activePersonIndex = i"
              >
                <span
                  v-html="
                    $convertNameToHtml(itemConfig.content['image_text' + i])
                  "
                  class="japan-name"
                >
                </span>
                <i :class="getPersonClass(i)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7" v-if="activeItem.id">
          <div class="right-content">
            <div v-if="activeItem.id == activeContext.id">
              <button class="btn btn-green" @click="nextPage">
                Bắt đầu hội thoại
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>
            <div
              v-if="activeItem.type == 'conversation_sentence_1'"
              class="list-sentence"
              id="list-sentence"
            >
              <div
                v-for="(item, index) in listSentence.filter(
                  (i) => i.id <= activeItem.id
                )"
                :key="index"
                :id="'sentence-' + item.id"
              >
                <div
                  class="conversation-item"
                  :class="{
                    'conversation-item-active': checkActiveConversation(item)
                  }"
                >
                  <div
                    class="conversation-item-name"
                    v-if="!checkActiveConversation(item)"
                  >
                    <span
                      v-html="$convertNameToHtml(item.content.title1)"
                      class="japan-name"
                    />
                  </div>
                  <div class="conversation-item-text">
                    <div>
                      <div
                        v-html="
                          item.compareHTML
                            ? item.compareHTML
                            : $convertNameToHtml(
                                getSentenceText(item.content['title2'], 0)
                              )
                        "
                        class="japan-name"
                        :class="{ 'compare-text': item.compareHTML }"
                      />
                      <div>
                        {{ getSentenceText(item.content['title2'], 1) }}
                      </div>
                    </div>
                    <div
                      class="volume-icon"
                      @click="
                        playVolume(getSentenceText(item.content['title2'], 0))
                      "
                    >
                      <i class="fa fa-volume-up"></i>
                      <span
                        v-if="item.point"
                        :class="getClassByPercent(getItemPersonPoint(item))"
                      >
                        {{ getItemPersonPoint(item) + '%' }}
                      </span>
                    </div>
                  </div>
                  <div
                    class="conversation-item-name"
                    v-if="checkActiveConversation(item)"
                  >
                    <span
                      v-html="$convertNameToHtml(item.content.title1)"
                      class="japan-name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="activeItem.type == 'conversation_sentence_1'"
              class="list-sentence-footer"
            >
              <div class="content">
                <div v-if="userAnswer">
                  <div v-if="isCorrect()" class="text-green">
                    Đáp án chính xác
                  </div>
                  <div v-else-if="!isCorrect()" class="fs-20">
                    <span>
                      Phát âm của bạn:
                    </span>
                    <div>
                      {{ userAnswer }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="showHintMicro && checkActiveConversation(activeItem)"
                  class="fs-16 pr-2 text-right"
                >
                  Anh/chị bấm nào nút Microphone để phát âm
                </div>
              </div>
              <div
                v-if="checkActiveConversation(activeItem)"
                class="btn-micro"
                :class="{ active: microStatus }"
                @click="toggleMicro"
              >
                <i class="fa fa-microphone-alt"></i>
              </div>
              <button class="btn btn-green btn-continue" @click="nextPage">
                Tiếp theo
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="col-md-7 right-content">
          <div class="right-main">
            <div class="text-result-point text-red">
              <div>
                <h2>Chúc mừng bạn hoàn thành hội thoại</h2>
              </div>
              {{ resultPoint() + '%' }}
            </div>
            <div
              :class="'conversation-footer ' + getClassByPercent(resultPoint())"
            >
              <div class="study-footer-left">
                <i class="fa fa-check-circle"></i>
                {{
                  resultPoint() >= 80
                    ? 'Rất tốt. Bạn có thể thọc từ tiếp theo'
                    : 'Bạn nên học lại để có kết quả tốt hơn '
                }}
              </div>
              <div>
                <button @click="leanAgain" class="btn btn-learn-again">
                  Học lại
                  <i class="fa fa-undo"></i>
                </button>
                <a
                  v-if="nextUnit && nextUnit.id"
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
      </div>
    </div>
  </div>
</template>
<script>
let recognition
import { mapState } from 'vuex'
import mixin from '~/mixins/index'
import Api from '~/services/Api'
import $ from 'jquery'
export default {
  name: 'Unit',
  layout: 'unit',
  mixins: [mixin],
  components: {},
  async mounted() {
    let unitId = this.$route.params.conversation_id
    let lessonID = this.$route.params.id
    await this.$store.dispatch('GET_LIST_LESSON')
    await this.$store.dispatch('GET_LIST_LEARN_UNIT')
    if (!unitId) {
      return
    }
    await Api.get('/api/lessions/' + lessonID)
      .then((res) => {
        this.lesson = res.data
        console.log('lesson', this.lesson)
      })
      .catch((e) => {
        console.log(e)
      })
    await Api.get('/api/learn_units/' + unitId)
      .then((res) => {
        this.unit = res.data
        console.log('unit', this.unit)
      })
      .catch((e) => {
        console.log(e)
      })
    recognition = new window.webkitSpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'ja-JP'
    recognition.onresult = (event) => {
      console.log('onresult')
      this.userAnswer = event.results[0][0].transcript
      console.log(this.userAnswer)
      this.checkAnswer()
      recognition.stop()
      this.microStatus = false
    }
  },
  computed: {
    ...mapState(['listLesson']),
    nextUnit() {
      const { unit } = this
      let listActiveLearnUnit = this.lesson.learn_units
      let unitIndex = listActiveLearnUnit.findIndex((u) => u.id == unit.id)
      if (unitIndex == -1 || unitIndex == listActiveLearnUnit.length - 1) {
        return {}
      }
      console.log('unitIndex', unitIndex, listActiveLearnUnit[unitIndex + 1])
      return listActiveLearnUnit[unitIndex + 1]
    },
    activeItem() {
      let { unit, activeItemIndex } = this
      if (unit && unit.learn_items && unit.learn_items[activeItemIndex]) {
        let res = unit.learn_items[activeItemIndex]
        if (res.type == 'conversation_sentence_1') {
          this.playVolume(this.getSentenceText(res.content['title2'], 0))
          this.$nextTick(() => {
            $('#list-sentence').scrollTop(112000)
          })
        }
        if (!res.score) {
          res.score = 10
        }
        return res
      }
      console.log('activeItem end')
      return {}
    },
    itemConfig() {
      let { unit } = this
      if (unit && unit.learn_items) {
        let item = unit.learn_items.find((i) => i.type == 'conversation_config')
        console.log('itemConfig', item)
        return item ? item : {}
      }
      return {}
    },
    activeContext() {
      let { unit, activeContextIndex } = this
      if (unit && unit.learn_items) {
        let context = unit.learn_items.filter(
          (i) => i.type == 'conversation_context'
        )[activeContextIndex]
        console.log('context', context)
        return context ? context : {}
      }
      return {}
    },
    listSentence() {
      let { unit, activeContext } = this
      if (unit.id && activeContext.id) {
        const activeContextIndex = unit.learn_items.findIndex(
          (i) => i.id == activeContext.id
        )
        let nextContext = unit.learn_items.findIndex(
          (i, index) =>
            i.type == 'conversation_context' && index > activeContextIndex
        )
        if (nextContext == -1) {
          nextContext = 10000
        }
        let res = unit.learn_items.filter(
          (i, index) =>
            i.type == 'conversation_sentence_1' &&
            index < nextContext &&
            index > activeContextIndex
        )
        console.log('listSentence', res)
        return res ? res : []
      }
      return []
    }
  },
  data() {
    return {
      lessonID: this.$route.params.id,
      unitId: this.$route.params.conversation_id,
      compareHTML: '',
      userAnswer: '',
      resetStatus: false,
      microStatus: false,
      showResult: false,
      showHintMicro: true,
      lesson: {},
      unit: {},
      activePersonIndex: 2,
      activeItemIndex: 1,
      activeContextIndex: 0
    }
  },
  methods: {
    toggleMicro() {
      this.showHintMicro = false
      if (this.microStatus) {
        recognition.stop()
      } else {
        recognition.start()
        this.compareHTML = ''
      }
      this.microStatus = !this.microStatus
    },
    getPersonClass(i) {
      return i % 2 == 0 ? 'fa fa-user-circle' : 'fa fa-user'
    },
    checkActiveConversation(item) {
      return this.compareName(
        this.itemConfig.content['image_text' + this.activePersonIndex],
        item.content.title1
      )
    },
    compareName(text1, text2) {
      text1 = text1.replace(/ /g, '')
      text2 = text2.replace(/ /g, '')
      return text1 == text2 ? true : false
    },
    isCorrect() {
      const activeItem = this.activeItem
      return (
        activeItem.point != undefined && activeItem.point == activeItem.score
      )
    },
    nextPage() {
      this.userAnswer = ''
      this.compareHTML = ''
      this.activeItemIndex++
      this.showHintMicro = true
      if (this.activeItem.type == 'conversation_config') {
        this.nextPage()
        return
      }
      if (this.activeItem.type == 'conversation_context') {
        this.activeContextIndex++
      }
      if (this.activeItemIndex == this.unit.learn_items.length) {
        Api.post(
          {
            lession_id: this.lessonID,
            learn_unit_id: this.unitId,
            learn_item_id: 0,
            progress: this.resultPoint(),
            user_id: this.user ? this.user.id : 18
          },
          '/api/tracking'
        )
        this.showResult = true
      }
    },
    resetPage() {
      this.resetStatus = !this.resetStatus
    },
    leanAgain() {
      this.showResult = false
      this.activeContextIndex = 0
      this.activeItemIndex = 1
    },
    setAnswer(item, point, userAnswer = '') {
      console.log('setAns', point, userAnswer)
      item.point = parseInt(point) ? parseInt(point) : 0
      // this.activeItemIndex = this.activeItemIndex
      this.userAnswer = userAnswer
      this.resetPage()
    },
    checkAnswer() {
      let nativeName = this.$getNativeName(
        this.getSentenceText(this.activeItem.content['title2'], 0)
      )
      this.setAnswer(
        this.activeItem,
        this.compareResult(this.userAnswer, nativeName, this.activeItem),
        this.userAnswer
      )
    },
    getFooterClass() {
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
      const listItem = this.unit.learn_items.filter(
        (i) => i.type == 'conversation_sentence_1'
      )
      let totalScore = 0
      listItem.forEach((item) => {
        totalScore += parseInt(item.score)
        if (item.point) {
          totalPoint += parseInt(item.point)
        }
      })
      console.log('resultPoint ed', totalPoint, totalScore)
      let res = parseInt((totalPoint * 100) / totalScore)
      return res ? res : 0
    },
    playVolume(text) {
      this.$playVolume(this.$getNativeName(text))
    },
    getSentenceText(text = '', index = 0) {
      return text.split('--')[index]
    },
    getItemPersonPoint(item) {
      return parseInt((item.point * 100) / item.score)
    }
  }
}
</script>
