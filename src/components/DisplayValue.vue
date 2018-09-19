<template>
<div class="display-value">
    <div v-if="src">Source: {{src}}</div> {{data.level}}
    <h3>{{data.display_value_type_id}}: {{data.name}} ({{data.id}})</h3>
    <div>Value: <span class="value">{{data.value}}</span></div>
    <display-value
        v-if="children"
        v-for="child in data.children"
        v-bind:key="child.id"
        v-bind:data="child"
        v-bind:parent="data"
    />
</div>
</template>
<script>
import DisplayValue from './DisplayValue'

export default {
  name: 'display-value',
  components: {DisplayValue},
  props: ['data'],
  created () {
    console.log('created')
  },
  methods: {
    loadData (source) {
      this.$http.get(source).then(this.receiveData)
    },
    receiveData: function (response) {
      console.log('receive data', response.body)
      this.data = response.body
      this.data.level = 0
      console.log(this.children)
    }
  },
  data () {
    var source = this.$attrs['data-src'] ? this.$attrs['data-src'] : ''

    if (source) {
      this.loadData(source)
    }
    return {
      display_value: {
        name: '',
        src: '',
        children: []
      },
      src: source,
      children: []
    }
  }
}
</script>
<style scoped>
    .display-value{
        margin-left:20px;
        padding:10px;
        background:#eee;
        border-radius:5px;
        box-shadow:0 0 8px rgba(0,0,0,0.4);
        border-left:3px solid #000;
    }
    span.value{
        color:#088;
        font-size:0.9em;
    }
    h3{
        padding:0;
        margin:0;
    }
</style>
