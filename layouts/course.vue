<template>
  <div class="ejs-app">
    <CourseHeader />
    <section class="ejs-content">
      <div class="container-fluid home-container">
        <nuxt />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import CourseHeader from '~/components/layout/CourseHeader'
import Footer from '~/components/layout/Footer'

export default {
  name: 'CourseLayout',
  components: {
    CourseHeader,
    Footer
  },
  async mounted() {
    // await this.$store.dispatch('GET_LIST_COURSE')
    console.log('courser layout')
  },
  data() {
    return {
      menus: [
        {
          id: 1,
          title: '日本語レッソン',
          path: '/'
        },
        {
          id: 2,
          title: '試験',
          path: '/exam'
        },
        {
          id: 3,
          title: '勉強工程結果',
          path: '/report'
        },
        {
          id: 4,
          title: '設定',
          path: '/settings'
        }
      ]
    }
  }
}
</script>
