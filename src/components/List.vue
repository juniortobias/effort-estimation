
<template>
<b-container fluid="">
    <div class="title"><h1>Effort Estimation Management</h1></div>
    <b-table id="my-table" striped hover :items="items" caption-top>
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
                id: '00001', 
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
}

</style>