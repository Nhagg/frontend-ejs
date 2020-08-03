<template>
  <div class="container">
    <div
      v-if="unit.type == 'policy' || unit.type == 'policy_dormitory'"
      class="mt-20vh text-center"
    >
      <div class="h1">Chúc mừng bạn đã hoàn thành nội quy</div>
      <nuxt-link to="/course/1" class="btn btn-green btn-lg mt-5">
        Quay về bài học chính
      </nuxt-link>
    </div>
    <template v-else>
      <div class="row">
        <div class="col text-center">
          <div
            class="text-result-point"
            :class="{
              'text-red': resultPoint <= 50,
              'text-yellow': resultPoint > 50 && resultPoint < 80,
              'text-green': resultPoint > 80
            }"
          >
            <img src="@/assets/img/result.png" alt="" />
            <div>
              <div class="h2">{{ resultText }}</div>
              <div v-if="unit.type != 'exam' && unit.type != 'starter'">
                <h2
                  v-html="$convertNameToHtml(unit.name_native_language)"
                  class="japan-name"
                ></h2>
                <h2>{{ unit.name_forgein_language }}</h2>
              </div>
            </div>
            <span class="result-point pt-5">
              {{ resultPoint + ' %' }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'NewworkPractice1',
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
    },
    resultPoint: {
      type: Number,
      default: 0
    }
  },
  computed: {
    resultText() {
      if (this.unit.type == 'practice') {
        return 'Chúc mừng anh/chị hoàn thành bài luyện tập'
      }
      if (this.unit.type == 'grammar') {
        return 'Chúc mừng anh/chị học được thêm 1 ngữ pháp mới'
      }
      if (this.unit.type == 'starter') {
        return (
          'Chúc mừng anh/chị học đã hoàn thành ' +
          this.unit.name_forgein_language
        )
      }
      if (this.unit.type == 'exam') {
        return 'Chúc mừng anh/chị học đã hoàn thành bài thi'
      }
      return 'Chúc mừng anh/chị học được thêm 1 từ mới'
    }
  },
  data() {
    return {
      userAnswer: null,
      listAnswer: this.$shuffler([1, 2, 3, 4])
    }
  },
  methods: {}
}
</script>
