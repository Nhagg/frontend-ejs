<template>
  <div class="container pt-5 report-content">
    <div class="list-report">
      <div class="report-item">
        <div class="report-label">
          Từ mới
        </div>
        <div class="report-progress">
          <div class="progress">
            <div
              v-if="getPoint('new_word', 'good')"
              class="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              :style="`width: ${getPoint('new_word', 'good')}%`"
              :aria-valuenow="getPoint('new_word', 'good')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('new_word', 'good') + '%' }}
            </div>
            <div
              v-if="getPoint('new_word', 'middle')"
              class="progress-bar progress-bar-striped bg-warning"
              role="progressbar"
              :style="`width: ${getPoint('new_word', 'middle')}%`"
              :aria-valuenow="getPoint('new_word', 'middle')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('new_word', 'middle') + '%' }}
            </div>
            <div
              v-if="getPoint('new_word', 'bad')"
              class="progress-bar progress-bar-striped bg-danger"
              role="progressbar"
              :style="`width: ${getPoint('new_word', 'bad')}%`"
              :aria-valuenow="getPoint('new_word', 'bad')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('new_word', 'bad') + '%' }}
            </div>
          </div>
        </div>
        <div class="report-result">
          {{ listUnitNewWord.length + '/' + maxNewWork }}
        </div>
      </div>
      <div class="report-item">
        <div class="report-label">
          Ngữ pháp
        </div>
        <div class="report-progress">
          <div class="progress">
            <div
              v-if="getPoint('grammar', 'good')"
              class="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              :style="`width: ${getPoint('grammar', 'good')}%`"
              :aria-valuenow="getPoint('grammar', 'good')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('grammar', 'good') + '%' }}
            </div>
            <div
              v-if="getPoint('grammar', 'middle')"
              class="progress-bar progress-bar-striped bg-warning"
              role="progressbar"
              :style="`width: ${getPoint('grammar', 'middle')}%`"
              :aria-valuenow="getPoint('grammar', 'middle')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('grammar', 'middle') + '%' }}
            </div>
            <div
              v-if="getPoint('grammar', 'bad')"
              class="progress-bar progress-bar-striped bg-danger"
              role="progressbar"
              :style="`width: ${getPoint('grammar', 'bad')}%`"
              :aria-valuenow="getPoint('grammar', 'bad')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('grammar', 'bad') + '%' }}
            </div>
          </div>
        </div>
        <div class="report-result">
          {{ listUnitGrammar.length + '/' + maxGrammar }}
        </div>
      </div>
      <div class="report-item">
        <div class="report-label">
          Phát âm
        </div>
        <div class="report-progress">
          <div class="progress">
            <div
              v-if="getPoint('conversation', 'good')"
              class="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              :style="`width: ${getPoint('conversation', 'good')}%`"
              :aria-valuenow="getPoint('conversation', 'good')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('conversation', 'good') + '%' }}
            </div>
            <div
              v-if="getPoint('conversation', 'middle')"
              class="progress-bar progress-bar-striped bg-warning"
              role="progressbar"
              :style="`width: ${getPoint('conversation', 'middle')}%`"
              :aria-valuenow="getPoint('conversation', 'middle')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('conversation', 'middle') + '%' }}
            </div>
            <div
              v-if="getPoint('conversation', 'bad')"
              class="progress-bar progress-bar-striped bg-danger"
              role="progressbar"
              :style="`width: ${getPoint('conversation', 'bad')}%`"
              :aria-valuenow="getPoint('conversation', 'bad')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('conversation', 'bad') + '%' }}
            </div>
          </div>
        </div>
        <div class="report-result">
          {{ listUnitConversation.length + '/' + maxConversation }}
        </div>
      </div>
      <div class="report-item">
        <div class="report-label">
          Luyện tập
        </div>
        <div class="report-progress">
          <div class="progress">
            <div
              v-if="getPoint('practice', 'good')"
              class="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              :style="`width: ${getPoint('practice', 'good')}%`"
              :aria-valuenow="getPoint('practice', 'good')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('practice', 'good') + '%' }}
            </div>
            <div
              v-if="getPoint('practice', 'middle')"
              class="progress-bar progress-bar-striped bg-warning"
              role="progressbar"
              :style="`width: ${getPoint('practice', 'middle')}%`"
              :aria-valuenow="getPoint('practice', 'middle')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('practice', 'middle') + '%' }}
            </div>
            <div
              v-if="getPoint('practice', 'bad')"
              class="progress-bar progress-bar-striped bg-danger"
              role="progressbar"
              :style="`width: ${getPoint('practice', 'bad')}%`"
              :aria-valuenow="getPoint('practice', 'bad')"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ getPoint('practice', 'bad') + '%' }}
            </div>
          </div>
        </div>
        <div class="report-result">
          {{ listUnitConversation.length + '/' + maxPractice }}
        </div>
      </div>
    </div>
    <div class="work-report mt-4">
      <div class="row">
        <div
          v-for="unitType in learnUnitTypes"
          :key="unitType.type"
          class="col-sm-3"
        >
          <div class="unit-type-header">
            <img
              v-if="unitType.type == 'new_word'"
              src="@/assets/img/unit/new-word.png"
              alt="unitType"
            />
            <img
              v-if="unitType.type == 'conversation'"
              src="@/assets/img/unit/conversation.png"
              alt="unitType"
            />
            <img
              v-if="unitType.type == 'grammar'"
              src="@/assets/img/unit/grammar.png"
              alt="unitType"
            />
            <img
              v-if="unitType.type == 'practice'"
              src="@/assets/img/unit/practice.png"
              alt="unitType"
            />
            <div class="">
              {{ unitType.name }}
            </div>
          </div>
          <div class="listUnit">
            <div
              v-for="unit in listUnit
                .filter((u) => u.learn_unit.type == unitType.type)
                .slice(0, 5)"
              :key="unit.id"
              class="unit-type-item"
            >
              <i
                class="fa fa-check-circle"
                :class="getClassByPercent(unit.progress)"
              ></i>
              <router-link
                :to="getUnitLink(unit, unit.learn_unit)"
                :title="unit.learn_unit.name_forgein_language"
              >
                <div
                  v-html="
                    $convertNameToHtml(unit.learn_unit.name_native_language)
                  "
                  class="japan-name"
                ></div>
                <span class="one-line-text">
                  {{ unit.learn_unit.name_forgein_language }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '~/mixins/index'
import Api from '~/services/Api'
const maxNewWork = 200
const maxGrammar = 25
const maxConversation = 10
const maxPractice = 15
export default {
  name: 'Report',
  mixins: [mixin],
  components: {},
  computed: {
    ...mapState(['domainAPI', 'user']),
    listUnitNewWord() {
      return this.listUnit
        .filter((u) => u.learn_unit.type == 'new_word')
        .sort((a, b) => a.progress - b.progress)
    },
    listUnitGrammar() {
      return this.listUnit.filter((u) => u.learn_unit.type == 'grammar')
    },
    listUnitConversation() {
      return this.listUnit.filter((u) => u.learn_unit.type == 'conversation')
    }
  },
  watch: {
    activeCourse(val) {
      console.log(val)
    }
  },
  async mounted() {
    let userId = this.user.id ? this.user.id : 18
    let res = await Api.get(
      '/api/tracking?user_id=' + userId + '&type=learn_unit'
    )
    console.log(res)
    if (res && res.success) {
      this.listUnit = res.data.sort((a, b) => a.progress - b.progress)
      console.log('listUnit', this.listUnit)
    }
  },
  data() {
    return {
      maxNewWork,
      maxGrammar,
      maxConversation,
      maxPractice,
      learnUnitTypes: [
        {
          type: 'new_word',
          name: 'Từ mới'
        },
        {
          type: 'grammar',
          name: 'Ngữ pháp'
        },
        {
          type: 'conversation',
          name: 'Phát âm'
        },
        {
          type: 'practice',
          name: 'Luyện tập'
        }
      ],
      listUnit: []
    }
  },
  methods: {
    getPoint(wordType, pointType) {
      let listWork = this.listUnit.filter((u) => u.learn_unit.type == wordType)
      if (pointType == 'good') {
        listWork = listWork.filter((u) => u.progress >= 80)
      }
      if (pointType == 'bad') {
        listWork = listWork.filter((u) => u.progress < 50)
      }
      if (pointType == 'middle') {
        listWork = listWork.filter((u) => u.progress >= 50 && u.progress < 80)
      }
      if (wordType == 'new_word') {
        return Math.ceil((listWork.length * 100) / maxNewWork)
      }
      if (wordType == 'grammar') {
        return Math.ceil((listWork.length * 100) / maxGrammar)
      }
      if (wordType == 'conversation') {
        return Math.ceil((listWork.length * 100) / maxConversation)
      }
      return 0
    },
    getUnitLink(unit, unitType) {
      let res = '/lesson/' + unit.lession_id
      if (unitType.type == 'conversation') {
        return res + '/conversation/' + unit.learn_unit_id
      }
      return res + '/unit/' + unit.learn_unit_id
    }
  }
}
</script>
