<template>
  <header class="ejs-header">
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <nuxt-link to="/" class="header-logo">
            <img src="~/assets/img/logo.png" alt="" />
          </nuxt-link>
        </div>
        <div class="col-sm-9">
          <div class="header-nav">
            <b-navbar>
              <b-navbar-nav>
                <b-nav-item href="/course/2">Học bài</b-nav-item>
                <b-nav-item-dropdown text="Thi cử">
                  <b-dropdown-item href="#">Thi hết tháng</b-dropdown-item>
                  <b-dropdown-item href="#">Thi cuối khóa</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item href="/report">Kết quả học tập</b-nav-item>
                <b-nav-item href="#" class="ml-4 user-item">
                  Nguyễn Thị Duyên
                  <img
                    src="@/assets/img/banner/student1.png"
                    alt=""
                    class="user-avatar"
                  />
                </b-nav-item>
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
    ...mapState(['listCourse', 'activeCourse'])
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>
