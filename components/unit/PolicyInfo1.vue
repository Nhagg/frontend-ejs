<template>
  <div class="container">
    <div class="mt-5">
      <div
        class="h1"
        v-html="item.content.title1.replace(/\*\*/g, '<br />')"
      ></div>
      <div class="h2 mt-4">
        {{ $getNativeName(item.content.title2) }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PolicyInfo1',
  props: {
    setAnswer: {
      type: Function,
      default: Function
    },
    unit: {
      type: Object,
      default: Object
    },
    item: {
      type: Object,
      default: Object
    }
  }
}
</script>
