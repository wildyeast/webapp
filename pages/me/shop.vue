<template>
   <div>
       <component v-if="story && story.content && story.content.component" :key="story.content._uid" :blok="story.content"
                  :is="story.content.component"></component>
  <div>

  </div>
   </div>



</template>

<script>
    import storyblokLivePreview from '@/mixins/storyblokLivePreview'

    export default {
        middleware: 'authenticated',
        mixins: [storyblokLivePreview],
        data() {
           return {}
        },
        created() {
        },
        mounted(){
            var stripe = Stripe('pk_test_ZoipqWabXVjKz7iIGCT1D2Nl00CNnYoQQL');
            stripe.redirectToCheckout({
                // Make the id field from the Checkout Session creation API response
                // available to this file, so you can provide it as parameter here
                // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                sessionId: 'cs_test_PaK6aKlbjBzuVakT0sxrhoMgSMGsYJkig12HTVBtTeKcBlBh1ZgOoARe'
            })
        },

        methods: {
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        asyncData(context) {
            let path = '/members/shop';
            return context.store.dispatch('loadPage', path).catch((e) => {
                context.error({statusCode: e.response.status, message: e.response.statusText})
            });
        }
    }
</script>

<style lang="scss">
</style>
