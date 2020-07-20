<template>
  <div class="home-page">
    <div class="container-fluid">
      <div class="row">
        <b-carousel
          id="carousel-fade"
          class="home-banner"
          style="text-shadow: 0px 0px 2px #000"
          controls
          indicators
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            img-src="~/assets/img/banner/banner.png"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="~/assets/img/banner/banner.png"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="~/assets/img/banner/banner.png"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </div>
    <div class="container-fluid home-new mt-5">
      <div class="row">
        <div class="col-sm-7">
          <h2 class="text-center">
            Phương pháp học tập tiếng Nhật hiệu quả kết hợp học online với
            offline
          </h2>
          <p class="mt-4">
            Thay vì cách học truyền thống, Akira xây dựng giờ học tập trung vào
            các hoạt động, biến kiến thức khô khan thành thực tế sinh động, giúp
            học viên tiếp thu kiến thức dễ dàng hơn. Khi có thể dùng được những
            điều đã học vào cuộc sống, bạn sẽ càng thích thú với tiếng Nhật, dễ
            dàng vượt qua giai đoạn ban đầu.
          </p>
          <div class="text-center mt-4">
            <button class="btn btn-view-more">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
        <div class="col-sm-5">
          <img src="~/assets/img/banner/new.png" alt="" />
        </div>
      </div>
    </div>
    <!--    list course-->
    <div class="home-course mt-5">
      <div class="mark"></div>
      <img src="~/assets/img/banner/course_bg.png" alt="" class="course-bg" />
      <div class="home-course-content">
        <div class="container-fluid">
          <h2 class="text-center mt-5">
            Chương trình đào tạo của JVConnect
          </h2>
          <div class="row mt-5">
            <div class="col-sm-4">
              <img src="~/assets/img/banner/lesson1.png" alt="" />
              <h3 class="mt-4">Học định hướng</h3>
              <p class="mt-3">
                Đồng hành với cộng đồng yêu tiếng Nhật trong suốt 6 năm qua,
                Akira luôn được các học viên đánh giá cao
              </p>
              <a href="#">
                Tìm hiểu thêm >>
              </a>
            </div>
            <div class="col-sm-4">
              <img src="~/assets/img/banner/lesson2.png" alt="" />
              <h3 class="mt-4">Học tiếng Nhật chuyên tu</h3>
              <p class="mt-3">
                Đồng hành với cộng đồng yêu tiếng Nhật trong suốt 6 năm qua,
                Akira luôn được các học viên đánh giá cao
              </p>
              <a href="#">
                Tìm hiểu thêm >>
              </a>
            </div>
            <div class="col-sm-4">
              <img src="~/assets/img/banner/lesson3.png" alt="" />
              <h3 class="mt-4">Học tiếng Nhật chuyên nghành</h3>
              <p class="mt-3">
                Đồng hành với cộng đồng yêu tiếng Nhật trong suốt 6 năm qua,
                Akira luôn được các học viên đánh giá cao
              </p>
              <a href="#">
                Tìm hiểu thêm >>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    home students-->
    <div class="home-student mt-5">
      <h2 class="text-center text-red pb-5">
        Học viên tiêu biểu
      </h2>
      <div class="container mt-5">
        <div class="row">
          <div class="col-sm-4">
            <div class="home-student-card">
              <img src="~/assets/img/banner/student1.png" alt="thanh-tran" />
              <div class="student-quote">
                “Điều tuyệt vời nhất ở Akira là mình được truyền cảm hứng, thái
                độ đúng đắn và phương pháp học tập hiệu quả. Có những thứ đó rồi
                thì ngay cả khi không còn học trên lớp nữa, mình vẫn có thể tự
                mình tìm hiểu và tiếp tục học lên các trình độ cao hơn.”
              </div>
              <div class="student-info">
                Thanh Trần
                <br />
                ĐH Ngoại thương HN
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="home-student-card">
              <img src="~/assets/img/banner/student2.png" alt="thanh-tran" />
              <div class="student-quote">
                “Điều tuyệt vời nhất ở Akira là mình được truyền cảm hứng, thái
                độ đúng đắn và phương pháp học tập hiệu quả. Có những thứ đó rồi
                thì ngay cả khi không còn học trên lớp nữa, mình vẫn có thể tự
                mình tìm hiểu và tiếp tục học lên các trình độ cao hơn.”
              </div>
              <div class="student-info">
                Thanh Trần
                <br />
                ĐH Ngoại thương HN
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="home-student-card">
              <img src="~/assets/img/banner/student3.png" alt="thanh-tran" />
              <div class="student-quote">
                “Điều tuyệt vời nhất ở Akira là mình được truyền cảm hứng, thái
                độ đúng đắn và phương pháp học tập hiệu quả. Có những thứ đó rồi
                thì ngay cả khi không còn học trên lớp nữa, mình vẫn có thể tự
                mình tìm hiểu và tiếp tục học lên các trình độ cao hơn.”
              </div>
              <div class="student-info">
                Thanh Trần
                <br />
                ĐH Ngoại thương HN
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    home partner-->
    <div class="home-partner mt-5">
      <div class="mark"></div>
      <img src="~/assets/img/banner/partner.jpg" alt="" class="course-bg" />
      <div class="home-partner-content">
        <div class="container">
          <h2 class="text-center">Truyền thông và đối tác</h2>
          <p class="text-center mt-3">
            JVConnect đã và đang là đối tác tin cậy của các công ty lớn tại Nhật
            bản trong lĩnh vực cung cấp nhân sự chất lượng cao.
          </p>
          <div class="row mt-5">
            <div class="col-sm-5">
              <img src="~/assets/img/banner/youtube.png" alt="" />
            </div>
            <div class="col-sm-2"></div>
            <div class="col-sm-5">
              <img src="~/assets/img/banner/vtv.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
