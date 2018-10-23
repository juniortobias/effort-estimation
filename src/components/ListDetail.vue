
<template>
    <div>
        <div class="topNav">
            <span class="title">Effort Estimation ID: {{ $route.params.id }} <b-badge>{{ effort.status }}</b-badge></span>
            <div class="topNavRight">
                <b-btn @click="backToList" variant="secondary">Back</b-btn>
                <b-button-group>
                    <b-btn @click="editEffort" :disabled=!this.disabled>Edit</b-btn>
                    <b-btn variant="danger">Delete</b-btn>
                    <b-btn @click="saveEffort" variant="" :disabled=this.disabled>Save</b-btn>
                    <b-btn @click="cancelEdit" variant="" :disabled=this.disabled>Cancel</b-btn>                    
                </b-button-group>
                <b-button-group>
                    <b-btn variant="success" disabled>Send to Release</b-btn>
                    <b-btn variant="info" disabled>Vision Document</b-btn>
                    <b-btn variant="warning" disabled>PDF Version</b-btn>
                </b-button-group>
                <b-button-group>

                </b-button-group>
            </div>
        </div>
        <b-card bg-variant="light">
            <b-row>
                <b-col sm="1"><label :for="'projectID'">Project ID:</label></b-col>
                <b-col sm="2"><b-form-input :id="'projectID'" :disabled=this.disabled v-model="effort.projectId"></b-form-input></b-col>

                <b-col sm="1"><label :for="'crmTicket'">CRM Ticket:</label></b-col>
                <b-col sm="2"><b-form-input :id="'crmTicket'" :disabled=this.disabled v-model="effort.crmTicket"></b-form-input></b-col>

                <b-col sm="1"><label :for="'dateTime'">Created on:</label></b-col>
                <b-col sm="2"><b-form-input :id="'dateTime'" :disabled=this.disabled v-model="effort.createdOn"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col sm="1"><label :for="'assessmentStakeholder'">Assessment Stakeholder:</label></b-col>
                <b-col sm="2"><b-form-input :id="'assessmentStakeholder'" :disabled=this.disabled v-model="effort.assessmentStakeholder"></b-form-input></b-col>

                <b-col sm="1"><label :for="'customer'">Customer:</label></b-col>
                <b-col sm="2"><b-form-input :id="'customer'" :disabled=this.disabled v-model="effort.customer"></b-form-input></b-col>

                <b-col sm="1"><label :for="'account'">Account:</label></b-col>
                <b-col sm="2"><b-form-input :id="'account'" :disabled=this.disabled v-model="effort.account"></b-form-input></b-col>
            </b-row>          
        </b-card>
        <p>{{documentation}}</p>
        <br>
            <b-container fluid>
            <b-row><b-btn size="lg" variant="danger" class="btnAdd" @click="addActivity" :disabled=this.disabled>&plus;</b-btn></b-row>
            <table class="actTable">
                <tr>
                    <th>ID</th>
                    <th>Activity</th>
                    <th>Description</th>
                    <th>Profile</th>
                    <th >Role</th>
                    <th style="width:100px">Level</th>
                    <th style="width:1px">Quantity</th>
                    <th style="width:1px">Execution</th>
                    <th style="width:1px">Documentation</th>
                    <th style="width:170px">Project Management</th>
                    <th v-if="!disabled" style="text-align: center;"><img src="../assets/menu.png"></th>
                </tr>

                    <tr v-for="item in effort.items" :key="item.id">
                        <td>{{item.id}}</td>
                        <td><input :disabled=disabled v-model="item.activity" v-bind:class="inputClass"></td>
                        <td><input :disabled=disabled v-model="item.description" v-bind:class="inputClass"></td>
                        <td><select :disabled=disabled v-bind:class="inputClass"><optgroup><option>{{item.profile}}</option></optgroup></select></td>
                        <td><input :disabled=disabled v-model="item.role" v-bind:class="inputClass"></td>
                        <td><input :disabled=disabled v-model="item.level" v-bind:class="inputClass"></td>
                        <td><input :disabled=disabled v-model="item.quantity" v-bind:class="inputClass" @change="defineItem(item.id)"></td>
                        <td><input :disabled=disabled v-model="item.execution" v-bind:class="inputClass" @change="defineItem(item.id)"></td>
                        <td><input :disabled=disabled v-model="item.documentation" class="classView"></td>
                        <td><input :disabled=disabled v-model="item.projectManagement" class="classView"></td>    
                        <td v-if="!disabled" class="itemControl" ><img src="../assets/garbage.png" @click="removeItem(item.id)"></td>    
                    </tr>
            </table>
            </b-container>
            
            <br>

            <b-container fluid>
            <table class="roadmapTable">
                <tr>
                    <th style="width:300px">Phase</th>
                    <th>Architecture <b-badge>{{ sumArchitecture }}</b-badge></th>
                    <th>Functional <b-badge>{{ sumFunctional }}</b-badge></th>
                    <th>Integration <b-badge>{{ sumIntegration }}</b-badge></th>
                    <th>Development <b-badge>{{ sumDevelopment }}</b-badge></th>
                    <th>Project Management <b-badge>{{ sumProjectManagement }}</b-badge></th>
                    <th>Documentation <b-badge>{{ sumDocumentation }}</b-badge></th>
                </tr>

                    <tr v-for="item in effort.roadmap" :key="item.phase">
                        <td>{{item.phase}}</td>
                        <td><input :disabled=disabled v-model="item.architecture" v-bind:class="inputClass" type="number"></td>
                        <td><input :disabled=disabled v-model="item.functional" v-bind:class="inputClass"></td>
                        <td><input :disabled=disabled v-model="item.integration" v-bind:class="inputClass"></td>
                        <td><input :disabled=disabled v-model="item.development" v-bind:class="inputClass"></td>
                        <td><input :disabled=disabled v-model="item.projectmanagement" v-bind:class="inputClass"></td>
                        <td><input :disabled=disabled v-model="item.documentation" v-bind:class="inputClass"></td>
                    </tr>
            </table>
            </b-container>            
    </div>
</template>

<script>

export default {
    name: 'list-detail',
    data () {
        return {
            inputClass:{ 'classView': true, 'classEdit':false },
            disabled: true,
            effort: JSON.parse(JSON.stringify(this.$store.state.efforts[this.$route.params.idx])),
            beforeEditCache: Object,
    }
  },

    computed: {
        documentation: function () {

        },

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


    methods: {
        sum(term) {

            let sum = 0
            let allocated = 0
            var value = 0

            let items = this.effort.items
            for (const key1 in items) {
                const element = items[key1];
                if (term == 'documentation') {
                    sum = sum + element.documentation
                }

                if (term == 'projectmanagement') {
                    sum = sum + element.projectManagement
                }

                if (element.profile == term) {
                    sum = sum + (element.execution * element.quantity)
                }
            }

            for (var key1 in this.effort.roadmap) {
                let roadmap = this.effort.roadmap[key1]

                value = parseInt(roadmap[term.toLowerCase()])
                allocated = allocated + value
            }

            return sum - allocated
        },

        addActivity() {
            let pk

            for (const key1 in this.effort.items) {
                const element = this.effort.items[key1]
                pk = element.id
            }

            pk = parseInt(pk) + 1
            this.effort.items.push({id:pk})
        },

        backToList() {
            this.$router.push({ name: "list" });
        },

        editEffort() {
            this.inputClass.classView = false; this.inputClass.classEdit = true;
            this.disabled = false
            this.beforeEditCache = JSON.parse(JSON.stringify(this.effort))
        },

        cancelEdit() {
            this.inputClass.classView = true; this.inputClass.classEdit = false;
            this.disabled = true
            this.effort = this.beforeEditCache
        },

        saveEffort() {
            this.inputClass.classView = true; this.inputClass.classEdit = false;
            this.disabled = true
            this.$store.dispatch('updateEffort', this.effort)
        },

        removeItem(id) {
            const index = this.effort.items.findIndex(item => item.id == id)
            this.effort.items.splice(index, 1)
        },

        defineItem(id) {
            console.log(id)
        }
  },
    
}
</script>


<style>

.itemControl {
    text-align: center;
    cursor: pointer;
    opacity: 0.5;
}

.itemControl:hover {
    opacity: 1;
}

input:invalid {
  border: 2px solid red;
}

.classView {
    padding-left: 5px;
    border: none;
    background-color: transparent;
    width: 100%;
}

.classEdit {
    border: purple 0.5px solid;
    background-color: white;
    width: 100%;
    padding-left: 5px;
}

/* .roadmapTable {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 50%;
    padding: 10px;
} */

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
    padding: 5px;
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