
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

        <br>
            <b-container fluid>
            <b-row><b-btn size="lg" variant="danger" class="btnAdd" @click="addActivity" disabled>&plus;</b-btn></b-row>
            <table class="actTable">
                <tr>
                    <th>ID</th>
                    <th>Activity</th>
                    <th>Description</th>
                    <th>Profile</th>
                    <th>Role</th>
                    <th>Level</th>
                    <th>Quantity</th>
                    <th>Execution</th>
                    <th>Documentation</th>
                    <th>Project Management</th>
                    <th>Unit Tests</th>
                </tr>

                    <tr v-for="item in effort.items" :key="item.id">
                        <td>{{item.id}}</td>
                        <td :contenteditable=!disabled>{{item.activity}}</td>
                        <td :contenteditable=!disabled>{{item.description}}</td>
                        <td :contenteditable=!disabled>{{item.profile}}</td>
                        <td :contenteditable=!disabled>{{item.role}}</td>
                        <td :contenteditable=!disabled>{{item.level}}</td>
                        <td :contenteditable=!disabled>{{item.quantity}}</td>
                        <td :contenteditable=!disabled>{{item.execution}}</td>
                        <td :contenteditable=!disabled>{{item.documentation}}</td>
                        <td :contenteditable=!disabled>{{item.projectManagement}}</td>
                        <td :contenteditable=!disabled>{{item.tests}}</td>
                    </tr>
            </table>
            </b-container>


        <br>
        <b-container fluid>
            <b-table id="roadmap" hover responsive small :items="roadmapItems" :fields="roadmapFields">
            <template slot="HEAD_architecture" slot-scope="data">
                {{data.label}} <b-badge>{{ sumArchitecture }}</b-badge>
            </template>
            <template slot="HEAD_functional" slot-scope="data">
                {{data.label}} <b-badge>{{ sumFunctional }}</b-badge>
            </template>
            <template slot="HEAD_integration" slot-scope="data">
                {{data.label}} <b-badge>{{ sumIntegration }}</b-badge>
            </template>
            <template slot="HEAD_development" slot-scope="data">
                {{data.label}} <b-badge>{{ sumDevelopment }}</b-badge>
            </template>
            <template slot="HEAD_projectManagement" slot-scope="data">
                {{data.label}} <b-badge>{{ sumProjectManagement }}</b-badge>
            </template>     
            <template slot="HEAD_documentation" slot-scope="data">
                {{data.label}} <b-badge>{{ sumDocumentation }}</b-badge>
            </template>            
            </b-table>
        </b-container>
    </div>
</template>

<script>

export default {
    name: 'list-detail',
    data () {
        return {
            disabled: true,
            effort: Object,
            sumArchitecture: 0,
            sumFunctional: 0,
            sumIntegration: 0,
            sumDevelopment: 0,
            sumProjectManagement: 0,
            sumDocumentation: 0,
            // actFields:[{ key:'activity', disabled:false }],
            roadmapFields: ['activity', 'architecture', 'functional', 'integration', 'development', 'projectManagement', 'documentation'],
            roadmapItems: [
            {
                'activity':'Project Preparation',
                'architecture': '0',
                'functional': '0',
                'integration': '0',
                'development': '0',
                'projectManagement':'0',
                'documentation':'0'
            },
            {
                'activity':'Business Blueprint',
                'architecture': '0',
                'functional': '0',
                'integration': '0',
                'development': '0',
                'projectManagement':'0',
                'documentation':'0'
            }, 
            {
                'activity':'Realization',
                'architecture': '0',
                'functional': '0',
                'integration': '0',
                'development': '0',
                'projectManagement':'0',
                'documentation':'0'
            },
            {
                'activity':'Final Preparation',
                'architecture': '0',
                'functional': '4',
                'integration': '0',
                'development': '0',
                'projectManagement':'0',
                'documentation':'0'
            }, 
            {
                'activity':'Go-Live',
                'architecture': '1',
                'functional': '0',
                'integration': '0',
                'development': '0',
                'projectManagement':'0',
                'documentation':'0'
            }, 
        ]        
    }
  },
    watch: {
        effort() {

        }
    },

    created() {
        this.effort = JSON.parse(JSON.stringify(this.$store.state.efforts[this.$route.params.idx]))

        this.sumArchitecture = this.sum('Architecture')
        this.sumFunctional   = this.sum('Functional')
        this.sumIntegration  = this.sum('Integration')
        this.sumDevelopment  = this.sum('Development')
    },

    methods: {
        sum(term) {
            let sum = 0
            let allocated = 0
            var value = 0

            let items = this.$store.state.efforts[this.$route.params.idx].items
            for (const key1 in items) {
                const element = items[key1];
                    if (element.profile == term) {
                        sum = sum + (element.execution * element.quantity)
                    }
            }

            for (var key1 in this.roadmapItems) {
                let roadmap = this.roadmapItems[key1]

                value = parseInt(roadmap[term.toLowerCase()])
                allocated = allocated + value
        }

            return sum - allocated

        },

    addActivity() {
        
    },

    backToList() {
        this.$router.push({ name: "list" });
    },

    editEffort() {
        this.disabled = false
        
    },

    cancelEdit() {
        this.disabled = true
        this.effort = Object.assign(this.$store.state.efforts[parseInt(this.$route.params.idx)])
    },

    saveEffort() {
        this.disabled = true
        this.$store.state.efforts[parseInt(this.$route.params.idx)] = this.effort
    }
  },
    
}
</script>


<style>

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
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #f8f9fa;
}

.title {
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