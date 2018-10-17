
<template>
    <div>
        <div class="projectID"><p>Effort Estimation ID: {{ $route.params.id }} <b-badge>{{ $store.state.effort.status }}</b-badge></p></div>
        <b-card bg-variant="light">
            <b-row>
                <b-col sm="1"><label :for="'projectID'">Project ID:</label></b-col>
                <b-col sm="2"><b-form-input :id="'projectID'" disabled v-model="$store.state.effort.projectId"></b-form-input></b-col>

                <b-col sm="1"><label :for="'crmTicket'">CRM Ticket:</label></b-col>
                <b-col sm="2"><b-form-input :id="'crmTicket'" disabled v-model="$store.state.effort.crmTicket"></b-form-input></b-col>

                <b-col sm="1"><label :for="'assign'">Assign to:</label></b-col>
                <b-col sm="2"><b-form-input :id="'assign'" disabled v-model="$store.state.effort.assign"></b-form-input></b-col>

                <b-col sm="1"><label :for="'dateTime'">Created on:</label></b-col>
                <b-col sm="2"><b-form-input :id="'dateTime'" disabled v-model="$store.state.effort.createdOn"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col sm="1"><label :for="'owner'">Owner:</label></b-col>
                <b-col sm="2"><b-form-input :id="'owner'" disabled v-model="$store.state.effort.owner"></b-form-input></b-col>

                <b-col sm="1"><label :for="'assessmentStakeholder'">Assessment Stakeholder:</label></b-col>
                <b-col sm="2"><b-form-input :id="'assessmentStakeholder'" disabled v-model="$store.state.effort.assessmentStakeholder"></b-form-input></b-col>

                <b-col sm="1"><label :for="'customer'">Customer:</label></b-col>
                <b-col sm="2"><b-form-input :id="'customer'" disabled v-model="$store.state.effort.customer"></b-form-input></b-col>

                <b-col sm="1"><label :for="'account'">Account:</label></b-col>
                <b-col sm="2"><b-form-input :id="'account'" disabled v-model="$store.state.effort.account"></b-form-input></b-col>
            </b-row>          
        </b-card>

        <br>
        <b-container fluid>
            <b-row class="activities"><b-btn size="lg" variant="danger" class="btnAdd">&plus;</b-btn></b-row>
            <b-table id="activities" hover small responsive :items="$store.state.effort.items">
            </b-table>
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
        sumArchitecture: 0,
        sumFunctional: 0,
        sumIntegration: 0,
        sumDevelopment: 0,
        sumProjectManagement: 0,
        sumDocumentation: 0,
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

  created() {
      if (this.$route.params.id) {
        for (var keyR in this.$store.state.efforts) {
            var effort = this.$store.state.efforts[keyR]
            if (effort.id == this.$route.params.id) {
                this.$store.state.effort = effort
                break
            }
        }
    }

    this.sumArchitecture = this.sumProfile('architecture')
    this.sumFunctional = this.sumProfile('functional')
    this.sumIntegration = this.sumProfile('integration')
    this.sumDevelopment = this.sumProfile('development')
  },
  methods: {
    sumProfile(term) {
        var sum = 0
        var allocated = 0
        var value = 0

        for (var key1 in this.$store.state.efforts) {
            var effortH = this.$store.state.efforts[key1]

            for (var key2 in effortH.items) {
                var effortI = effortH.items[key2]
                
                if (effortI.profile.toLowerCase() == term){
                    sum = (sum + (effortI.execution * effortI.quantity))
                }
            }
        }

        for (var key1 in this.roadmapItems) {
            var roadmap = this.roadmapItems[key1]

            value = parseInt(roadmap[term])
            allocated = allocated + value
        }

        return sum - allocated
    },
  }
    
}
</script>


<style>
.title {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    align-content: center;
    margin-bottom: 30px;
}

.projectID {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 16px;
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