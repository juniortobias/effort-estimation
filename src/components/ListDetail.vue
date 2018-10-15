
<template>
    <div>
        <!-- <div class="title"><h2>Effort Estimation Management - Detail</h2></div> -->
        
        <b-card bg-variant="light">
            <div class="projectID"><p>Project ID: {{ this.$route.params.id }}</p></div>
            <hr>
            <b-form inline>
                <label class="mr-sm-2" for="inlineFormCustomSelectPref">Project ID:</label>
                <b-input disabled class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" v-model="$store.state.effort.projectId" />
            </b-form>

        </b-card>
    </div>
</template>

<script>

export default {
    name: 'list-detail',
    
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
}

.b-form-group {
    /* margin-left: -200x; */
}

</style>