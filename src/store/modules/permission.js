import { constantRoutes } from '@/router'
import { getUserMenu } from '@/api/user'
import router from '@/router'

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
    getUserMenu() {
      new Promise((resolve, reject) => {
        getUserMenu().then(data => {
          const routes = data2Routes(data)
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

}

export default {
  namespaced: true,
  state: permission.state,
  mutations: permission.mutations,
  actions: permission.actions
}
