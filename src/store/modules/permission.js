import {constantRoutes} from '@/router'
import {getUserMenu} from '@/api/user'
import router from '@/router'
import Layout from '@/layout'
import store from "@/store";

const permission = {
  state: {
    routes: constantRoutes,
    addRoutes: []
  },
  mutations: {
    SET_ROUTERS: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    getSidebar({commit}) {
      return new Promise((resolve, reject) => {
        let asyncRoutes = []
        getUserMenu().then(data => {
          data2Routes(asyncRoutes, data.object)
          asyncRoutes.push( { path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTERS', asyncRoutes)
          router.addRoutes(asyncRoutes)
          router.options.routes = store.getters.routes
          resolve(asyncRoutes)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

function data2Routes(routes, data) {
  data.forEach(d => {
    const route = {
      path: d.path,
      component: d.parentId === 1 ? Layout : resolve => require([`@/views/${d.component}/index`], resolve),
      name: d.name,
      meta: {
        title: d.title,
        icon: d.iconCls
      },
      children: []
    }
    if (d.children) {
      data2Routes(route.children, d.children)
    }
    routes.push(route)
  })
}

export default {
  namespaced: true,
  state: permission.state,
  mutations: permission.mutations,
  actions: permission.actions
}
