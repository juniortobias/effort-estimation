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
            profiles: [
                { key:1, value:'Architecture' },
                { key:2, value:'Functional' },
                { key:3, value:'Integration'  },
                { key:4, value:'Development'  }
            ],
            roles: [
                { key:1, value:'Solutions Architect', parent:1  },
                { key:2, value:'Sales and Distribuition (SD)', parent:2  },
                { key:3, value:'Material Management (MM)', parent:2  },
                { key:4, value:'Financials (FI)', parent:2  },
                { key:5, value:'Production Planning (PP)', parent:2  },
                { key:6, value:'Human Resources (HR)', parent:2  },
                { key:7, value:'Controlling (CO)', parent:2  },
                { key:8, value:'Plant Maintenance (PM)', parent:2  },
                { key:9, value:'Project System (PS)', parent:2  },
                { key:10, value:'ABAP Developer', parent:4  },
                { key:11, value:'SAPUI5/Fiori Developer', parent:4  },
                { key:12, value:'Process Orchestration', parent:3  },
                { key:13, value:'Enterprise Service Bus', parent:3  },

            ],
            levels: [
                { key:1, value:'Very Low' },
                { key:2, value:'Low' },
                { key:3, value:'Intermediate'  },
                { key:4, value:'High'  },
                { key:5, value:'Very High'  }
            ],
            efforts: [
                { 
                    id: 1, 
                    projectId: 'SFSCO-6',
                    projectScope: 'Desenho de solução',
                    userid: 'odenir.tobias.ext@tivit.com',
                    createdOn: '2018-08-29T15:28:23-03:00',
                    account: '0040002900-03',
                    crmTicket: 'TVT-225544',
                    assessmentStakeholder: 'Tobias Junior',
                    customer: 'Tenda Atacado',
                    status: 'Saved',
                    items: [
                        {
                            id: 1,
                            activity: 'Levantamento de Requisitos',
                            description: 'Definição de escopo',
                            profile: 1,
                            role: 1,
                            level: 1,
                            quantity: 1,
                            execution: 32,
                            documentation: 8,
                            projectManagement: 8,
                            tests: 2,
                        },
                        {
                            id: 2,
                            activity: 'Especificação Funcional',
                            description: 'Definição de escopo',
                            profile: 2,
                            role: 2,
                            documentation: 8,
                            execution: 16,
                            level: 2,
                            quantity: 1,                        
                            projectManagement: 8,
                            tests: 2,
                        },
                        {
                            id: 3,
                            activity: 'Especificação Funcional',
                            description: 'Definição de escopo',
                            profile: 1,
                            role: 1,
                            documentation: 8,
                            execution: 24,
                            level: 3,
                            quantity: 1,                        
                            projectManagement: 8,
                            tests: 2,
                        },
                    ],
                    roadmap: [
                        {
                            'phase':'Project Preparation',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        },
                        {
                            'phase':'Business Blueprint',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        }, 
                        {
                            'phase':'Realization',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        },
                        {
                            'phase':'Final Preparation',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'1'
                        }, 
                        {
                            'phase':'Go-Live',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        }, 
                    ]
                },
                { 
                    id: 2, 
                    projectId: 'SFSCO-610',
                    projectScope: 'Implantação do Ariba',
                    userid: 'murilo.pedrico.ext',
                    createdOn: '2018-03-01T09:15:58-03:00',
                    account: '0040363900-05',
                    crmTicket: 'TVT-552233',
                    assessmentStakeholder: 'Murilo Pedrico',
                    customer: 'Sicred',
                    status: 'Released',
                    items: [
                        {
                            id: 1,
                            activity: 'Levantamento de Requisitos',
                            description: 'Definição de escopo',
                            profile: 1,
                            role: 1,
                            level: 4,
                            quantity: 1,
                            execution: 8,
                            documentation: 8,
                            projectManagement: 8,
                            tests: 2,
                        },
                    ],
                    roadmap: [
                        {
                            'phase':'Project Preparation',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        },
                        {
                            'phase':'Business Blueprint',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        }, 
                        {
                            'phase':'Realization',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        },
                        {
                            'phase':'Final Preparation',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        }, 
                        {
                            'phase':'Go-Live',
                            'architecture': '0',
                            'functional': '0',
                            'integration': '0',
                            'development': '0',
                            'projectmanagement':'0',
                            'documentation':'0'
                        }, 
                    ]
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

        saveEffort(state, effort) {
            state.efforts.push(effort)
        },

        updateEffort(state, effort) {
            const index = state.efforts.findIndex(item => item.id == effort.id)
            state.efforts.splice(index, 1, effort)
        }
    },

    actions: {
        saveEffort(context, effort) {
            context.commit('saveEffort',effort)
        },

        updateEffort(context, effort) {
            context.commit('updateEffort',effort)
        },

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