<template>
  <header class="course-header">
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <nuxt-link to="/course/2" class="header-logo">
            <img src="~/assets/img/logo.png" alt="" />
          </nuxt-link>
        </div>
        <div class="col-sm-6">
          <div class="header-nav">
            <b-navbar right>
              <b-navbar-nav>
                <b-nav-item-dropdown text="Học bài" right>
                  <b-dropdown-item href="#">EN</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Thi cử" right>
                  <b-dropdown-item href="#">Thi hết tháng</b-dropdown-item>
                  <b-dropdown-item href="#">Thi cuối khóa</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item href="/report">Kết quả học tập</b-nav-item>
              </b-navbar-nav>
            </b-navbar>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="header-user">
            Nguyễn Thị Duyên
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
