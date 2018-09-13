import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PaymentMethods from '@/components/PaymentMethods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/payment/methods',
      name: 'PaymentMethods',
      component: PaymentMethods
    }
  ]
})
