
<template>
<b-container fluid="">
    <div class="title"><h2>Effort Estimation Management - List</h2></div>
    <b-row><b-btn size="lg" variant="danger" class="btnAdd">&plus;</b-btn></b-row>
    <b-table id="my-table"  hover responsive :items="items" caption-top @row-clicked="rowClicked">
    </b-table>
</b-container>

</template>

<script>

export default {
    name: 'list',
    data() {
        return {
           items: [
            { 
                id: this.$store.items.id, 
                projectId: 'SFSCO-6',
                projectScope: 'Desenho de solução',
                userid: 'odenir.tobias.ext@tivit.com',
                datetime: '2018-08-29T15:28:23-03:00',
                account: '0040002900-03',
                crmTicket: 'TVT33331',
            },
                { 
                    id: '00002', 
                    projectId: 'SFSCO-8',
                    projectScope: 'Inclusão de campo em relatório',
                    userid: 'murilo.pedrico@tivit.com',
                    datetime: '2018-09-29T15:28:23-03:00',
                    account: '0040003300-04',
                    crmTicket: 'TVT555551',
           },
        ]
    };
  },
  methods:{
      rowClicked(record, index) {
          this.$router.push({name:'list-detail', params: {id: record.id} })
      }
  },
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
    /* font-size: 36px; */
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 20px;
}

.btnAdd {
    font-size: 24px;
    margin: 15px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: auto;
}

.table td {
    cursor: pointer;

}


</style>