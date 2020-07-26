<template>
  <div class="container-fluid unit-page">
    <span class="d-none">
      {{ resetStatus }}
    </span>
    <div class="study-header">
      <router-link to="/">
        <img src="@/assets/img/logo.png" alt="" />
      </router-link>
      <div class="study-header-text">
        Học nội quy
      </div>
    </div>
    <div class="study-content container">
      <div class="mt-20vh text-center" v-if="activeItem.title1">
        <div class="h1">{{ activeItem.title1 }}</div>
        <div class="h2 mt-5">{{ activeItem.title2 }}</div>
      </div>
      <div v-else class="mt-20vh">
        <div class="h1 mt-5">
          Chúc mừng bạn đã học xong nội quy trung tâm
        </div>
        <div class="mt-5 text-center">
          <nuxt-link
            :to="'/course/' + activeCourse"
            class="btn btn-green btn-lg"
          >
            <i class="far fa-home mr-2"></i>
            Quay về bài học
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="study-footer">
      <div class="study-footer-left"></div>
      <div>
        <button
          v-if="activeItem.title1"
          class="btn btn-green btn-rule-page"
          @click="nextPage"
        >
          Tiếp theo
          <i class="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
const listData = [
  {
    title1:
      'Điều 1: Tất cả cán bộ công nhân viên phải đeo thẻ tên theo quy định của công ty.',
    title2:
      '第1条：すべての従業員は、会社の規則に従ってネームタグを着用する必要があります。'
  },
  {
    title1:
      'Điều 2: Giữ gìn tài sản, vệ sinh và sử dụng điện nước hiệu quả tiết kiệm',
    title2: '第2条：水の所有、衛生および経済的使用の維持'
  }
]
export default {
  name: 'LearnRule',
  layout: 'unit',
  computed: {
    activeItem() {
      let res = this.listData[this.activeItemIndex]
      return res ? res : {}
    }
  },
  data() {
    return {
      activeCourse: this.$store.state.activeCourse,
      listData,
      activeItemIndex: 0
    }
  },
  methods: {
    nextPage() {
      this.activeItemIndex++
    },
    resetPage() {
      this.resetStatus = !this.resetStatus
    }
  }
}
</script>
