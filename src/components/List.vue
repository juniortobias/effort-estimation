
<template>
<b-container fluid>
    <div class="title"><h2>Effort Estimation Management</h2></div>
    <b-row><b-btn size="lg" variant="danger" class="btnAdd">&plus;</b-btn></b-row>
    <b-table id="my-table" hover responsive :items="$store.state.efforts" @row-clicked="rowClicked">
        <template slot="HEAD_items" slot-scope="data"></template>
        <template slot="HEAD_roadmap" slot-scope="data"></template>
        <template slot="items" slot-scope="data"></template>
        <template slot="roadmap" slot-scope="data"></template>
        <template slot="status" slot-scope="data">
            <b-badge variant="dark">{{ data.item.status }}</b-badge>
        </template>  
    </b-table>
</b-container>

</template>

<script>

export default {
    name: 'list',
    data() {
        return {
          
        }
    },
    methods:{
      rowClicked(record, index) {
          this.$router.push({name:'list-detail', params: {id: record.id, idx: index} })
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

.table td {
    cursor: pointer;

}


</style>