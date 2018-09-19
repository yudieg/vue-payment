<template>
    <div>
        <h3>Credit Card</h3>
        <card-list></card-list>
        <display-value data-src="http://localhost:3000/display_value"/>
    </div>
</template>
<script>
import CardList from './CardList'
import DisplayValue from './DisplayValue'
// import data from '@/mocks/payment-methods-data.json'

export default {
  name: 'payment-methods',
  components: {CardList, DisplayValue}
}
</script>
<style scoped>
h2, h1{
    color:#888;
}
ul{
  margin:0;
  padding:0;
}
li {
  list-style:none;
  margin:0;
  padding: 3px 10px;
  border-bottom:1px solid #ddd;
}
.editor {
  padding:10px;
  background:#eee;
}
.wallet-title{
  display:block;
  padding:10px
}
</style>
