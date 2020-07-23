<template>
  <div class="ejs-app home-layout">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState(['listCourse', 'activeCourse', 'user'])
  },
  async mounted() {
    console.log('default layout')
    console.log(this.$cookies.get('userCookie'))
    if (this.$cookies.get('userCookie')) {
      console.log('setCookie')
      this.$store.commit('setUser', JSON.parse(this.$cookies.get('userCookie')))
    }
  },
  data() {
    return {
      menus: [
        {
          id: 2,
          title: '弊社について',
          path: '/'
        },
        {
          id: 2,
          title: '教育センター用規則',
          path: '/rules'
        },
        {
          id: 2,
          title: 'ニュース',
          path: '/news'
        },
        {
          title: 'お知らせ',
          path: '/notifications'
        },
        {
          id: 3,
          title: 'コース一覧',
          path: '/courses'
        }
      ]
    }
  },
  methods: {}
}
</script>
