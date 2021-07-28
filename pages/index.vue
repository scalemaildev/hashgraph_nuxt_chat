<template>
<v-container class="content-body">
  <div v-if="topicQuerying && !topicSet">
    <v-row>
      <v-col cols="12" align="center" justify="center">
	Fetching new topic ID...
      </v-col>
    </v-row>
  </div>
  <div v-else-if="!topicSet && !topicQuerying">
    <v-row>
      <v-col cols="12" align="center" justify="center">
	Please enter a topic ID. This is the topic you will query for messages on the Testnet. You can also create a new topic.
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-spacer/>
      <v-col cols="5">
	<v-text-field
	  v-model="ephTopicId"
	  :rules="[rules.topicId]"
	  label="Topic ID"/>
      </v-col>
      <v-col cols="2">
	<v-btn
	  @click="setTopicId(ephTopicId)"
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
  </div>
  <div v-else-if="topicSet && !topicQuerying && !mirrorSubbed">
    <v-row>
      <v-col cols="12" align="center" justify="center">
	<p><strong>Topic Id: {{ topicId }}</strong></p>
	<p>Subscribing to Mirror Network <i>
	    hcs.testnet.mirrornode.hedera.com:5600</i>...</p>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
	@click="subscribeToMirror()">
	Subscribe
      </v-btn>
    </v-row>
  </div>
  <div v-else>
    <v-row>
      <v-col cols="12" align="center" justify="center">
	<strong>Success!</strong>
      </v-col>
    </v-row>    
  </div>
</v-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      ephTopicId: "",
      rules: {
	topicId: value => {
	  const pattern = /0.0.[0-9]{3,}/
	  return pattern.test(value) || "Topic Id should look like 0.0.xxx"
	}
      }
    }
  },
  computed: {
    topicQuerying () {
      return this.$store.state.topicQuerying
    },
    topicSet () {
      return this.$store.state.topicSet
    },
    topicId () {
      return this.$store.state.topicId
    },
    mirrorSubbed () {
      return this.$store.state.mirrorSubbed
    }
  },
  created() {
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'main',
      reconnection: false
    })
    this.socket.emit('initHederaClient')
  },
  methods: {
    ...mapMutations([
      'setEnv',
      'initHashgraphClient',
      'setTopicId',
      'createNewTopicId',
    ]),
    ...mapActions([
      'createAndSetTopicId',
    ]),
    subscribeToMirror() {
      return new Promise((resolve) => {
        this.socket.emit('subscribeToMirror', {
	  client: this.$store.state.HederaClient,
	  topicId: this.$store.state.topicId
	}, (resp) => {
          resolve()
        })
      })
    },
  }
};
</script>

<style scoped>
</style>
