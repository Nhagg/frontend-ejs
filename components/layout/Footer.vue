<template>
  <footer class="ejs-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <h4>ĐỊA CHỈ LIÊN HỆ</h4>
          <div>
            Công ty cổ phần tư vấn kết nối Việt Nhật JVCONNECT CONSULTING J.S.C
          </div>
          <div class="mt-2">
            Tầng 5 - Tòa nhà Ecolife - 58 Tố Hữu - Trung Văn - Nam Từ Liêm - Hà
            Nội
          </div>
          <!--          <div class="mt-2">-->
          <!--            Room 3210 - A1 Tower, Ecolife Capital Building, 58 Tố Hữu, Nam Từ-->
          <!--            Liêm Dist, Hanoi city, Vietnam.-->
          <!--          </div>-->
          <div class="h5 mt-4 text-base">
            ©2020 Allrights reserved JVConnect JSC
          </div>
        </div>
        <div class="col-sm-2">
          <h4>Hotline</h4>
          <div>
            Trung tâm đào tạo:
            <br />
            <a href="tel:+84 24 666 666 84">(+84) 24 666 666 84</a>
          </div>
          <div class="mt-2">
            Hỗ trợ học viên:
            <br />
            <a href="tel:+84 24 666 666 84">(+84) 24 666 666 84</a>
          </div>
        </div>
        <div class="col-sm-4">
          <h4>KHÓA HỌC TẠI JVCONNECT</h4>
          <div>
            <ul class="footer-list">
              <li v-for="course in listCourse" :key="course.id">
                <nuxt-link :to="'/course/' + course.id" class="text-gray">
                  {{ course.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Footer',
  components: {},
  computed: {
    ...mapState(['listCourse'])
  }
}
</script>
