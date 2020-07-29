<template>
    <div class="workshop-overview">
        <h2>Workshop Overview</h2>
        <div class="left-content">
            <h2 class="headline">{{date.name}}
            </h2>
            <div>
                <div class="info-row">
                    <div class="info-block">
                        <div class="col info date">
                            <icon name="calendar" />
                            <!-- <icon name="calendar" /> -->
                            Datum: {{date.content.starttime | date}}
                            <icon name="clock" />
                            Start: {{date.content.starttime | time}}

                            Ende: {{date.content.endtime | time}}
                        </div>
                        <div class="col info">
                            <div class="col register"><NuxtLink :to="{ path: $store.state.route.from.fullPath }" class="link">Zur Übersicht</NuxtLink></div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="spacer"></div>
            <div>
                <div class="info-row payment">
                    <div class="info-block">
                        <div class="col info title">
                            Zahlungdmethode auswählen
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div class="info-row option">
                    <div class="info-block">
                        <div class="col info">
                            <input type="radio" id="credit" @click="redirect" name="payment" value="credit">
                            <label for="credit">Kreditkarte</label><br>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div class="info-row option">
                    <div class="info-block">
                        <div class="col info">
                            <input type="radio" id="sepa" @click="pay" v-on:click="isHidden = isHidden" name="payment" value="sepa">
                            <label for="sepa">Sofortüberweisung</label><br>
                        </div>
                    <div v-if="!isHidden" class="col info">
                        <icon name="check"></icon>
                    </div>
                        <div v-if="isFull" class="col info">
                            <p class="full-text">Keine Plätze mehr übrig</p>
                        </div>
                </div>
                </div>

            </div>
           <!-- <div>
                <div class="info-row bare">
                    <div class="info-block">
                        <div class="col">
                            <form class="form">
                                <div class="form-item">
                                    <label for="iban">IBAN</label>
                                    <input class="input-text" id="iban" type="text" name="number" value="" placeholder="AT00 1234 0000 5678 9101">
                                </div>
                                <div class="form-item">
                                    <label for="bic">BIC</label>
                                    <input class="input-text" type="text" id="bic" name="name" value="" placeholder="BANKAT00">
                                </div>
                                <div class="form-item">
                                    <label for="depot">KONTOINHABER/IN</label>
                                    <input class="input-text" type="text" id="depot" name="expires" value="" placeholder="Maxi Muster">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>-->
        </div>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        name: "buyWorkshop",
        props: {
            text: "Lorem Ipsum",
            // date : Array
        },
        data() {
            return {
                isHidden: true,
                isFull: false,
            }
        },
        computed: {
            date() {
                return this.$route.query.date;
            }
        },
        mounted() {
            console.log(this.$route.query);
            console.log(this.$route.query.date.uuid);
            console.log(this.$store);
        },

        methods: {
            redirect: function(){
                let data = {
                    workshop_date_id: this.$route.query.date.uuid,
                    payment_method: 1,
                }
                this.$store.dispatch("bookWorkshop", data).then((data) => {
                    console.log(data);
                   if(data.success) {
                       var stripe = Stripe('pk_test_ZoipqWabXVjKz7iIGCT1D2Nl00CNnYoQQL');
                       stripe.redirectToCheckout({
                           sessionId: data.session_id,
                       });
                   }
                });
                console.log(this.$store);

                /* neues Stripe by success
                var stripe = Stripe('pk_test_ZoipqWabXVjKz7iIGCT1D2Nl00CNnYoQQL');
                stripe.redirectToCheckout({
                    // Make the id field from the Checkout Session creation API response
                    // available to this file, so you can provide it as parameter here
                    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                    sessionId: 'cs_test_PaK6aKlbjBzuVakT0sxrhoMgSMGsYJkig12HTVBtTeKcBlBh1ZgOoARe'
                })*/
            },
            pay: function () {
                let data = {
                    workshop_date_id: this.$route.query.date.uuid,
                    payment_method: 2,
                }
                this.$store.dispatch("bookWorkshop", data).then((data) => {
                    if(data.success){
                        console.log(data);
                        this.isHidden = false;
                    }
                }).catch((err) => {
                    console.log(err);
                    console.log(err.response.data.msg);
                    this.isFull = true;
                });;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/styles.scss';

    .workshop-overview {
        color: #000;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
    @include margin-page-wide();
    @include media-breakpoint-up(md) {
        margin: 0 100px;
    }
    .left-content {
    .headline {
        position: relative;
    @include media-breakpoint-up(md) {
        max-width: 50%;
        font-size: 2.8rem;
    }
    @include media-breakpoint-down(sm) {
        margin: 3vh 5%;
    }
    line-height: 1.5;
    font-family: $font-secondary;
    }
        .spacer {
            margin: 20px;
        }
        .info-row {
            @include media-breakpoint-down(md) {
                flex-direction: column;
            }
            background-color: #fff;
            line-height: 1.6;
            font-family: $font-mono;
            font-size: 0.9rem;
            font-weight: bold;
            margin: -8px;
            display: flex;

            &.option {
                padding: 10px;
            }

            &.payment {
                background-color: #000;
                color: #fff;
            }
            &.bare{
                background: none;
                padding: 20px;
            }
            .info-block {
                flex: 1;
                flex-direction: row;
                display: flex;
            }
            .info-block {
                flex: 1;
                flex-direction: row;
                display: flex;
                justify-content: space-between;
            }
            .col {
                padding: 8px;
                &.soldOut {
                    color: $color-orange;
                    text-transform: uppercase;
                }
                &.register {
                    background-color: $color-orange;
                    a {
                        color: #FFF;
                    }
                }
                &.date {
                    padding-top: 16px;
                }
                &.title {
                    padding: 20px;
                }
            }
            svg {
                height: 1em;
                width: 1em;
            }
        }
    }
        .form .form-item {
            grid-template-columns: 54% 72%;
        }
        .full-text {
            color: #ff0000;
            margin-bottom: 0;
            margin-top: 0;
        }

    }
</style>