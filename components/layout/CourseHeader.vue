<template>
  <header class="ejs-header">
    <div class="container">
      <div class="row">
        <div class="col-sm-2">
          <nuxt-link to="/" class="header-logo">
            <img src="~/assets/img/logo.png" alt="" />
          </nuxt-link>
        </div>
        <div class="col-sm-10">
          <div class="header-nav">
            <b-navbar>
              <b-navbar-nav>
                <b-nav-item-dropdown text="Khóa học">
                  <b-dropdown-item
                    v-for="course in listCourse"
                    :key="course.id"
                    :to="'/course/' + course.id"
                    :class="{
                      active: activeCourse == course.id
                    }"
                  >
                    {{ course.name }}
                  </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Thi cử">
                  <b-dropdown-item href="/exam">Thi hết tháng</b-dropdown-item>
                  <b-dropdown-item href="/exam">Thi cuối khóa</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/report">Kết quả học tập</b-nav-item>
                <b-nav-item-dropdown class="justify-content-end">
                  <template v-slot:button-content>
                    <i class="far fa-user mr-1 fs-14"></i>
                    {{ user.name ? user.name : 'Nguyễn Hà' }}
                  </template>
                  <b-dropdown-item href="#" @click="logout">
                    {{ 'Đăng xuất' }}
                  </b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-navbar>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CourseHeader',
  components: {},
  computed: {
    ...mapState(['listCourse', 'activeCourse', 'user'])
  },
  methods: {
    logout() {
      console.log('logout')
      this.$cookies.keys().forEach((cookie) => this.$cookies.remove(cookie))
      window.location = '/'
    }
  }
}
</script>
