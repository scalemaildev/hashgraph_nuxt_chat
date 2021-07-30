<template>
<v-container class="content-body">
  <v-row>
    <v-col cols="12" align="center" justify="center">
      Please enter a topic ID. This is the topic you will query for messages on the Testnet. You can also create a new topic.
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-spacer/>
    <v-col cols="5">
      <v-text-field
	v-model="topicId"
	:rules="[rules.topicId]"
	label="Topic ID"/>
    </v-col>
    <v-col cols="2">
      <v-btn
	@click="setTopicId(topicId)"
	>
	  Submit
	</v-btn>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
	@click="createAndSetTopicId()">
	New Topic
      </v-btn>
    </v-row>
  </v-container>  
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
  
export default {
  data() {
    return {
      topicId: "",
      rules: {
	topicId: value => {
	  const pattern = /0.0.[0-9]{3,}/
	  return pattern.test(value) || "Topic Id should look like 0.0.xxx"
	}
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleTopicSet',
      'toggleTopicQuerying',
      'storeTopicId'
    ]),
    ...mapActions([
      'toggleStateFlag',
      'asyncEmit'
    ]),    
    async setTopicId(topicId) {
      const result = await this.asyncEmit({
	'eventName': 'setTopicId',
	'topicId': topicId
      });
      console.log(result)
      this.storeTopicId(topicId)
      this.toggleTopicSet(true)
      this.toggleTopicQuerying(false)
    },        
    async createNewTopicId() {
      try {
	const newTopicId = await this.asyncEmit({
	  'eventName': 'createNewTopicId'
	});
	return newTopicId;
      } catch (e) {
	throw e;
      }
    },    
    createAndSetTopicId() {
      console.log('Creating new topic id...')
      this.toggleTopicQuerying(true)
      this.createNewTopicId().then(resp => {
	console.log('Got new topic id: ' + resp)
	this.setTopicId(resp)
      })
    },
  },
}
</script>
