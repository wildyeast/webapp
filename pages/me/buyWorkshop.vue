<template>
    <div class="workshop-overview">
        <div class="left-content" v-if="workshopDate != null">
            <h1>Workshop-Buchung</h1>

            <workshop-preview class="preview"  :key="workshopDate.content.workshop.uuid" :id="workshopDate.content.workshop.uuid"></workshop-preview>
            <workshop-dates :dates="[workshopDate]" class="workshop-dates" :hideRegister="true"></workshop-dates>

            <div class="spacer"></div>


            <div v-if="step == 0 && userMetadata != null">
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

                <div class="info-row option" v-if="userMetadata.sepa_active">
                    <div class="info-block">
                        <div class="col info">
                            <input type="radio" id="sepa" @click="selectPaymentMethod(2)"
                                   name="payment" value="sepa">
                            <label for="sepa">SEPA-Monatsrechnung</label><br>
                        </div>
                    </div>
                </div>
                <div class="spacer"></div>

                <button class="link" @click="onNextStep(1)">Weiter</button>

            </div>

            <div v-if="step == 1">
                <h2>Bestätigung</h2>

                <span>Zahlungsmethode {{paymentMethod==2?'SEPA-Monatsrechnung':'Kreditkarte'}}</span>

                <div class="spacer"></div>

                <button class="link" @click="onNextStep(2)">Workshop buchen</button>


            </div>

            <div v-if="step == 2">
                <loading-spinner color="black"></loading-spinner>
            </div>
            <div v-if="step == 3">
                Workshop gebucht!


            </div>

        </div>
    </div>

</template>

<script>
import WorkshopDates from "../../components/WorkshopDates";
import WorkshopPreview from "../../components/WorkshopPreview";
    export default {
        name: "buyWorkshop",
        props: {},
        data() {
            return {
                paymentMethod: 0,
                step: 0,
                workshopDate: null,
                userMetadata: null
            }
        },
        mounted() {
            this.$store.dispatch("loadStoryByUUid",this.$route.query['uuid']).then(data =>{
                this.workshopDate = data.story;
            });
            this.$store.dispatch("getUserMetadata").then(data =>{
                this.userMetadata = data.data;
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
                var stripe = Stripe('pk_live_XCUCaJMt8kMEpedQdvmtMu4Z00rNP9VDun');
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
        .link {
            cursor: pointer;
            font-weight: bold;
            padding: 10px;
            border: none;
            outline: none;
            color: #FFF;
            background-color: $color-orange;
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
                //margin: -8px;
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
<style lang="scss">
    .preview{
        pointer-events: none;
    .preview-wrapper{
    .workshop-preview{
        width: 100% !important;
        padding: 0!important;
        .story{
            padding:0;
        }
    }
    }

    }
</style>
