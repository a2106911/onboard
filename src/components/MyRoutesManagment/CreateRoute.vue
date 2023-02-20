<template>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
        <template #title>
            <h6 class="font-semibold m-0">Create Route</h6>
        </template>
        <a-row :gutter="[24, 24]">
            <a-col :span="24">
                <a-form @submit="handleSaveChanges">
                    <a-card :bordered="false" class="card-billing-info">
                        <div class="col-info">
                            <!-- date and progress, the prgoress will be always 0 when is creating the route-->
                            <!-- <div class="divDateProgress">
                                            <div><b>{{ formattedDate }}</b></div>
                                            <div> <a-progress type="dashboard" :percent=progress :width="90" :strokeWidth="10" /></div>
                                        </div> -->
                            <!-- Date Route -->
                            <a-form-item class="container-login-item" label="Date" :colon="false">
                                <a-date-picker v-model:value="this.route.date" format="YYYY-MM-DD" class="selectInput"/>
                            </a-form-item>
                            <!-- Drivers how can drive the truck -->
                            <a-form-item class="container-login-item" label="Driver" :colon="false">
                                <a-select default-value="" @change="handleChange"
                                    v-model:value="this.route.driverId" class="selectInput">
                                    <a-select-option v-for="ad in linkedDrivers" v-bind:key="ad.driverId"
                                        :value="ad.driverId">
                                        {{ ad.name }} {{ ad.surnames }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>


                            <!-- <div class="div-autocomplete">
                                <div class="divAutocomplete">
                                    <GMapAutocomplete @place_changed="setPlaceOrigin" class="autocomplete divClass inputAutocomplete"
                                        v-model="this.route.originData">
                                    </GMapAutocomplete>
                                </div>
                                <div class="divAutocomplete">
                                    <GMapAutocomplete @place_changed="setPlaceDestiantion" class="autocomplete divClass inputAutocomplete"
                                        v-model="this.route.destinationData">
                                    </GMapAutocomplete>
                                </div>
                            </div> -->

                            <div class="div-autocomplete">
                                <GMapAutocomplete 
                                    v-for="(routePoint, i) in routePoints"
                                    :key="i"
                                    @place_changed="setPoint($event,i)"
                                    >
                                </GMapAutocomplete>
                                <div style="display: flex; gap:20px;">
                                    <a-button @click="removeRoutePoint" :disabled="!routePoints.length >= 1">➖</a-button>
                                    <a-button @click="addRoutePoint">➕</a-button>
                                </div>

                            </div>


                        </div>
                        <div class="col-accept-edit-delete">
                            <a-button type="danger" :size="size" class="buttonDiscardSave" @click="discardChanges()">
                                Discard
                            </a-button>
                            <a-button type="primary" :size="size" class="buttonDiscardSave" htmlType="submit">
                                Save
                            </a-button>
                        </div>
                    </a-card>
                </a-form>
                <a-card :bordered="false" class="card-billing-info rightText">
                    <div class="totalKm" v-if="totalKm">Total: {{ totalKm }} km </div>
                </a-card>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';

export default {
    name: 'App',
    data() {
        return {
            user: [],
            route: {
                driverId: null,
                managerId: null,
                totalKm: "",
                currentMapUrl: "",
                originalMapUrl: "",
                progress: "",
                vehicle: "",
                date: "",
                origin: "",
                originData: "",
                destination: "",
                destinationData:""
            },
            linkedDrivers: [],
            routePoints: []
        };
    },
    methods: {
        setPoint(e,i) {
            this.routePoints[i].address = e.formatted_address;
            this.routePoints[i].coordinates = e.location;
            this.routePoints[i].sortingPosition = i;
            // console.log(e.geometry.location)
        },
        removeRoutePoint() {
            this.routePoints.pop();
        },
        addRoutePoint() {
            this.routePoints.push({
                address:"",
                sortingPosition:null,
                coordinates:""
            })
        },
        // setPlaceOrigin(e) {
        //     this.route.origin = e.formatted_address;
        //     this.route.originData = e;
        //     console.log(e)
        // },
        // setPlaceDestiantion(e) {
        //     this.route.destination = e.formatted_address;
        //     this.route.destinationData = e;
        // },
        notification(type, message, description = "") {
            this.$notification[type]({
                message: message,
                description: description
            })
        },
        discardChanges() {
            router.push('my-routes-manager');
        },
        getManagerInfo() {
            axios({
                method: "PUT",
                // url:"http://onboard.daw.institutmontilivi.cat/api/get-linked-drivers",
                url: "http://localhost/api/get-linked-drivers",
                // url:"192.1681.67:8080/api/get-linked-drivers",
                data: {
                    "accessToken": localStorage.getItem("accessToken")
                }
            }).then((response) => {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        console.log("get-linked-drivers response", response);
                        //Here we'll add any drivers that may already be linked to this manager to the select form data fields.
                        //This way we'll be able to see what drivers are already linked to the user from the form.
                        for (let i in response.data) {
                            this.linkedDrivers.push(response.data[i])
                            // this.linkedDrivers.push(response.data[i].driverId);
                        }
                    }
                    else if (response.data == "0") {
                        this.notification("warning", "Warning", "The driver specific information hasn't been found.");
                    }
                }
                // console.log("this.driverInfo",this.driverInfo)
            })
        },
        getCurrentUser() {
            axios({
                method: "PUT",
                // url:"http://onboard.daw.institutmontilivi.cat/api/get-current-user",
                url: "http://localhost/api/get-current-user",
                data: {
                    "accessToken": localStorage.getItem("accessToken")
                }
            }).then((response) => {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        // console.log("get-current-user response", response);
                        this.user = response.data;
                    }
                    else if (response.data == "0") {
                        this.notification("error", "User not valid", "");
                    }
                }
            })
        },
        createRoute() {
            axios({
                method:"PUT",
                // url:"http://onboard.daw.institutmontilivi.cat/api/create-route",
                url:"http://localhost/api/create-route",
                // url:"192.1681.67:8080/api/create-route",
                data: {
                    "accessToken":localStorage.getItem("accessToken"),
                    "driverId":this.route.driverId,
                    "totalKm":this.route.totalKm,
                    "currentMapUrl":this.route.currentMapUrl,
                    "originalMapUrl":this.route.originalMapUrl,
                    "progress":this.route.progress,
                    "vehiclePlate":this.route.vehiclePlate,
                    "date":this.route.date.toISOString().replace('-', '/').split('T')[0].replace('-', '/'),
                    "origin":this.routePoints[0].address,
                    "destination":this.routePoints.slice(-1)[0].address, //this gets the last element of the routePoints array
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data == true) {
                        this.notification("success", "Success!", `The route has been created successfully.`);
                        this.discardChanges();
                    }
                    else {
                        this.notification("error", "Error...", `The route couldn't be created.`);
                    }
                }
                else 
                    this.notification("error", "Error...", `The route couldn't be created.`);
            })
        },
        handleSaveChanges(e) {
            e.preventDefault();
            // console.log(this.routePoints.slice(-1)[0].address)
            console.log("route",this.route)
            // Check if the values are not null
            this.route.origin = this.routePoints[0].address;
            this.route.destination = this.routePoints.slice(-1)[0].address;
            if (this.route.date == null || this.route.driverId == null || this.route.origin == null || this.route.destination == null) {
            //     console.log(this.route);
                this.notification("error", "Missing parameters", "");
            }
            else {
            //     // this.route.date.toISOString().replace('-', '/').split('T')[0].replace('-', '/')
            //     // console.log(this.user)
            //     // this.route.managerId = this.user.userId
            //     // console.log(this.route)
            //     // Put the date in correct format

                this.createRoute();
            }
        }
    },
    created() {
        this.getCurrentUser()
        this.getManagerInfo()
        const loader = new Loader({
            apiKey: 'AIzaSyD8SCbN9ajO1phNjE3rAMkwcY-psqVEVIM',
            version: 'weekly',
        });
        this.loader = loader;
    },

}

</script>

<style lang="scss">
.buttonDiscardSave {
    margin-left: 20px;
    margin-right: 20px;
    width: 35%;
}

.col-accept-edit-delete {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;

}

.divAutocomplete {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.inputAutocomplete
{
    width: 100%;
}

.buttonSumMinus {
    height: 34px;
}

.divDateProgress {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}

.addPoint {
    margin-top: 10px;
    width: 10%;
    color: #141414;
    text-align: center;
}

.autocomplete {
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
    height: 40px;
    background-color: rgb(255, 255, 255);
    border-color: rgb(255, 255, 255);
    margin-bottom: 10px;
    float: right;
    height: auto;
    padding-bottom: 10px;
    color: #141414;

}

.div-autocomplete {
    margin-top: 10px;
    clear: both;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

.done {
    background-color: rgb(0, 255, 0);
    border-color: rgb(0, 255, 0);
    margin-left: 10px;
    color: white;
}

a-button :hover {
    background-color: rgb(0, 255, 0);
    border-color: rgb(0, 255, 0);
    margin-left: 10px;
    color: white;
}

.card-billing-info.ant-card .ant-btn {
    color: white;
}

.ant-btn-primary:active,
.ant-btn-primary.active,
.ant-btn-primary:focus {
    background-color: rgb(0, 0, 0);
    border-color: rgb(0, 0, 0);
}

.noDone {
    background-color: rgb(255, 0, 0);
    border-color: rgb(255, 0, 0);
    margin-left: 10px;
    color: white;
}

.middle {
    text-align: center;
}

.ant-descriptions .ant-descriptions-item-content {
    font-size: 13px;
    font-weight: 600;
    width: 100px;
    color: #141414;
    width: 50px;
    display: inline-block;
    text-align: right;
}

.card-billing-info.ant-card .ant-card-body {
    display: flex;
    flex-direction: column;
}

.rightText {
    text-align: right;
}

.totalKm {
    font-size: medium;
    font-weight: 600;
}

/* GOOGLE MAPS API ELEMENTS */
.pac-target-input {
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
    height: 40px;
    background-color: rgb(255, 255, 255);
    border-color: rgb(255, 255, 255);
    margin-bottom: 10px;
    float: right;
    height: auto;
    padding-bottom: 10px;
    color: #141414;

    @media screen and (max-width:991px) {
        width:80%;
    }
}

.ant-picker, .ant-select-selector, .ant-select {
    @media screen and (max-width:991px) {
        width:80%;
    } 
}
.selectInput {
    @media screen and (max-width:991px) {
        width:100%;        
    }
}

</style>