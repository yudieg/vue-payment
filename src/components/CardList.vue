<template>
    <div class="card-list-component">
        <ul>
            <li v-for="item in wallets" v-bind:key="item.id">
                <div class="wallet-title"><span v-if="item.id!=0">{{ item.id }}.</span><span v-else>New</span> {{item.type}} - {{item.nickname}}
                <button v-on:click="edit(item.id)" v-if="item.id!=0">edit</button>
                </div>
                <div class="editor" v-if="editing == item.id">
                    <!-- todo move this to edit component -->
                    <h4>Edit {{editWallet.type}} - {{editWallet.nickname}}</h4>
                    <div>
                        <p>Card Number: <input type="text" v-model="editWallet.nickname"/></p>
                        <p>Expiration: <select></select></p>

                    </div>
                    <div class="button-row">
                        <button v-on:click.prevent="save">Save</button >
                        <button v-on:click.prevent="cancel">Cancel</button>
                        <div class="more">
                        <button v-on:click.prevent="cancel">Delete</button>
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
<script>
// import data from '@/mocks/payment-methods-data.json'

export default {
  name: 'card-list',
  newWallet: null,
  methods: {
    add: function (type) {
      let newId = 0
      this.editing = newId
      this.newWallet = {
        id: newId,
        type: type,
        method: 'Credit',
        nickname: '0000'
      }
      this.editWallet = this.newWallet
      this.wallets.push(this.newWallet)
    },
    edit: function (id) {
      this.editing = id
      // this.editWallet = {}
      this.editWallet = Object.assign({}, this.getWalletById(id))
      console.log(this.editWallet)
    },
    save: function () {
      if (this.newWallet) {
        let newWallet = this.wallets.pop()
        newWallet.id = null
        this.saveNew(newWallet)
      } else if (this.editing) {
        this.update(this.editing)
      }
    },
    saveNew: function (wallet) {
      this.$http.post('http://localhost:3000/wallets', wallet)
        .then(function (r) {
          console.log(r)
          wallet.id = r.body.id
          this.wallets.push(wallet)
          this.newWallet = null
        }.bind(this))
    },
    update: function (id) {
      this.$http.put('http://localhost:3000/wallets/' + id, this.editWallet)
        .then(function (r) {
          console.log(r)
          this.wallets[this.getWalletIndexById(id)] = this.editWallet
          this.editing = null
        }.bind(this))
    },
    getWalletById: function (id) {
      var wallet = this.wallets.filter(item => item.id === id)
      console.log(wallet)
      if (wallet) {
        return wallet.pop()
      }
    },
    getWalletIndexById: function (id) {
      for (var i in this.wallets) {
        if (this.wallets[i].id === id) {
          return i
        }
      }
    },
    cancel: function () {
      if (this.newWallet) {
        this.wallets.pop()
        this.newWallet = null
      }

      this.editing = null
    },
    nextId: function () {
      this.maxId++
      return this.maxId
    },
    receiveWallets: function (response) {
      console.log(response)
      this.wallets = response.body
    }
  },
  data () {
    console.log(this.data)
    this.$http.get('http://localhost:3000/wallets')
      .then(this.receiveWallets)
    return {
      maxId: 2,
      editing: null,
      editWallet: {},
      wallets: [],

      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
