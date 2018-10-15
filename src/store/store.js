import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = 'https://j92o4nqpeb.execute-api.us-east-1.amazonaws.com/dev'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
    },

    getters: {
        loggedIn(state){
            return state.token != null
        }
    },

    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },

        destroyToken(state) {
            state.token = null
        }
    },

    actions: {
        destroyToken(context) {
            if (context.getters.loggedIn) {
                //chamada de serviço para logout - descobrir qual é...
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
            }
        },
        retrieveToken(context, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/login', credentials)
                .then(response => {
                    const token = response.data.AuthenticationResult.AccessToken
                    localStorage.setItem('access_token', token)
                    context.commit('retrieveToken', token)
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        }
    }
})