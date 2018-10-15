import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = 'https://j92o4nqpeb.execute-api.us-east-1.amazonaws.com/dev'

Vue.use(Vuex)

export const store = new Vuex.Store({
    data() {
        return {
           items: [
            { 
                id: '00001', 
                projectId: 'SFSCO-6',
                projectScope: 'Desenho de solução',
                userid: 'odenir.tobias.ext@tivit.com',
                datetime: '2018-08-29T15:28:23-03:00',
                account: '0040002900-03',
                crmTicket: 'TVT33331',
            },
                { 
                    id: '00002', 
                    projectId: 'SFSCO-8',
                    projectScope: 'Inclusão de campo em relatório',
                    userid: 'murilo.pedrico@tivit.com',
                    datetime: '2018-09-29T15:28:23-03:00',
                    account: '0040003300-04',
                    crmTicket: 'TVT555551',
           },
        ]
    };
  },
    state: {
        token: localStorage.getItem('access_token') || null,
        backButton: false,
        effort: 
            { 
                id: '', 
                projectId: '',
                projectScope: '',
                userid: '',
                datetime: '',
                account: '',
                crmTicket: '',
            },
        
    },

    getters: {
        loggedIn(state){
            return state.token != null
        },
    },

    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },

        destroyToken(state) {
            state.token = null
        },

        defineBackButton(state, action) {
            state.backButton = action
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
        },
    }
})