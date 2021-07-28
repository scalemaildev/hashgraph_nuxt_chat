<template>
<v-container class="content-body">
  <div>
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
  },
};
</script>

<style scoped>
</style>
