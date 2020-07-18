<template>
  <div class="ejs-app home-layout">
    <header class="ejs-header">
      <div class="container">
        <ul class="nav justify-content-end" v-if="user && user.id">
          <li>
            <a
              href="/"
              class="nav-link"
              :class="{ active: $route.path == '/' }"
            >
              ホーム
            </a>
          </li>
          <li v-for="course in listCourse" :key="course.id" class="nav-item">
            <a
              :href="'/course/' + course.id"
              class="nav-link"
              :class="{ active: $route.path == '/course/' + course.id }"
            >
              {{ course.name }}
            </a>
          </li>
          <li>
            <a class="nav-link" href="#" @click="logout">
              <i class="fa fa-user-alt mr-2"></i>
              {{ user.name || user.email }}
            </a>
          </li>
        </ul>
        <ul v-else class="nav justify-content-end">
          <li>
            <a
              href="/"
              class="nav-link"
              :class="{ active: $route.path == '/' }"
            >
              ホーム
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" v-b-modal.login-modal>
              ログイン
            </a>
          </li>
        </ul>
      </div>
    </header>
    <section class="ejs-content">
      <div class="container-fluid home-container">
        <div class="row">
          <div class="col-sm-3">
            <router-link to="/">
              <img src="~/assets/img/logo.png" alt="" />
            </router-link>
            <ul class="side-bar">
              <li
                v-for="(item, index) in menus"
                :key="index"
                class="sidebar-item"
                :class="{ active: item.path == $route.path }"
              >
                <router-link :to="item.path">{{ item.title }}</router-link>
              </li>
            </ul>
          </div>
          <div class="col-sm-9">
            <Nuxt />
          </div>
        </div>
      </div>
    </section>
    <Footer />
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Footer from '~/components/layout/Footer'
export default {
  name: 'DefaultLayout',
  components: {
    Footer
  },
  computed: {
    ...mapState(['listCourse', 'activeCourse', 'user'])
  },
  async mounted() {
    console.log('default layout')
    // await this.$store.dispatch('GET_LIST_COURSE')
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
  methods: {
    async handleLoginViaGoogle() {
      // const gData = await AuthService.authViaGoogle(this.$gAuth)
      // this.$jquery("#loginModal").modal("hide")
      // this.$modal.show("loading")
      // let response = await axios
      //   .post(window.DOMAIN_API + "/api/auth", gData)
      //   .catch(err => {
      //     console.log(err)
      //   })
      // this.$modal.hide("loading")
      // if (!response) {
      //   response = {
      //     success: true,
      //     data: {
      //       id: 1,
      //       name: "Nhạ",
      //       token: "fake_token"
      //     }
      //   }
      //   this.$store.commit("setUser", response.data)
      // } else {
      //   let data = response.data
      //   this.$cookies.set("LEANING_TOKEN", data.data && data.token)
      //   this.$store.commit("setUser", data.data)
      // }
    },
    logout() {
      console.log('logout')
      window.deleteAllCookies()
      window.location.reload()
    }
  }
}
</script>
