<template>
    <div>
        <h2>Meine Maschinen Nutzung</h2>
        <div class="resources">
            <span v-if="machines.length < 1" class="resource-header">Hier kannst du bald eine Übersicht zur Nutzung der Maschinen einsehen</span>
            <div v-for="m in machines" class="resource-info">
                <div class="info-row">
                    <br/>
                    <br/>
                    <span class="resource-header">{{m.name}}</span>
                </div>
                <div class="info-row">
                    <div class="info-block">
                        <div class="col info">
                            <span class="heading">Datum - Zeit</span>
                        </div>
                    </div>
                    <div v-if="!empty" class="info-block">
                        <div class="col info">
                            <span class="heading">Nutzung</span>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="col info">
                            <span class="heading">Gesamtdauer</span>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="col info">
                            <span class="heading">Preis</span>
                        </div>
                    </div>
                </div>
                <div v-for="i in m.items" class="info-row">
                    <div class="info-block">
                        <div class="col info">
                            <span>{{i.created_at | date }} - {{i.created_at | time}}</span>
                        </div>
                    </div>
                    <div v-if="!empty" class="info-block">
                        <div class="col info">
                            <span>{{i.active_seconds}} Sekunden</span>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="col info">
                            <span>{{ i.all_seconds >= 120 ||  i.all_seconds < 60 ? (Math.round(i.all_seconds/60)) + ' Minuten' : (Math.round(i.all_seconds/60)) + ' Minute'}}</span>
                            <!--<span>{{ i.all_seconds < 60 ? 'Sekunde' : 'Sekunden'}}</span>-->
                        </div>
                        <!--<div class="col info">
                            Status: <span v-bind:class="{ paid: status_id == 4 || status_id == 5}">{{status}}</span>
                        </div>
                        <div class="col info">
                            <span>Datum: {{date | date}}</span>
                        </div>-->
                    </div>
                    <div class="info-block">
                        <div class="col info">
                            <span>0€</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "log",
        props: {
            time : 0,
        },
        middleware: 'authenticated',
        data () {
            return {
                empty : false,
                resource_name : "Maschine",
                resource_names: [],
                items: [],
                machines: [],
                machine_items :[]
            }
        },
        created() {
            this.getLogs();
        },
        methods: {
            getLogs(){
                let machineType = ["B-TEC ud-800", "CoastOne C9", "Datron MLCube", "Femi 192/M", "Formlabs Form 2 #1", "Formlabs Form 2 #2",
                    "Frontdesk", "Heratherm OGS60", "Heratherm OGS750", "Kaffeemühlen", "KUKA KR 5-2 arc HW", "Lasercutter LED-Test",
                    "Markforged Mark Two", "Metabo BAS261", "Pilous ARG 235 plus", "Profi Press 30 TON", "Prusa MK3S #1", "Prusa MK3S #2 + MMU2/S",
                    "Prusa MK3S #3", "Sapi Elch 130", "Scantool 75X", "Schröder MHSU 2000", "Trotec Speedy 360 flexx", "Trotec Speedy 400",
                    "Ultimaker 3 Dual Extrusion #1", "Ultimaker 3 Dual Extrusion #2", "Ultimaker 3 Dual Extrusion #3", "Ultimaker S5 #1", "Ultimaker S5 #2",
                    "Universal Robotics UR 5e", "Voest Alpine DA 250", "Wagner Einhängekabine ID", "Walther Pilot Typ 708", "WEMO TB2024"];
                let machineName = "";
                this.$store.dispatch('getRecourseLogs').then((data) =>{
                    console.log(data.data);
                    for (let i = 0; i < machineType.length; i++){
                        if(data.data[machineType[i]]) {
                            this.resource_name = machineType[i]; // array mit namen
                            this.resource_names.push(machineType[i]);
                            machineName = machineType[i];
                            this.machines.push(
                                {"name" : machineName, "items" : data.data[machineName]}
                                );
                        }
                    }
                    console.log(this.machines);
                    /*console.log(this.resource_names);
                    for (let j=0; j < this.resource_names.length; j++){
                        console.log(data.data[this.resource_names[j]]);
                        this.machine_items.push(data.data[this.resource_names[j]]);
                    }*/
                    /*for (let j=0; j < data.data[this.resource_name].length; j++){
                        this.items[j] = data.data[this.resource_name][j];
                        // this.items[j].date = data.data[this.resource_name][j].created_at;
                    }*/

                    // console.log(this.machine_items);
                    this.machineType();


                }).catch((err) => {
                    console.log(err);
                });
            },
            machineType(){
                for (let i = 0; i < this.machines.length; i++){
                    console.log(this.machines);
                    for (let j= 0; j < this.machines[i].items.length; j ++){
                        if(this.machines[i].items[j].active_seconds == this.machines[i].items[j].all_seconds){
                            this.empty = true;
                        }
                    }
                }
                console.log(this.empty);
            },
            checkAmount(value) {
                console.log(value);
                if(value <= 1) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        computed: {
        },
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/styles.scss';
    .resources {
        width: 100%;
        margin-top: 20px;
        .resource-info {
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

        span.resource-header{
            color: #ff6f00;
        }
        .resource-header {
            font-size: large;
            font-weight: 700;
        }

        .heading{
            font-weight: 500;
        }
    }

</style>