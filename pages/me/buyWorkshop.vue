<template>
    <div class="workshop-overview">
        <h2>Workshop Overview</h2>
        <div class="left-content" v-if="workshopDate != null">
            <h2 class="headline">{{workshopDate.name}}
            </h2>
            <div>
                <div class="info-row">
                    <div class="info-block">
                        <div class="col info date">
                            <icon name="calendar"/>
                            <!-- <icon name="calendar" /> -->
                            Datum: {{workshopDate.content.starttime | date}}
                            <icon name="clock"/>
                            Start: {{workshopDate.content.starttime | time}}

                            Ende: {{workshopDate.content.endtime | time}}
                        </div>
                        <div class="col info">
                            <div class="col register">
                                <NuxtLink :to="{ path: $store.state.route.from.fullPath }" class="link">Zur Übersicht
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="spacer"></div>


            <div v-if="step == 0">
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
                                <input type="radio" id="credit" @click="selectPaymentMethod(1)" name="payment"
                                       value="credit">
                                <label for="credit">Kreditkarte</label><br>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="info-row option">
                    <div class="info-block">
                        <div class="col info">
                            <input type="radio" id="sepa" @click="selectPaymentMethod(2)"
                                   name="payment" value="sepa">
                            <label for="sepa">Sofortüberweisung</label><br>
                        </div>
                    </div>
                </div>
                <button @click="onNextStep(1)">pay</button>

            </div>

            <div v-if="step == 1">
                {{paymentMethod}}
                check payment
                <button @click="onNextStep(2)">pay</button>


            </div>

            <div v-if="step == 2">
                payment processing


            </div>
            <div v-if="step == 3">
                done


            </div>

        </div>
    </div>

</template>

<script>

    export default {
        name: "buyWorkshop",
        props: {},
        data() {
            return {
                paymentMethod: 0,
                step: 0,
                workshopDate: null
            }
        },
        mounted() {
            this.$store.dispatch("loadStoryByUUid",this.$route.query['uuid']).then(data =>{
                this.workshopDate = data.story;
            })
        },
        methods: {

            selectPaymentMethod(pm) {
                this.paymentMethod = pm;
            },

            onNextStep(step) {
                this.step = step;
                switch (step) {
                    case 2:
                        this.pay();
                        break;
                }
            },

            redirect: function (data) {
                var stripe = Stripe('pk_test_ZoipqWabXVjKz7iIGCT1D2Nl00CNnYoQQL');
                stripe.redirectToCheckout({
                    sessionId: data.session_id,
                });
            },

            pay: function () {
                let data = {
                    workshop_date_id: this.workshopDate.uuid,
                    payment_method: this.paymentMethod,
                }
                this.$store.dispatch("bookWorkshop", data).then((data) => {
                    if (data.success) {
                        switch (this.paymentMethod) {
                            case 1:
                                this.redirect(data)
                                break;
                            case 2:
                                this.step = 3;

                                break;
                        }
                    }
                });
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

                &.bare {
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
