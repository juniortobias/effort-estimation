import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = 'https://p6crfk07oj.execute-api.sa-east-1.amazonaws.com/dev'

Vue.use(Vuex)

export const store = new Vuex.Store({
    data() {
        return {
          
    }
  },
    state: {
            token: localStorage.getItem('access_token') || null,
            id: '',
            profiles: '',
            roles: '',
            levels: [
                { key:1, value:'Very Low' },
                { key:2, value:'Low' },
                { key:3, value:'Intermediate'  },
                { key:4, value:'High'  },
                { key:5, value:'Very High'  }
            ],
            effort: { 
                        id: '', 
                        projectId: '',
                        projectScope: '',
                        userid: '',
                        createdOn: '',
                        account: null,
                        crmTicket: null,
                        assessmentStakeholder: '',
                        customer: '',
                        testPlan: null,
                        cutoverPlan: null,
                        premises: null,
                        status: '',
                        items: [
                            {
                                id: 1,
                                activity: '',
                                description: '',
                                profile: '',
                                role: '',
                                level: '',
                                quantity: 0,
                                execution: 0,
                                documentation: 0,
                                projectManagement: 0,
                                tests: 0,
                            },
                        ],
                        roadmap: [
                            {
                                'id': 1,
                                'phase':'Project Preparation',
                                'architecture': 0,
                                'functional': 0,
                                'integration': 0,
                                'development': 0,
                                'projectmanagement':0,
                                'documentation':0
                            },
                            {
                                'id': 2,
                                'phase':'Business Blueprint',
                                'architecture': 0,
                                'functional': 0,
                                'integration': 0,
                                'development': 0,
                                'projectmanagement':0,
                                'documentation':0
                            }, 
                            {
                                'id': 3,
                                'phase':'Realization',
                                'architecture': 0,
                                'functional': 0,
                                'integration': 0,
                                'development': 0,
                                'projectmanagement':0,
                                'documentation':0
                            },
                            {
                                'id': 4,
                                'phase':'Final Preparation',
                                'architecture': 0,
                                'functional': 0,
                                'integration': 0,
                                'development': 0,
                                'projectmanagement':0,
                                'documentation':0
                            }, 
                            {
                                'id': 5,
                                'phase':'Go-Live',
                                'architecture': 0,
                                'functional': 0,
                                'integration': 0,
                                'development': 0,
                                'projectmanagement':0,
                                'documentation':0
                            }, 
                        ]
                    },
            efforts: ''
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
        getProfiles(context){
            return new Promise ((resolve, reject) => {
                axios.post('/efforts', {
                    data: {
                        operation: 'list',
                        tableName: 'effortEstimation-profiles',
                        payload: {
                            TableName: 'effortEstimation-profiles'
                        }
                    }
                }).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })

            })
        },

        getRoles(context){
            return new Promise ((resolve, reject) => {
                axios.post('/efforts', {
                    data: {
                        operation: 'list',
                        tableName: 'effortEstimation-roles',
                        payload: {
                            TableName: 'effortEstimation-roles'
                        }
                    }
                }).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })

            })
        },

        createEffort(context, router) {
            axios.get('/getlastid')
                .then(response => { 
                const id = response.data
                let newEffort = JSON.parse(JSON.stringify(this.state.effort))
                newEffort.id = id + 1
                this.state.effort = JSON.parse(JSON.stringify(newEffort))
                router.push({name:'list-detail', params: {id: newEffort.id}, hash:'N' })
                })
                .catch(error => {
                    console.log(error)
                })
        },

        getEfforts(context) {
            axios.post('/efforts', {
                data: {
                    operation: 'list',
                    tableName: 'effortEstimation-efforts',
                    payload: {
                        TableName: 'effortEstimation-efforts'
                    }
                }
            })
            .then(response => {
                this.state.efforts = response.data.Items
            })
            .catch(error => {
                console.log(error)
            })
        },

        getEffort(context, id) {
            return new Promise ((resolve, reject) => {
                axios.post('/efforts', {
                    data: {
                        operation: 'read',
                        tableName: 'effortEstimation-efforts',
                        payload: {
                            Key: {
                                id: id
                            }
                        }
                    }
                }).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })

            })
        },

        deleteEffort(context, id) {
            return new Promise ((resolve, reject) => {
                axios.post('/efforts', {
                    data: {
                        operation: 'delete',
                        tableName: 'effortEstimation-efforts',
                        payload: {
                            Key: {
                                id: id
                            }
                        }
                    }
                }).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })

            })
        },

        saveEffort(context, effort) {
            effort.id = effort.id.toString()
            return new Promise ((resolve, reject) => {
                axios.post('/efforts', {
                    data: {
                        operation: 'create',
                        tableName: 'effortEstimation-efforts',
                        payload: {
                            Item:effort
                        }
                    }
                }).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })

            })
        },

        updateEffort(context, effort) {
            return new Promise ((resolve, reject) => {
                axios.post('/efforts', {
                    data: {
                        operation: 'create',
                        tableName: 'effortEstimation-efforts',
                        payload: {
                            Item:effort
                        }
                    }
                }).then(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                })

            })
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
    },
})