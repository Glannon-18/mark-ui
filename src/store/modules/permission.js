import {constantRoutes} from '@/router'
import {getUserMenu} from '@/api/user'
import router from '@/router'
import Layout from '@/layout'

const permission = {
  state: {
    routers: constantRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRoutes.concat(routers)
    }
  },
  actions: {
    getSidebar({commit}) {
      new Promise((resolve, reject) => {
        let asyncRoutes = []
        getUserMenu().then(data => {
          data2Routes(asyncRoutes, data.object)
          console.log(asyncRoutes)
          router.addRoutes(asyncRoutes)
          commit('SET_ROUTERS',asyncRoutes)
          resolve(data)
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
      component: d.parentId === 1 ? Layout : () => import('@/views/' + d.component + '/index'),
      name: d.name,
      children: [],
      meta: {
        title: d.title,
        icon: d.iconCls
      }
    }
    if (d.children) {
      console.log(111)
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
