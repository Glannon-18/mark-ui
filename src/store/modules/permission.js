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
        getUserMenu().then(data => {
          const routes = data2Routes(data.object)
          commit('SET_ROUTERS', routes)
          router.addRoutes(routes)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

function data2Routes(data) {
  const asyncRoutes = []
  data.forEach(d => {
    const route = {
      path: d.path,
      component: d.parentId === 1 ? Layout : () => import('@/views/' + d.component + '/index'),
      name: d.name,
      meta: {
        title: d.title,
        icon: d.iconCls
      }
    }
    if (d.children & d.children instanceof Array) {
      route.children = data2Routes(d.children)
    }
    asyncRoutes.push(route)
  })
  return asyncRoutes
}

export default {
  namespaced: true,
  state: permission.state,
  mutations: permission.mutations,
  actions: permission.actions
}
