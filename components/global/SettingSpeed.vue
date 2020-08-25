<template>
  <div class="setting-speed">
    <div class="setting-speed-icon" @click="showContent = !showContent">
      <i class="fa fa-cogs"></i>
    </div>
    <div class="setting-speed-content" v-show="showContent">
      <div class="setting-speed-body">
        <div class="list-speed-value">
          <div
            v-for="speed in listSpeed"
            :key="speed"
            @click="speedValue = speed"
            :class="{
              active: speed == speedValue
            }"
          >
            {{ 'x' + speed }}
          </div>
        </div>
        <div class="speed-progress">
          <b-form-input
            v-model="speedValue"
            type="range"
            min="0.6"
            max="1.4"
            step="0.2"
          ></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    speedValue(val) {
      console.log(val)
      this.$cookies.set('settingSpeed', val)
    }
  },
  data() {
    const listSpeed = [1.4, 1.2, 1, 0.8, 0.6]
    let defaultSpeed = 0
    if (process.client) {
      defaultSpeed = this.$cookies.get('settingSpeed')
    }
    return {
      showContent: false,
      listSpeed,
      speedValue: defaultSpeed ? defaultSpeed : 0.8
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>
