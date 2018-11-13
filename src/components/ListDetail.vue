
<template>
    <div>
        <b-modal ref="modalError" hide-footer size="mm" centered header-bg-variant="danger" header-text-variant="light" title="Validation">
            <div class="d-block text-center">
                <h3>The Effort Estimation form is <span style="color: red">incomplete</span></h3>
            </div>
        </b-modal>

        <div class="topNav">
            <span class="title">Effort Estimation ID: {{ effort.id }} <b-badge>{{ effort.status }}</b-badge></span>
            <div class="topNavRight">
                <b-btn @click="backToList" variant="secondary">Back</b-btn>
                <b-button-group>
                    <b-btn @click="editEffort" :disabled=!this.disabled>Edit</b-btn>
                    <b-btn @click="deleteEffort" :disabled=!this.disabled variant="danger">Delete</b-btn>
                    <b-btn @click="saveEffort" variant="" :disabled=this.disabled>Save</b-btn>
                    <b-btn @click="cancelEdit" variant="" :disabled=this.disabled>Cancel</b-btn>                    
                </b-button-group>
                <b-button-group>
                    <b-btn variant="info" disabled>Send to Release</b-btn>
                    <!-- <b-btn variant="info" disabled>Vision Document</b-btn> -->
                    <b-btn variant="warning" :disabled="this.effort.status != 'Released'">PDF Version</b-btn>
                </b-button-group>
                <b-button-group>
                    <b-btn variant="success" disabled>Approve</b-btn>
                    <b-btn variant="danger" disabled>Reject</b-btn>
                </b-button-group>
                <b-button-group>

                </b-button-group>
            </div>
        </div>
        <b-card bg-variant="light">
            <b-row>
                <b-col sm="1">
                    <label :for="'projectID'">Project ID (Jira):</label>
                </b-col>
                <b-col sm="2">
                    <b-form-input 
                        :id="'projectId'" 
                        :disabled=disabled 
                        v-model="effort.projectId" 
                        :state="!$v.effort.projectId.required ? false : null"
                        >
                    </b-form-input>
                </b-col>

                <b-col sm="1"><label :for="'crmTicket'">CRM Ticket:</label></b-col>
                <b-col sm="2"><b-form-input :id="'crmTicket'" :disabled=this.disabled v-model="effort.crmTicket" :state="!$v.effort.crmTicket.required ? false : null"></b-form-input></b-col>

                <b-col sm="1"><label :for="'dateTime'">Created on:</label></b-col>
                <b-col sm="2"><b-form-input :id="'dateTime'" :disabled=true v-model="effort.createdOn"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col sm="1"><label :for="'assessmentStakeholder'">Assessment Stakeholder:</label></b-col>
                <b-col sm="2"><b-form-input :id="'assessmentStakeholder'" :disabled=this.disabled v-model="effort.assessmentStakeholder" :state="!$v.effort.assessmentStakeholder.required ? false : null"></b-form-input></b-col>

                <b-col sm="1"><label :for="'customer'">Customer:</label></b-col>
                <b-col sm="2"><b-form-input :id="'customer'" :disabled=this.disabled v-model="effort.customer" :state="!$v.effort.customer.required ? false : null"></b-form-input></b-col>

                <b-col sm="1"><label :for="'account'">Account:</label></b-col>
                <b-col sm="2"><b-form-input :id="'account'" :disabled=this.disabled v-model="effort.account" :state="!$v.effort.account.required ? false : null"></b-form-input></b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="1" style="margin-top:1px;"><label :for="'projectScope'">Project Scope:</label></b-col>
                <b-col sm="8"><b-form-textarea :id="'projectScope'" :rows="5" :disabled=this.disabled v-model="effort.projectScope" :state="!$v.effort.projectScope.required ? false : null"></b-form-textarea></b-col>
            </b-row>     
        </b-card>
        <br>
            <b-container fluid>
            <b-row><b-btn size="lg" variant="danger" class="btnAdd" @click="addActivity" :disabled=this.disabled>&plus;</b-btn></b-row>
            <table class="actTable">
                <tr>
                    <th>ID</th>
                    <th>Activity</th>
                    <th>Description</th>
                    <th>Profile</th>
                    <th>Role</th>
                    <th>Level</th>
                    <th style="width:1px">Quantity</th>
                    <th style="width:1px">Execution</th>
                    <th style="width:1px">Document.</th>
                    <th style="width:1px">Proj.Mng.</th>
                    <th v-if="!disabled" style="text-align: center;"><img src="../assets/menu.png"></th>
                </tr>

                    <tr v-for="(v, index) in $v.effort.items.$each.$iter" :key="index">
                        <td style="text-align:center">{{v.id.$model}}</td>
                        <td>
                            <input v-if="!v.activity.$invalid" :disabled=disabled v-model.trim="v.activity.$model" v-bind:class="inputClass" type="text">
                            <input v-else :disabled=disabled v-model.trim="v.activity.$model" class="inputErrorClass" type="text">
                        </td>
                        <td>
                            <input v-if="!v.description.$invalid" :disabled=disabled v-model.trim="v.description.$model" v-bind:class="inputClass" type="text">
                            <input v-else :disabled=disabled v-model.trim="v.description.$model" class="inputErrorClass" type="text">
                        </td>
                        <td>
                            <select v-if="!v.profile.$invalid" :disabled=disabled v-bind:class="inputClass" v-model.trim="v.profile.$model">
                                <option :value="profile.id" v-for="profile in $store.state.profiles" :key="profile.id" :selected="profile.id === v.profile.$model" >{{ profile.value }}</option>
                            </select>
                            <select v-else :disabled=disabled  class="inputErrorClass" v-model.trim="v.profile.$model">
                                <option :value="profile.id" v-for="profile in $store.state.profiles" :key="profile.id" :selected="profile.id === v.profile.$model" >{{ profile.value }}</option>
                            </select>
                        </td>
                        <td>
                            <select v-if="!v.role.$invalid" :disabled=disabled v-bind:class="inputClass" v-model.trim="v.role.$model">
                                <option :value="role.id" v-for="role in filteredRoles(v.profile.$model)" :key="role.id" >
                                    {{ role.value }}</option>
                            </select>
                            <select v-else :disabled=disabled class="inputErrorClass" v-model.trim="v.role.$model">
                                <option :value="role.id" v-for="role in filteredRoles(v.profile.$model)" :key="role.id" >
                                    {{ role.value }}</option>
                            </select>
                        </td>
                        <td>
                            <select v-if="!v.level.$invalid" :disabled=disabled v-bind:class="inputClass" v-model.trim="v.level.$model" :selected="fillTime(v.role.$model, v.level.$model,index,v.id.$model)" @change="sumItem(v.id.$model)">
                                <option :value="level.key" v-for="level in $store.state.levels" :key="level.key" >{{ level.value }}</option>
                            </select>
                            <select v-else :disabled=disabled class="inputErrorClass" v-model.trim="v.level.$model" >
                                <option :value="level.key" v-for="level in $store.state.levels" :key="level.key" >{{ level.value }}</option>
                            </select>
                        </td>
                        <td>
                            <input v-if="!v.quantity.$invalid" :disabled=disabled 
                                   v-model.trim="v.quantity.$model" 
                                   v-bind:class="inputClass" 
                                   @keyup="sumItem(v.id.$model)" 
                                   @change="sumItem(v.id.$model)" 
                                   class="inputTime"
                                   type="number">
                            <input v-else :disabled=disabled 
                                   v-model.trim="v.quantity.$model" 
                                   v-bind:class="inputClass" 
                                   @keyup="sumItem(v.id.$model)" 
                                   @change="sumItem(v.id.$model)" 
                                   class="inputTime inputErrorClass"
                                   type="number">
                        </td>
                        <td>
                            <input disabled 
                                   v-model.trim="v.execution.$model" 
                                   class="classView inputTime"
                                   type="number">
                        </td>
                        <td>
                            <input disabled 
                                   v-model.trim="v.documentation.$model" 
                                   class="classView inputTime" ></td>
                        <td>
                            <input disabled 
                                   v-model.trim="v.projectManagement.$model" 
                                   class="classView inputTime"></td>    
                        <td v-if="!disabled" class="itemControl" ><img src="../assets/garbage.png" @click="removeItem(v.id.$model)"></td>
                    </tr>                    
            </table>
            </b-container>
            
            <br>

            <b-container fluid>
            <table class="roadmapTable">
                <tr>
                    <th style="width:300px">Phase</th>
                    <th style="text-align:center">Architecture <b-badge>{{ sumArchitecture }}</b-badge></th>
                    <th style="text-align:center">Functional <b-badge>{{ sumFunctional }}</b-badge></th>
                    <th style="text-align:center">Integration <b-badge>{{ sumIntegration }}</b-badge></th>
                    <th style="text-align:center">Development <b-badge>{{ sumDevelopment }}</b-badge></th>
                    <th style="text-align:center">Project Management <b-badge>{{ sumProjectManagement }}</b-badge></th>
                    <th style="text-align:center">Documentation <b-badge>{{ sumDocumentation }}</b-badge></th>
                </tr>

                    <tr v-for="item in effort.roadmap" :key="item.phase">
                        <td>{{item.phase}}</td>
                        <td><input :disabled=disabled v-model="item.architecture" v-bind:class="inputClass" type="number" class="inputTime"></td>
                        <td><input :disabled=disabled v-model="item.functional" v-bind:class="inputClass" type="number" class="inputTime"></td>
                        <td><input :disabled=disabled v-model="item.integration" v-bind:class="inputClass" type="number" class="inputTime"></td>
                        <td><input :disabled=disabled v-model="item.development" v-bind:class="inputClass" type="number" class="inputTime"></td>
                        <td><input :disabled=disabled v-model="item.projectmanagement" v-bind:class="inputClass" type="number" class="inputTime"></td>
                        <td><input :disabled=disabled v-model="item.documentation" v-bind:class="inputClass" type="number" class="inputTime"></td>
                    </tr>
            </table>
            </b-container>            
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
    name: 'list-detail',
    data () {
        return {
            inputClass:{ 'classView':true, 'classEdit':false },
            disabled: true,
            effort: Object,
            beforeEditCache: Object,
        }
    },

    validations: {
        effort: {
            projectId: {
                required
            },
            projectScope: {
                required
            },
            crmTicket: {
                required
            },
            assessmentStakeholder: {
                required
            },
            customer: {
                required
            },
            account: {
                required
            },

            items: {
                $each: {
                    id: {
                        required
                    },
                    activity: {
                        required
                    },
                    description: {
                        required
                    },
                    profile: {
                        required
                    },
                    role: {
                        required
                    },
                    level: {
                        required
                    },
                    quantity: {
                        required, between: between(1, 99999)
                    },
                    execution: {
                        required, between: between(1, 99999)
                    },
                    documentation: {
                        required
                    },
                    projectManagement: {
                        required
                    },
                }
            }
        }
    },

    computed: {
        sumArchitecture: function () {
            return this.sum('Architecture')
        },
        sumFunctional: function () {
            return this.sum('Functional')
        },
        sumIntegration: function () {
            return this.sum('Integration')
        },
        sumDevelopment: function () {
            return this.sum('Development')
        },
        sumProjectManagement: function () {
            return this.sum('projectmanagement')
        },
        sumDocumentation: function () {
            return this.sum('documentation')
        },
    },

    created() {
        //INITIAL LOADS

        //Roles
        this.$store.dispatch('getRoles').then(response => {
             this.$store.state.roles =  response.data.Items
            }, error => {
                console.error('Got nothing from server')
            })

        //Profiles
        this.$store.dispatch('getProfiles').then(response => {
             this.$store.state.profiles =  response.data.Items
            }, error => {
                console.error('Got nothing from server')
            })


        if ( this.$route.hash == 'N' ) {
            this.effort = JSON.parse(JSON.stringify(this.$store.state.effort))
            this.disabled = false
            var currentdate = new Date(); 
            this.effort.createdOn = currentdate.toLocaleString()
        } else {
            this.$store.dispatch('getEffort',this.$route.params.id).then(response => {
                this.effort = response.data.Item
            }, error => {
                console.error('Got nothing from server')
            })
        }
    },

    methods: {
        fillTime(role, level, idx, id) {
            var selRole = this.$store.state.roles.filter(function(item) {
                    return item.id == role
                })
            
            for (const key in selRole) {
                const item = selRole[key]

                this.effort.items[idx].execution = item[level]
                break
            }
            this.sumItem(id)
        },

        filteredRoles(profile) {
            if (profile) {
                return this.$store.state.roles.filter(function(item) {
                    return item.parent == profile
                })
            } 
        },

        sum(term) {
            let sum = 0
            let allocated = 0
            var field = 0
            var key, value

            let items = this.effort.items
            
            for (const key1 in this.$store.state.profiles) {
                const element = this.$store.state.profiles[key1]
                
                if (element.value == term) {
                    key = element.key
                    value = element.value.toLowerCase()
                    break
                }
            }

            for (const key1 in items) {
                const element = items[key1];

                if (term == 'documentation') {
                    sum = sum + element.documentation
                }

                if (term == 'projectmanagement') {
                    sum = sum + element.projectManagement
                }
                
                if (element.profile == key) {
                    sum = sum + (element.execution * element.quantity)
                }
            }
            
            for (var key1 in this.effort.roadmap) {
                let roadmap = this.effort.roadmap[key1]

                if ( term == 'documentation' ) {
                    allocated = allocated + parseInt(roadmap.documentation)
                    break
                }

                if ( term == 'projectmanagement' ) {
                    allocated = allocated + parseInt(roadmap.projectmanagement)
                    break
                }                

                field = parseInt(roadmap[value])
                allocated = allocated + field
            }

            return sum - allocated
        },

        addActivity() {
            let pk

            for (const key1 in this.effort.items) {
                const element = this.effort.items[key1]
                pk = element.id
            }

            if (pk) {
                pk = parseInt(pk) + 1
            } else {
                pk = 1
            }
            
            
            this.effort.items.push({id:pk, activity:'', description:'', profile:'', role:'', level:'', quantity:0, execution:0, documentation:0, projectManagement:0, })
        },

        backToList() {
            this.$router.push({ name: "list" });
        },

        deleteEffort() {
             this.$store.dispatch('deleteEffort', this.$route.params.id).then(response => {
                 this.$router.push({ name: "list" })})
        },

        editEffort() {
            this.inputClass.classView = false; 
            this.inputClass.classEdit = true;
            this.disabled = false
            this.beforeEditCache = JSON.parse(JSON.stringify(this.effort))
        },

        cancelEdit() {
            if ( this.$route.hash != 'N' ) {
                this.inputClass.classView = true; 
                this.inputClass.classEdit = false;
                this.disabled = true
                this.effort = this.beforeEditCache
            } else {
                this.$router.push({ name: "list" })
            }
        },

        saveEffort() {
            if(this.$v.effort.$invalid) {
                this.$v.effort.$reset
                this.$refs.modalError.show()
            } else {
                this.$v.effort.$reset
                this.inputClass.classView = true; 
                this.inputClass.classEdit = false;
                this.disabled = true
                if ( this.$route.hash != 'N' ) {
                    this.$store.dispatch('updateEffort', this.effort).then(response => {
                        this.$store.dispatch('getEffort',this.$route.params.id).then(response => {
                            this.effort = response.data.Item
                        }, error => {
                            console.error('Got nothing from server')
                        })
                    })
                } else {
                    this.effort.status = 'Saved'
                    this.effort.userid = 'odenir.tobias.ext'
                    this.$store.dispatch('saveEffort', this.effort).then(response => {
                        this.$router.push({ name: "list" })
                    })
                }

            }

        },

        removeItem(id) {
            const index = this.effort.items.findIndex(item => item.id == id)
            this.effort.items.splice(index, 1)
        },

        sumItem(id) {
            const index = this.effort.items.findIndex(item => item.id == id)
            this.effort.items[index].documentation = parseInt((this.effort.items[index].quantity * this.effort.items[index].execution) * 0.20)
            this.effort.items[index].projectManagement = parseInt((this.effort.items[index].quantity * this.effort.items[index].execution) * 0.10)
        },
  },
    
}
</script>


<style>

.inputErrorClass {
    border: red 1px solid;
    background-color: white;
    width: 100%;
    padding-left: 3px;
    outline: none;
    box-shadow: 0px 0px 1px red;
}

.inputTime {    
    text-align: center;
}

.itemControl {
    text-align: center;
    cursor: pointer;
    opacity: 0.5;
}

.itemControl:hover {
    opacity: 1;
}

.classView {
    padding-left: 5px;
    border: none;
    background-color: transparent;
    width: 100%;
}

.classEdit {
    border: lightgray 0.1px solid;
    background-color: white;
    width: 100%;
    padding-left: 3px;
    
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    padding: 10px;
}

th {
    background-color: #e9ecef
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 2px;
}

tr:nth-child(even) {
    background-color: #f8f9fa;
}

title {
    margin: 16px;
}

.topNav {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 16px;
    background-color: #f8f9fa;
    height: 70px;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgrey;
}

.topNavRight {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-right: 16px;
    font-size: 20px;
    font-weight: bold;
    float: right;
}

.col-sm-1 {
    text-align: left;
    margin-top: auto;
    margin-bottom: auto;
}

.col-sm-2 {
    margin-top: 15px;;
}

.btnAdd {
    font-size: 24px;
    margin: 15px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: auto;
}

.table thead {
    background-color:#f8f9fa;
}

</style>