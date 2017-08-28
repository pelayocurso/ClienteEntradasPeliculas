<template>
  <div v-show="activated" class="tab-pane fade">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    props: ['name', 'selected' => false],

    data () {
      return { activated: false };
    },

    mounted() {
      this.activated = this.default;
    },

    computed: {
      href() {
        return '#' + this.name.toLowerCase().replace(/ /g, '-');
      }
    }
  }
</script>
