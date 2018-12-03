
<template>
    <div>
        <!-- ROADMAP VALIDATION MODAL -->
        <b-modal ref="modalRoadmapValidation" hide-footer size="mm" centered header-bg-variant="danger" header-text-variant="light" title="Roadmap Validation">
            <div class="d-block text-center">
                <h3>The sum of profile execution must be greater than 0</h3>
            </div>
        </b-modal>

        <!-- DELETE EFFORT MODAL -->
        <b-modal ref="modalQuestion" size="mm" hide-footer centered header-bg-variant="danger" header-text-variant="light" title="Delete Confirmation" @ok="deleteEffort">
            <div class="d-block text-center">
                <h3>Are you sure you want to delete this Effort Estimation?</h3>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="deleteEffort">Delete</b-btn>
        </b-modal>

        <!-- VALIDATION FORM MODAL -->
        <b-modal ref="modalError" hide-footer size="mm" centered header-bg-variant="danger" header-text-variant="light" title="Document Validation">
            <div class="d-block text-center">
                <h3>The Effort Estimation form is <span style="color: red">incomplete</span></h3>
            </div>
        </b-modal>

        <!-- TEST PLAN MODAL -->
        <b-modal ref="modalTestPlan" title="Test Plan" @cancel="clearModalChange" no-close-on-esc size="lg">
            <div class="d-block text-center">
                <b-form-textarea :id="'testPlan'" 
                                 :rows="5" 
                                 :disabled=this.disabled 
                                 v-model="effort.testPlan">
                </b-form-textarea>
            </div>
        </b-modal>

        <!-- CUTOVER PLAN MODAL -->
        <b-modal ref="modalCutoverPlan" title="Cutover Plan" @cancel="clearModalChange" no-close-on-esc size="lg">
            <div class="d-block text-center">
                <b-form-textarea :id="'cutoverPlan'" 
                                 :rows="5" 
                                 :disabled=this.disabled 
                                 v-model="effort.cutoverPlan">
                </b-form-textarea>
            </div>
        </b-modal>

        <!-- PREMISES MODAL -->
        <b-modal ref="modalPremises" title="Premises" @cancel="clearModalChange" no-close-on-esc size="lg">
            <div class="d-block text-center">
                <b-form-textarea :id="'premises'" 
                                 :rows="5" 
                                 :disabled=this.disabled 
                                 v-model="effort.premises">
                </b-form-textarea>
            </div>
        </b-modal>

        <div class="topNav">
            <span class="title">Effort Estimation ID: {{ effort.id }} <b-badge>{{ effort.status }}</b-badge></span>
            <div class="topNavRight">
                <b-btn @click="backToList" variant="secondary">Back</b-btn>
                <b-button-group>
                    <!-- <b-btn @click="editEffort" :disabled=!disabled>Edit</b-btn> -->
                    <b-btn @click="editEffort" :disabled="!disabled || effort.status == 'Waiting Release' || effort.status == 'Released'">Edit</b-btn>
                    <b-btn @click="showModal('modalQuestion')" :disabled="!disabled || effort.status == 'Waiting Release' || effort.status == 'Released'" variant="danger">Delete</b-btn>
                    <b-btn @click="saveEffort" variant="" :disabled=disabled>Save</b-btn>
                    <b-btn @click="cancelEdit" variant="" :disabled=disabled>Cancel</b-btn>                    
                </b-button-group>
                <b-button-group>
                    <b-btn variant="info" @click="askToRelease" :disabled="!sendToRelease">Send to Release</b-btn>
                    <!-- <b-btn variant="info" disabled>Vision Document</b-btn> -->
                    <!-- <b-btn variant="warning" @click="generatePDF()" :disabled="effort.status != 'Released'">PDF Version</b-btn> -->
                    <b-btn variant="warning" @click="generatePDF()">PDF Version</b-btn>
                </b-button-group>
                <b-button-group>
                    <b-btn variant="success" disabled>Approve</b-btn>
                    <b-btn variant="danger" disabled>Reject</b-btn>
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
                    <!-- <b-col sm="2"><b-form-input :id="'crmTicket'" :disabled=this.disabled v-model="effort.crmTicket" :state="!$v.effort.crmTicket.required ? false : null"></b-form-input></b-col> -->
                    <b-col sm="2"><b-form-input :id="'crmTicket'" :disabled=this.disabled v-model="effort.crmTicket"></b-form-input></b-col>

                    <b-col sm="1"><label :for="'dateTime'">Created on:</label></b-col>
                    <b-col sm="2"><b-form-input :id="'dateTime'" :disabled=true v-model="effort.createdOn"></b-form-input></b-col>

                    <b-col sm="1" style="text-align:left">Test Plan:</b-col>
                    <b-col sm="1"><img src="../assets/test.png" class="testIcon" @click="showModal('modalTestPlan')"></b-col>
                </b-row>
                <b-row>
                    <b-col sm="1"><label :for="'assessmentStakeholder'">Assessment Stakeholder:</label></b-col>
                    <b-col sm="2"><b-form-input :id="'assessmentStakeholder'" :disabled=this.disabled v-model="effort.assessmentStakeholder" :state="!$v.effort.assessmentStakeholder.required ? false : null"></b-form-input></b-col>

                    <b-col sm="1"><label :for="'customer'">Customer:</label></b-col>
                    <b-col sm="2"><b-form-input :id="'customer'" :disabled=this.disabled v-model="effort.customer" :state="!$v.effort.customer.required ? false : null"></b-form-input></b-col>

                    <b-col sm="1"><label :for="'account'">Account:</label></b-col>
                    <b-col sm="2"><b-form-input :id="'account'" :disabled=this.disabled v-model="effort.account" :state="!$v.effort.account.required ? false : null"></b-form-input></b-col>

                    <b-col sm="1" style="text-align:left">Cutover Plan:</b-col>
                    <b-col sm="1"><img src="../assets/cutover.png" class="testIcon" @click="showModal('modalCutoverPlan')"></b-col>
                </b-row>
                <br>
                <b-row style="margin-top:-14px">
                    <b-col sm="1" style="margin-top:0px;"><label :for="'projectScope'">Project Scope:</label></b-col>
                    <b-col sm="8"><b-form-textarea :id="'projectScope'" :rows="5" :max-rows="5" :disabled=this.disabled v-model="effort.projectScope" :state="!$v.effort.projectScope.required ? false : null"></b-form-textarea></b-col>

                    <b-col sm="1" style="text-align:left;margin-top:0px">Premises:</b-col>
                    <b-col sm="1" style="text-align:left;margin-top:0px"><img src="../assets/premise.png" class="testIcon" @click="showModal('modalPremises')"></b-col>
                </b-row>   
            </b-card>
        <br>
            <b-container fluid>
            <b-row><b-btn size="lg" variant="danger" class="btnAdd" @click="addActivity" :disabled=this.disabled>&plus;</b-btn></b-row>
            <table class="actTable" id="items">
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
                    <th v-if="!disabled" style="text-align:center;"><img src="../assets/menu.png" height="22px"></th>
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
                        <td v-if="!disabled" class="itemControl" ><img src="../assets/garbage.png"  height="18px" @click="removeItem(v.id.$model)"></td>
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

                    <tr v-for="(item) in effort.roadmap" :key="item.phase">
                        <td>{{item.phase}}</td>
                        <td>
                            <input :disabled=disabled
                                    v-model="item.architecture" 
                                    v-bind:class="inputClass" 
                                    type="number" 
                                    class="inputTime" 
                                    @keyup="validateRoadmap('architecture',sumArchitecture,item.id)"
                                    @change="validateRoadmap('architecture',sumArchitecture,item.id)">
                        </td>
                        <td>
                            <input :disabled=disabled 
                                    v-model="item.functional" 
                                    v-bind:class="inputClass" 
                                    type="number" 
                                    class="inputTime"
                                    @keyup="validateRoadmap('functional',sumFunctional,item.id)"
                                    @change="validateRoadmap('functional',sumFunctional,item.id)">
                        </td>
                        <td>
                            <input :disabled=disabled 
                                    v-model="item.integration" 
                                    v-bind:class="inputClass" 
                                    type="number" 
                                    class="inputTime"
                                    @keyup="validateRoadmap('integration',sumIntegration,item.id)"
                                    @change="validateRoadmap('integration',sumIntegration,item.id)">
                        </td>
                        <td>
                            <input :disabled=disabled 
                                    v-model="item.development" 
                                    v-bind:class="inputClass" 
                                    type="number" 
                                    class="inputTime"
                                    @keyup="validateRoadmap('development',sumDevelopment,item.id)"
                                    @change="validateRoadmap('development',sumDevelopment,item.id)">
                        </td>
                        <td>
                            <input :disabled=disabled 
                                    v-model="item.projectmanagement" 
                                    v-bind:class="inputClass" 
                                    type="number" 
                                    class="inputTime"
                                    @keyup="validateRoadmap('projectmanagement',sumProjectManagement,item.id)"
                                    @change="validateRoadmap('projectmanagement',sumProjectManagement,item.id)">
                        </td>
                        <td>
                            <input :disabled=disabled 
                                    v-model="item.documentation" 
                                    v-bind:class="inputClass" 
                                    type="number" 
                                    class="inputTime"
                                    @keyup="validateRoadmap('documentation',sumDocumentation,item.id)"
                                    @change="validateRoadmap('documentation',sumDocumentation,item.id)">
                        </td>
                    </tr>
            </table>
            </b-container>            
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
import jsPDF from 'jsPDF'

export default {
    name: 'list-detail',
    data () {
        return {
            inputClass:{ 'classView':true, 'classEdit':false },
            disabled: true,
            effort: Object,
            beforeEditCache: Object,
            beforeModalChance: { testPlan:null, cutoverPlan:null, premises:null},
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
            // crmTicket: {
            //     required
            // },
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
            },
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
        sendToRelease: function() {
            if ( this.sumArchitecture == 0 && 
                 this.sumFunctional == 0 && 
                 this.sumIntegration == 0 && 
                 this.sumDevelopment == 0 && 
                 this.sumProjectManagement == 0 && 
                 this.sumDocumentation == 0 && 
                 this.disabled &&
                 this.effort.status != 'Waiting Release' && 
                 this.effort.status != 'Released'){
                    return true
            } else {
                    return false
            }
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
        generatePDF(){
            var doc = new jsPDF('p', 'mm')

            doc.setFontStyle("bold"); doc.text('Effort Estimation', 80, 15);
            doc.line(10, 17, 200, 17)

            doc.setFontSize(10)
            doc.setFontStyle("bold");   doc.text('ID: ', 10, 25);
            doc.setFontStyle("normal"); doc.text(this.effort.id, 15, 25);
            doc.text(' | ' + this.effort.status, 19, 25)

            //LINE 1
            doc.setFontStyle("bold");   doc.text('Project ID (Jira):', 10, 35);
            doc.setFontStyle("normal"); doc.text(this.effort.projectId, 54, 35)

            doc.setFontStyle("bold");   doc.text('CRM Ticket:', 90, 35);
            if (this.effort.crmTicket){
                doc.setFontStyle("normal"); doc.text(this.effort.crmTicket, 111, 35)
            }

            doc.setFontStyle("bold");   doc.text('Created on:', 140, 35);
            doc.setFontStyle("normal"); doc.text(this.effort.createdOn, 160, 35)

            //LINE 2
            doc.setFontStyle("bold");   doc.text('Assessment Stakeholder:', 10, 41);
            doc.setFontStyle("normal"); doc.text(this.effort.assessmentStakeholder, 54, 41)

            doc.setFontStyle("bold");   doc.text('Customer:', 90, 41);
            doc.setFontStyle("normal"); doc.text(this.effort.customer, 111, 41)

            doc.setFontStyle("bold");   doc.text('Account:', 140, 41);
            doc.setFontStyle("normal"); doc.text(this.effort.account, 160, 41)

            doc.setFontStyle("bold");   doc.text('Project Scope', 10, 52);
            doc.line(10, 53, 100, 53)
            doc.setFontStyle("normal"); doc.text(this.effort.projectScope, 10, 58)


            doc.addPage('a4','p');
            doc.setFontStyle("bold");   doc.text('Test Plan', 10, 15);
            doc.line(10, 16, 100, 16)
            if (this.effort.testPlan) {
                doc.setFontStyle("normal"); doc.text(this.effort.testPlan, 10, 22)
            }

            doc.setFontStyle("bold");   doc.text('Cutover Plan', 10, 150);
            doc.line(10, 151, 100, 151)
            if (this.effort.testPlan) {
                doc.setFontStyle("normal"); doc.text(this.effort.cutoverPlan, 10, 156)
            }

            doc.addPage('a4','p');
            doc.setFontStyle("bold");   doc.text('Items', 10, 15);
            doc.line(10, 16, 100, 16)

            var line = 22
            for (const idx in this.effort.items ){
                const item = JSON.parse(JSON.stringify(this.effort.items[idx]))

                doc.setFontStyle("normal"); doc.text(item.id.toString(), 10, line)
                doc.setFontStyle("normal"); doc.text(item.activity.toString(), 15, line)
                doc.setFontStyle("normal"); doc.text(item.description.toString(), 60, line)
                
                // for (const idx in this.$store.state.profiles){
                //     const profile = this.$store.state.profiles[idx]
                //     if (item.profile == profile.id){
                //         return item
                //     }
                // }

                line = line + 5
            }
            doc.save('a4.pdf')
        },

        askToRelease() {
            this.effort.status = 'Waiting Release'
            this.$store.dispatch('askToRelease', this.effort).then(response => {
                        this.$router.push({ name: "list" })
                    })
        },

        validateRoadmap(profile, sum, id) {
            const idx = this.effort.roadmap.findIndex(item => item.id == id)
            const item = this.effort.roadmap[idx]

            if (!item[profile] || item[profile] < 0){
                item[profile] = 0
            }
            
            if (sum && sum < 0){
                this.$refs['modalRoadmapValidation'].show()
                item[profile] = 0
            }
        },

        clearModalChange() {
            this.effort.testPlan = this.beforeModalChance.testPlan
            this.effort.cutoverPlan = this.beforeModalChance.cutoverPlan
            this.effort.premises = this.beforeModalChance.premises
        },

        showModal(modal) {
            const object = this.$refs[modal]

            if (this.effort.testPlan) {
                this.beforeModalChance.testPlan = JSON.parse(JSON.stringify(this.effort.testPlan))
            }
            if (this.effort.cutoverPlan) {
                this.beforeModalChance.cutoverPlan = JSON.parse(JSON.stringify(this.effort.cutoverPlan))
            }
            if (this.effort.premises) {
                this.beforeModalChance.premises = JSON.parse(JSON.stringify(this.effort.premises))
            }
            object.show()
        },

        fillTime(role, level, idx, id) {
            if (this.$store.state.roles[0]) {
                const selRole = this.$store.state.roles.filter(function(item) {
                        return item.id == role
                    })
                
                for (const key in selRole) {
                    const item = selRole[key]

                    this.effort.items[idx].execution = item[level] * this.effort.items[idx].quantity
                    break
                }
                this.sumItem(id)
            }
        },

        filteredRoles(profile) {
            if ( profile || this.$store.state.roles[0] ) {
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
                    key = element.id
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
                    // sum = sum + (element.execution * element.quantity)
                    sum = sum + (element.execution)
                }
            }
            
            for (var key1 in this.effort.roadmap) {
                let roadmap = this.effort.roadmap[key1]

                if ( term == 'documentation' ) {
                    allocated = allocated + parseInt(roadmap.documentation)
                    continue
                }

                if ( term == 'projectmanagement' ) {
                    allocated = allocated + parseInt(roadmap.projectmanagement)
                    continue
                }                

                field = parseInt(roadmap[value])
                allocated = allocated + field
            }

            const calc = sum - allocated
            if (calc) {
                return calc
            } else {
                return 0
            }
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
            // this.effort.items[index].documentation = parseInt((this.effort.items[index].quantity * this.effort.items[index].execution) * 0.20)
            // this.effort.items[index].projectManagement = parseInt((this.effort.items[index].quantity * this.effort.items[index].execution) * 0.10)
            this.effort.items[index].documentation = parseInt(this.effort.items[index].execution * 0.20)
            this.effort.items[index].projectManagement = parseInt(this.effort.items[index].execution * 0.10)
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

.testIcon {
    cursor: pointer;
    opacity: 0.5;
}

.testIcon:hover {
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