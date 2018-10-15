
<template>
    <div>
        <div class="content">Effor Estimation List</div>
        <b-table id="my-table" striped hover :items="items"></b-table>
    </div>
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
                    userid: 'odenir.tobias.ext@tivit.com',
                    datetime: '2018-09-29T15:28:23-03:00',
                    account: '0040003300-04',
                    crmTicket: 'TVT555551',
           },
        ]
    };
  },

//   created(){
//       this.$root.$emit('bv::refresh::table', 'my-table');
//   }
}
</script>


<style>
.content {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
    align-content: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>