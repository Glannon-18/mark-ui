import {login, logout} from '@/api/user'
import {setAvatar, updateUsername} from "@/api/profile";
import {getInfo} from "@/api/profile";
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const {object} = response
        setToken(object.token)
        commit('SET_TOKEN', object.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const {object} = response

        if (!object) {
          reject('Verification failed, please Login again.')
        }

        const {username, photo, roleList} = object

        commit('SET_NAME', username)
        commit('SET_AVATAR', "http://localhost:9528/dev-api/" + photo)
        let roles = []
        roleList.forEach(r => {
          roles.push(r.nameZh)
        })
        commit("SET_ROLES", roles)
        resolve(object)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  updateUsername({commit}, data) {
    return new Promise(resolve => {
      updateUsername(data).then(data => {
        commit("SET_NAME", data.object.updateName)
        resolve(data.msg)
      })
    })
  },
  updateAvatar({commit}, data) {
    return new Promise(resolve => {
      setAvatar({base64: data.replace("data:image/jpeg;base64,", "")}).then(data => {
        commit("SET_AVATAR", "http://localhost:9528/dev-api/" + data.object.name)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

