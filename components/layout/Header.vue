<template>
  <header class="ejs-header">
    <div class="container">
      <div class="row">
        <div class="col-sm-2">
          <nuxt-link to="/course/2" class="header-logo">
            <img src="~/assets/img/logo.png" alt="" />
          </nuxt-link>
        </div>
        <div class="col-sm-10">
          <div class="header-nav">
            <b-navbar right>
              <b-navbar-nav>
                <b-nav-item-dropdown text="Về JVConnect" left>
                  <b-dropdown-item href="/about-us">
                    Giới thiệu trung tâm
                  </b-dropdown-item>
                  <b-dropdown-item href="/our-rule">
                    Nội quy trung tâm
                  </b-dropdown-item>
                  <b-dropdown-item href="/news">
                    Tin tức
                  </b-dropdown-item>
                  <b-dropdown-item href="/our-course">
                    Chương trình học
                  </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Khóa học tiếng Nhật" left>
                  <b-dropdown-item
                    v-for="course in listCourse"
                    :key="course.id"
                    :href="'/course/' + course.id"
                  >
                    {{ course.name }}
                  </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item href="/">Thông báo</b-nav-item>
                <b-nav-item href="/">Liên hệ</b-nav-item>
                <b-nav-item href="#" v-b-modal.login-modal class="user-item">
                  Đăng nhập
                </b-nav-item>
              </b-navbar-nav>
            </b-navbar>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="login-modal" hide-header hide-footer centered>
      <div class="text-center p-4">
        <h4>
          Sign in by JVConnect Account
        </h4>
        <div class="mt-3">
          <a href="#" class="btn btn-login" @click="handleLoginViaGoogle">
            <i class="fab fa-google-plus-g"></i>
          </a>
        </div>
      </div>
    </b-modal>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Api from '~/services/Api'
import AuthService from '~/services/Auth'

export default {
  name: 'Header',
  components: {},
  computed: {
    ...mapState(['listCourse', 'activeCourse'])
  },
  mounted() {
    this.$store.dispatch('GET_LIST_COURSE')
  },
  methods: {
    async handleLoginViaGoogle() {
      console.log(this.$gAuth)
      const gData = await AuthService.authViaGoogle(this.$gAuth)
      let response = Api.post('/api/auth', gData).catch((err) => {
        console.log(err)
      })
      if (!response) {
        response = {
          success: true,
          data: {
            id: 1,
            name: 'Nhạ',
            token: 'fake_token'
          }
        }
        this.$store.commit('setUser', response.data)
      } else {
        let data = response.data
        this.$cookies.set('LEANING_TOKEN', data.data && data.token)
        this.$store.commit('setUser', data.data)
      }
    },
    logout() {
      console.log('logout')
      this.$cookies.keys().forEach((cookie) => this.$cookies.remove(cookie))
      window.location.reload()
    }
  }
}
</script>
