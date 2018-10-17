import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = 'https://j92o4nqpeb.execute-api.us-east-1.amazonaws.com/dev'

Vue.use(Vuex)

export const store = new Vuex.Store({
    data() {
        return {
          
    }
  },
    state: {
        token: localStorage.getItem('access_token') || null,
        effort: 
            { 
                id: '', 
                projectId: '',
                projectScope: '',
                userid: '',
                createdOn: '',
                account: '',
                crmTicket: '',
                owner: '',
                assign: '',
                assessmentStakeholder: '',
                customer: ''
            },
            efforts: [
                { 
                    id: '00001', 
                    projectId: 'SFSCO-6',
                    projectScope: 'Desenho de solução',
                    userid: 'odenir.tobias.ext@tivit.com',
                    createdOn: '2018-08-29T15:28:23-03:00',
                    account: '0040002900-03',
                    crmTicket: 'TVT3331',
                    owner: 'Tobias Junior',
                    assign: 'Tércio Cardoso',
                    assessmentStakeholder: 'Tobias Junior',
                    customer: 'Tenda Atacado',
                    status: 'Saved',
                    items: [
                        {
                        id: '0001',
                        activity: 'Levantamento de Requisitos',
                        description: 'Definição de escopo',
                        profile: 'Architecture',
                        role: 'Solutions Architecture',
                        level: 'L',
                        quantity: 1,
                        execution: 32,
                        documentation: 8,
                        projectManagement: 8,
                        tests: 2,
                        },
                        {
                        id: '0002',
                        activity: 'Especificação Funcional',
                        description: 'Definição de escopo',
                        profile: 'Functional',
                        role: 'Sales and Distribuition (SD)',
                        documentation: 8,
                        execution: 16,
                        level: 'L',
                        quantity: 1,                        
                        projectManagement: 8,
                        tests: 2,
                        },
                        {
                            id: '0003',
                            activity: 'Especificação Funcional',
                            description: 'Definição de escopo',
                            profile: 'Architecture',
                            role: 'Solutions Architect',
                            documentation: 8,
                            execution: 16,
                            level: 'L',
                            quantity: 1,                        
                            projectManagement: 8,
                            tests: 2,
                        },
                    ],
                },
            ]
        
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