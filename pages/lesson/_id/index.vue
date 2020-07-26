<template>
  <div class="container detail-lesson">
    <div class="detail-lesson-header">
      <div class="lesson-name">
        <h1>
          <span
            class="japan-name"
            v-html="$convertNameToHtml(lesson.name_native_language)"
          ></span>
        </h1>
        <div class="lesson-title-trans">
          {{ lesson.name_second_language }}
        </div>
      </div>
      <div class="progress-circle" data-progress="10"></div>
    </div>
    <div class="row custom-row mt-3" v-if="lesson.learn_units">
      <div class="col-md-8">
        <div class="unit-type-header">
          <img src="@/assets/img/unit/new-word.png" alt="unitType" />
          <div class="">
            {{ 'Học từ mới' }}
            <span class="fs-16">
              {{
                listLearnedUnit.filter(
                  (learnUnit) =>
                    learnUnitTypes.findIndex(
                      (type) =>
                        type.type == learnUnit.learn_unit.type &&
                        learnUnit.lession_id
                    ) == -1
                ).length
              }}
              /
              {{
                lesson.learn_units.filter(
                  (u) =>
                    learnUnitTypes.findIndex((type) => type.type == u.type) ==
                    -1
                ).length
              }}
            </span>
          </div>
        </div>
        <div class="row custom-row list-unit">
          <div
            v-for="unit in lesson.learn_units.filter(
              (u) =>
                learnUnitTypes.findIndex((type) => type.type == u.type) == -1
            )"
            :key="unit.id"
            class="col-md-4"
          >
            <div class="unit-type-item">
              <i class="fa fa-check-circle" :class="getClassByUnit(unit)"></i>
              <router-link :to="'/lesson/' + lesson.id + '/unit/' + unit.id">
                <div
                  class="one-line-text"
                  :title="$getNativeName(unit.name_native_language)"
                >
                  {{ $getNativeName(unit.name_native_language) }}
                </div>
                <span class="one-line-text" :title="unit.name_forgein_language">
                  {{ unit.name_forgein_language }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div v-for="unitType in learnUnitTypes" :key="unitType.type">
          <div class="unit-type-header">
            <b-img
              :src="require('@/assets/img/unit/' + unitType.imgUrl)"
              alt="unitTypeunitTypeunitTypeunitType"
            />
            <div class="">
              {{ unitType.name }}
              <span class="fs-16">
                {{
                  listLearnedUnit.filter(
                    (learnUnit) => learnUnit.learn_unit.type == unitType.type
                  ).length
                }}
                /
                {{
                  lesson.learn_units.filter((u) => u.type == unitType.type)
                    .length
                }}
              </span>
            </div>
          </div>
          <div class="list-unit">
            <div
              v-for="unit in lesson.learn_units.filter(
                (u) => u.type == unitType.type
              )"
              :key="unit.id"
              class="unit-type-item"
            >
              <i class="fa fa-check-circle" :class="getClassByUnit(unit)"></i>
              <router-link :to="getUnitLink(unit, unitType)">
                <div
                  class="one-line-text"
                  :title="$getNativeName(unit.name_native_language)"
                >
                  {{ $getNativeName(unit.name_native_language) }}
                </div>
                <span class="one-line-text" :title="unit.name_forgein_language">
                  {{ unit.name_forgein_language }}
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
export default {
  name: 'Lesson',
  layout: 'course',
  mixins: [mixin],
  components: {},
  computed: {
    ...mapState(['listLesson', 'listLearnUnit', 'user'])
  },
  async asyncData({ store, route, redirect }) {
    await store.dispatch('GET_LIST_LESSON')
    await store.dispatch('GET_LIST_LEARN_UNIT')
    let lessonId = route.params.id ? route.params.id : 2
    let lesson = {}
    await Api.get('/api/lessions/' + lessonId)
      .then((res) => {
        lesson = res.data
      })
      .catch((e) => {
        alert(e.message)
      })
    if (lesson.learn_units.length == 1) {
      redirect('/lesson/' + lessonId + '/unit/' + lesson.learn_units[0].id)
    }
    let userId = store.state.user.id ? store.state.user.id : 18
    let res = await Api.get(
      '/api/tracking?user_id=' + userId + '&type=learn_unit'
    )
    let listLearnedUnit = []
    if (res.success) {
      listLearnedUnit = res.data.sort((a, b) => a.progress - b.progress)
    }
    listLearnedUnit = listLearnedUnit.filter((u) => u.lession_id == lessonId)
    return {
      lesson,
      listLearnedUnit
    }
  },
  data() {
    return {
      learnUnitTypes: [
        {
          type: 'grammar',
          imgUrl: 'grammar.png',
          name: 'Ngữ pháp'
        },
        {
          type: 'conversation',
          imgUrl: 'conversation.png',
          name: 'Hội thoại'
        },
        {
          type: 'practice',
          imgUrl: 'practice.png',
          name: 'Làm bài tập'
        }
      ],
      lesson: {},
      listLearnedUnit: [],
      learnUnits: []
    }
  },
  methods: {
    getClassByUnit(unit) {
      let leanedUnit = this.listLearnedUnit.find(
        (u) => u.learn_unit_id == unit.id
      )
      if (leanedUnit) {
        return this.getClassByPercent(leanedUnit.progress)
      }
      return ''
    },
    getUnitLink(unit, unitType) {
      if (unitType.type == 'conversation') {
        return '/lesson/' + this.lesson.id + '/conversation/' + unit.id
      }
      return '/lesson/' + this.lesson.id + '/unit/' + unit.id
    },
    getImgUrl(url) {
      return require(url)
    }
  }
}
</script>
