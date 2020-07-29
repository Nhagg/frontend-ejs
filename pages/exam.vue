<template>
  <div class="container mt-5">
    <h2 class="mt-2 border-bottom-red text-center">
      KỲ THI ĐÁNH GIÁ CHẤT LƯỢNG CUỐI KHÓA N5
    </h2>
    <div class="row mt-5">
      <div class="col-sm-8 offset-2">
        <div class="fw-500">Nội quy phòng thi:</div>
        <ul>
          <li>1. Các thí sinh phải đăng nhập đúng tài khoản của mình để thi</li>
          <li>2. Hệ thống sẽ tự tính giờ theo đúng giờ quy định của kỳ thi</li>
          <li>
            3. Kết quả sẽ được thông báo và ghi nhận ngay sau khi thí sinh hoàn
            thành bài thì hoặc khi hết giờ
          </li>
        </ul>
        <div><span class="fw-500">Số lượng câu hỏi:</span> 100 câu</div>
        <div><span class="fw-500">Thời gian:</span> {{ getTime() }}</div>
        <div><span class="fw-500">Ngày thi:</span> {{ getDate() }}</div>
        <div class="text-center mt-5">
          <nuxt-link to="/lesson/1006000/unit/2020100" class="btn btn-danger">
            Bắt đầu thi
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutUs',
  components: {},
  async mounted() {},
  data() {
    return {
      listLesson: []
    }
  },
  methods: {
    getTime() {
      let res = ''
      let today = new Date()
      res += today.getHours() + ':00 - '
      res += today.getHours() + 1 + ':00'
      return res
    },
    getDate() {
      let res = ''
      let today = new Date()
      res += today.getDate() + '/'
      res += today.getMonth() + 1 + '/'
      res += today.getFullYear()
      return res
    }
  }
}
</script>
