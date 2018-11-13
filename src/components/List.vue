
<template>
    <div style="margin-left:20px;margin-right:20px;">
        <b-container fluid>
            <div class="title"><h2>Effort Estimation Management</h2></div>
            <b-row><b-btn size="lg" variant="danger" class="btnAdd" @click="createEffort">&plus;</b-btn></b-row>
            <table class="Efforts">
                <tr>
                    <th>ID</th>
                    <th>Project ID</th>
                    <th>Project Scope</th>
                    <th>Customer</th>
                    <th>Account</th>
                    <th>CRM Ticket</th>
                    <th>Assessment Stakeholder</th>
                    <th>Created by</th>
                    <th>Created on</th>
                    <th style="text-align:center">Status</th>
                </tr>

                <tr v-for="item in $store.state.efforts" :key="item.id" @click="rowClicked(item.id)">
                    <td>{{item.id}}</td>
                    <td>{{item.projectId}}</td>
                    <td>{{item.projectScope.substring(0,50) + '...'}}</td>
                    <td>{{item.customer}}</td>
                    <td>{{item.account}}</td>
                    <td>{{item.crmTicket}}</td>
                    <td>{{item.assessmentStakeholder}}</td>
                    <td>{{item.userid}}</td>
                    <td>{{item.createdOn}}</td>
                    <td style="text-align:center"><b-badge variant="dark">{{ item.status }}</b-badge></td>
                </tr>
            </table>
        </b-container>
    </div>
</template>

<script>

export default {
    name: 'list',
    data() {
        return {

        }
    },

    methods:{
      rowClicked(id) {
          this.$router.push({name:'list-detail', params: {id: id} })
      },

      createEffort() {
        this.$store.dispatch('createEffort', this.$router)
      },

    },

    created() {
        this.$store.dispatch('getEfforts')
    },
}

</script>


<style scoped>
.title {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    align-content: center;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 50px;
}

.btnAdd {
    font-size: 24px;
    margin: 15px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: auto;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

th {
    background-color: #e9ecef
}

table tr:hover {
    background-color: rgb(240, 240, 240);
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 10px;
    cursor: pointer;
}

tr:nth-child(even) {
    background-color: #f8f9fa;
}

.table thead {
    background-color:#f8f9fa;
}

</style>