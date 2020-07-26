<template>
  <div class="container course-detail">
    <div class="row border-bottom-red pb-2">
      <div class="col-sm-10">
        <h2>{{ course.name }}</h2>
      </div>
      <div class="col-sm-2 text-right">
        <div class="btn-group" v-if="activeCourse != 1">
          <button
            class="btn btn-view-type"
            :class="{ active: viewType == 'grid' }"
            @click="viewType = 'grid'"
          >
            <i class="fa fa-th-large"></i>
          </button>
          <button
            class="btn btn-view-type"
            :class="{ active: viewType == 'list' }"
            @click="viewType = 'list'"
          >
            <i class="fa fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="viewType == 'grid'" class="row lesson-list custom-row mt-5">
      <div
        v-for="lesson in listLesson.filter(
          (s) => s.course && s.course.id == activeCourse
        )"
        :key="lesson.id"
        class="col-sm-3"
      >
        <nuxt-link :to="'/lesson/' + lesson.id" class="lesson-content">
          <div class="lesson-card">
            <div class="lesson-img ratio-4-3">
              <img
                :src="domainAPI + '/images/lesson/' + lesson.image"
                alt="lesson-img"
                @error="onErrorImg"
              />
            </div>
            <div class="lesson-body">
              <div class="lesson-title">
                <div
                  v-html="$convertNameToHtml(lesson.name_native_language)"
                  class="lesson-title-native japan-name one-line-text"
                />
                <div class="lesson-result">{{ 0 }}%</div>
              </div>
              <div
                class="lesson-title-trans one-line-text"
                :title="lesson.name_second_language"
              >
                {{ lesson.name_second_language }}
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div v-else class="list-lesson mt-5">
      <nuxt-link
        v-for="(lesson, index) in listLesson.filter(
          (s) => s.course && s.course.id == activeCourse
        )"
        :key="lesson.id"
        :to="'/lesson/' + lesson.id"
        class="lesson-item"
      >
        <div class="lesson-item-content">
          <div class="one-line-text lesson-title">
            {{
              'Bài ' +
                (index + 1) +
                ': ' +
                $getNativeName(lesson.name_native_language)
            }}
          </div>
          <div class="one-line-text" :title="lesson.name_second_language">
            {{ lesson.name_second_language }}
          </div>
        </div>
        <div class="lesson-result">{{ 0 }}%</div>
      </nuxt-link>
    </div>
    <div
      v-if="
        listLesson.filter((s) => s.course && s.course.id == activeCourse) == 0
      "
      class="empty-box"
    >
      <h3>Tính năng đang được cập nhật. Anh/chị vui lòng quay lại sau</h3>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'CourseDetail',
  layout: 'course',
  components: {},
  computed: {
    ...mapState(['domainAPI', 'activeCourse', 'listCourse', 'listLesson']),
    course() {
      if (!this.listCourse) {
        return {}
      }
      let res = this.listCourse.find((c) => c.id == this.activeCourse)
      return res ? res : {}
    }
  },
  mounted() {
    this.$scrollToTop()
  },
  async asyncData({ store, route }) {
    let course_id = route.params.course_id
    course_id = course_id ? course_id : 2
    if (course_id) {
      await store.dispatch('SET_ACTIVE_COURSE', course_id)
    }
    await store.dispatch('GET_LIST_LESSON')
    return {
      viewType: course_id == 1 ? 'list' : 'grid'
    }
  },
  data() {
    return {
      viewType: 'list'
    }
  },
  methods: {
    onErrorImg(event) {
      event.target.src = require('~/assets/img/lesson.png')
    }
  }
}
</script>
