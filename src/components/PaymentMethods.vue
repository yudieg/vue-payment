<template>
    <div>

        <h2>Payment Methods</h2>

        <h3>Bank Account</h3>
        <ul>
            <li v-for="item in paymentMethods" v-bind:key="item.id">
                <span>Test {{ item.id }} {{item.type}} - {{item.nickname}}</span>
                <button v-on:click="edit(item.id)">edit</button>
                <div v-if="editing == item.id">
                    <!-- todo move this to edit component -->
                    <h4>Edit {{item.type}} - {{item.nickname}}</h4>
                    <div>
                        <p>Nickname: <input type="text" v-model="item.nickname"/></p>
                        <p>Expiration: <select></select></p>

                    </div>
                    <div class="button-row">
                        <button v-on:click="save">Save</button >
                        <button v-on:click="cancel">Cancel</button>
                        <div class="more">
                        <a href="">Delete</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <button v-on:click="add('Check')">Add Payment Method</button>
    </div>
</template>
<style scoped>
h2, h1{
    color:#888;
}
</style>
<script>
import data from '@/mocks/payment-methods-data.json'

export default {
  name: 'PaymentMethods',
  methods: {
    add: function (type) {
      let newId = this.nextId()
      this.editing = newId
      this.paymentMethods.push({
        id: newId,
        type: type,
        nickname: ''
      })
    },
    edit: function (id) {
      this.editing = id
    },
    save: function () {
      this.editing = null
    },
    cancel: function () {
      this.editing = null
    },
    nextId: function () {
      this.maxId++
      return this.maxId
    }
  },
  data () {
    return {
      maxId: 2,
      editing: null,
      paymentMethods: data,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
