<template>
    <div style="margin-left:20px;margin-right:20px;">
        <b-container fluid>
            <div class="title"><h2>Effort Estimation Management</h2></div>
            <b-row>
                <b-form-input id="searchField" class="searchField" placeholder="Search..." v-model="search" @keyup.native="filterData()"></b-form-input>
                <b-btn size="lg" variant="danger" class="btnAdd" @click="createEffort">&plus;</b-btn>
            </b-row>
            <table id="efforts" class="Efforts">
                <tr>
                    <th v-on:click="sortTable('id')">ID <img src="../assets/up-down-2.png" height="14px" id="id" style="margin-top:-3px"></th>
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

                <tr v-for="item in this.efforts" :key="item.id" @click="rowClicked(item.id)">
                    <td>{{item.id}}</td>
                    <td>{{item.projectId}}</td>
                    <td>{{item.projectScope.substring(0,60) + '...'}}</td>
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
            ascending: true,
            sortColumn: '',
            search: '',
            efforts: '',
            filter: '',
        }
    },

    methods:{
        filterData() {
            // Declare variables 
            var input, filter, table, tr, td, i, txtValue;

            input = document.getElementById("searchField");
            filter = input.value.toUpperCase();
            table = document.getElementById("efforts");
            tr = table.getElementsByTagName("tr");

            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        },

        sortTable(col){
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;

            this.filter.sort(function(a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })
        },
        
        rowClicked(id) {
          this.$router.push({name:'list-detail', params: {id: id} })
        },

        createEffort() {
            this.$store.dispatch('createEffort', this.$router)
        }

    },

    created() {
        this.$store.dispatch('getEfforts').then(response =>{
            this.efforts = JSON.parse(JSON.stringify(response))
            this.filter = this.efforts
            this.sortTable('id')
        })
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

.searchField {
    margin: 15px;
    margin-right: auto;
    margin-top: auto;
    padding-top: 2px;
    padding-bottom: 2px;
    width: 300px;
}

.btnAdd {
    margin-top: auto;
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
    background-color: #e9ecef;
}

table th:hover {
    text-decoration-line: underline;
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