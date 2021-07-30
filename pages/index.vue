<template>
<div>
<div v-if="topicQuerying && !topicSet">
  <FetchPanel />
</div>
<div v-else-if="!topicSet && !topicQuerying">
  <StartPanel />
</div>
<div v-else-if="topicSet && !topicQuerying && !mirrorSubbed">
  <SubscribePanel />
</div>
<div v-else>
  <Chatbox />
</div>
</v-container>
</div>
</template>

<script>
import { mapActions } from 'vuex';

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
  computed: {
    topicQuerying () {
      return this.$store.state.topicQuerying
    },
    topicSet () {
      return this.$store.state.topicSet
    },
    mirrorSubbed () {
      return this.$store.state.mirrorSubbed
    }
  },
  mounted() {
    this.$root.mainSocket = this.$nuxtSocket({
      name: 'main',
      persist: 'mainSocket',
      reconnection: false
    })
    this.initHederaClient()
  },
  methods: {
    ...mapActions([
      'asyncEmit'
    ]),
    async initHederaClient () {
      const result = await this.asyncEmit({
	'eventName': 'initHederaClient'
      });
      console.log(result);
    },
  }
};
</script>
