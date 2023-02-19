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
                            <a-form-item class="container-login-item divClass" label="Date" :colon="false">
                                <a-date-picker v-model:value="this.route.date" format="YYYY-MM-DD" />
                            </a-form-item>
                            <!-- Drivers how can drive the truck -->
                            <a-form-item class="container-login-item divClass" label="Driver" :colon="false">
                                <a-select default-value="" style="width: 160px" @change="handleChange"
                                    v-model:value="this.route.driverId">
                                    <a-select-option v-for="ad in linkedDrivers" v-bind:key="ad.driverId"
                                        :value="ad.driverId">
                                        {{ ad.name }} {{ ad.surnames }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <div class="div-autocomplate">
                                <div class="divAutocomplete">
                                    <GMapAutocomplete @place_changed="setPlaceOrigin" class="autocomplate divClass inputAutocomplate"
                                        v-model="this.route.originData">
                                    </GMapAutocomplete>
                                    <!-- <a-button type="primary" icon="-" :size="size" class="buttonSumMinus" /> -->
                                </div>
                                <div class="divAutocomplete">
                                    <GMapAutocomplete @place_changed="setPlaceDestiantion" class="autocomplate divClass inputAutocomplate"
                                        v-model="this.route.destinationData">
                                    </GMapAutocomplete>
                                    <!-- <a-button type="primary" icon="-" :size="size" class="buttonSumMinus" /> -->
                                </div>
                                <!-- <a-button type="primary" icon="+" :size="size" class="buttonSumMinus" /> -->
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
                totalKm: null,
                currentMapUrl: null,
                originalMapUrl: null,
                progress: null,
                vehicle: null,
                date: null,
                origin: null,
                originData: null,
                destination: null,
                destinationData:null
            },
            linkedDrivers: [],
        };
    },
    methods: {
        setPlaceOrigin(e) {
            this.route.origin = e.formatted_address;
            this.route.originData = e;
            console.log(e)
        },
        setPlaceDestiantion(e) {
            this.route.destination = e.formatted_address;
            this.route.destinationData = e;
        },
        notification(type, message, description = "") {
            this.$notification[type]({
                message: message,
                description: description
            })
        },
        discardChanges() {
            router.push('my-routes-manager')
        },
        getManagerInfo() {
            axios({
                method: "PUT",
                // url:"http://onboard.daw.institutmontilivi.cat/api/get-linked-drivers",
                url: "http://localhost/api/get-linked-drivers",
                // url:"192.1681.67:8080/api/get-linked-drivers",
                data: {
                    "accessToken": localStorage.getItem("accessToken"),
                    "managerId": this.user.userId
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
                        console.log("get-current-user response", response);
                        this.user = response.data;
                    }
                    else if (response.data == "0") {
                        this.notification("error", "User not valid", "");
                    }
                }
            })
        },
        handleSaveChanges(e) {
            e.preventDefault();
            // Check if the values are not null
            if (this.route.date == null || this.route.driverId == null || this.route.origin == null || this.route.destination == null) {
                this.notification("error", "Missing parameters", "");
            }
            else {
                this.route.date.toISOString().replace('-', '/').split('T')[0].replace('-', '/')
                console.log(this.user)
                this.route.managerId = this.user.userId
                console.log(this.route)
                // Put the date in correct format

                // this.updateUser();
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

<style>
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
.inputAutocomplate
{
    width: 100%;
}

.buttonSumMinus {
    height: 34px;
}

.divClass {
    margin-bottom: 10px;
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

.autocomplate {
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

.div-autocomplate {
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
</style>