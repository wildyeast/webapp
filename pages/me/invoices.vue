<template>
    <div><h2>Meine Rechnungen</h2>
        <div class="invoices">
            <span v-if="name == null" class="invoice-header">Hier kannst du bald eine Übersicht deiner Rechnungen bekommen</span>
            <div v-if="name != null" class="invoices-info">
                <div class="info-row">
                    <div class="info-block">
                        <div class="col info">
                            <span v-if="name != null" class="invoice-header">{{name}}</span>
                            <span v-if="month != null">{{month}} /</span>
                            <span v-if="year != null">{{year}}</span>
                        </div>
                        <div class="col info">
                            <a v-if="url !== undefined" v-bind:href="fileURL" @click="getDocument(url)" download="invoice.pdf">PDF</a>
                        </div>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-block">
                        <div class="col info">
                        </div>
                        <div class="col info">
                            <span>Nr: {{number}}</span>
                        </div>
                        <div class="col info">
                            Status: <span v-bind:class="{ paid: status_id == 4 || status_id == 5}">{{status}}</span>
                        </div>
                        <div class="col info">
                            <span>Datum: {{date | date}}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import saveAs from 'save-as'

    export default {
        name: "invoices",
        middleware: 'authenticated',
        data () {
            return {
                name: null,
                number: "AR-00000",
                status_id: 0,
                status: "In Bearbeitung",
                date: null,
                month: null,
                year: null,
                url: null,
                fileURL : null,
            }
        },
        created() {
            this.getInvoices();
        },
        methods: {
            getInvoices() {
                let statusDescription = ["In Bearbeitung", "Bestellt", "Versendet", "Bezahlt", "Bezahlt", "Abbuchung wurde noch nicht durchgeführt", "Noch nicht Bezahlt"];
                this.$store.dispatch("getInvoices").then((data) => {
                    for(let i = 0; i < data.data.length; i++){
                        this.name = data.data[i].name;
                        this.date = data.data[i].due_date;
                        if(data.data[i].name == "member.auto-invoice.name"){
                            this.name = "Mitgliedschaft"
                            this.year = data.data[i].due_date.split('-')[0];
                            this.month = data.data[i].due_date.split('-')[1];
                        }
                        this.number = data.data[i].human_readable_id;
                        this.status_id = data.data[i].status;
                        for (let j = 0; j < statusDescription.length; j++){
                            if(data.data[i].status == j){
                                console.log(statusDescription[j]);
                                this.status = statusDescription[j-1];
                            }
                        }
                        this.url = data.data[i].url.split('/')[6];
                        console.log(this.url);
                    }
                    }).catch((err) => {
                    console.log(err);
                });
            },
            getDocument(id) {
                this.$store.dispatch('getPDF', id).then((data) => {
                    // data.responseType = 'arraybuffer';
                    console.log(data.data);
                    let blob = new Blob([data.data], { type: "application/pdf" });
                    console.log(blob);
                    saveAs(blob, 'hello world')
                    /*this.fileURL = window.open(URL.createObjectURL(blob));
                        }).catch((err) => {
                    console.log(err);*/

                    /*var blob = new Blob([data.data], { type: 'application/pdf' });*/
                });
            },

        },
        computed: {

        },
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/styles.scss';
    .invoices {
        width: 100%;
        margin-top: 20px;
    .invoices-info {
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
        .paid {
            color: #90ee90;
        }
        .invoice-header {
            font-size: x-large;
            font-weight: 900;
        }
    }

</style>