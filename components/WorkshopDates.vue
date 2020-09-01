<template>
    <div class="workshop-dates">
        <div class="workshop-date" v-for="d in dates" :class="{ soldOut: d.content.sold_out }">
            <div class="info-row">
                <div class="info-block">
                    <div class="col info">
                        <icon name="calendar"/>
                        {{d.content.starttime | date}}
                    </div>
                    <div class="col info">
                        <icon name="clock"/>
                        <span>{{d.content.starttime | time}}</span>
                        <span v-if="d.content.endtime"> bis {{d.content.endtime | time}}</span>
                        <span>Uhr</span>
                    </div>
                </div>
                <div class="info-block">
                    <div class="col" v-if="d.content.members_only">
                        <icon name="user"/>
                        <span>Members only!</span>
                    </div>
                    <!--<div class="col soldOut" v-if="d.content.sold_out">
                      <span>ausgebucht</span>
                    </div>-->


                    <div class="col" v-if="metadata != null">
                        <span>Preis: {{ metadata[d.uuid].price }}EUR</span>
                    </div>

                    <div class="col" v-if="metadata == null && logged_in != false && hideRegister != true">
                        <loading-spinner color="black"></loading-spinner>
                    </div>
                    <div class="col" v-if="metadata == null && logged_in == false && hideRegister != true">
                        login required
                    </div>
                    <div class="spacer"></div>

                    <div class="col soldOut" v-if="metadata != null &&metadata[d.uuid].occupancy == 100">
                        <span>ausgebucht</span>
                    </div>
                    <div class="col occupanc y" v-if="metadata != null &&metadata[d.uuid].occupancy != 100">
                        <span>aktuelle Auslastung: {{ metadata[d.uuid].occupancy }}%</span>
                    </div>
                    <div class="spacer"></div>

                    <!--<div class="col register" v-if="d.content.link && d.content.link.cached_url && d.content.link.cached_url != '' && !d.content.sold_out">
                      <a :href="d.content.link.cached_url" class="link" target="_blank">Zur Anmeldung</a>
                    </div>
                    -->
                    <div class="col register"
                         :class="{disabled: metadata == null || metadata[d.uuid].occupancy == 100}"
                        v-if="hideRegister != true">
                        <NuxtLink :event="metadata == null || metadata[d.uuid].occupancy == 100 ? '': 'click'"
                                  :to="{ path: '/me/buyWorkshop', query: { uuid: d.uuid }}" class="link">Zur Anmeldung
                        </NuxtLink>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            dates: Array,
            date: Array,
            hideRegister: Boolean
        },
        data() {
            return {
                metadata: null,
                logged_in: null
            }
        },
        computed: {
            content() {
                return this.date.content;
            }
        },
        mounted() {
            console.log(this.dates);
            this.loadMetaData();
        },
        created() {

        },
        methods: {
            loadMetaData: function () {
                let body = {
                    "workshop_date_uuids": [],
                }

                for (let date of this.dates) {
                    body.workshop_date_uuids.push(date.uuid)
                }
                console.log(this.$store);
                this.$store.dispatch("checkAuth").then((_) => {
                    this.$store.dispatch("getWorkshopDateMetadata", body).then((data) => {
                        this.metadata = data;
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    this.logged_in = false;
                });





            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/styles.scss';

    .workshop-dates {
        width: 100%;
        margin-top: 20px;

        .workshop-date {
            margin-top: 4px;
            padding: 10px;
            background-color: #FFF;

            &.soldOut {
                color: #666;
                fill: #666;

                .col {
                    &.info {
                        text-decoration: line-through;
                    }
                }
            }

            .info-row {
                @include media-breakpoint-down(md) {
                    flex-direction: column;
                }
                line-height: 1.6;
                font-family: $font-mono;
                font-size: 0.9rem;
                font-weight: bold;
                margin: -8px;
                display: flex;

                .info-block {
                    flex: 1;
                    flex-direction: row;
                    display: flex;
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
                }

                .spacer {
                    flex: 1;
                }

                svg {
                    height: 1em;
                    width: 1em;
                }
            }
        }

        .disabled {
            background-color: lightgray !important;
            pointer-events: none;
        }
    }
</style>
