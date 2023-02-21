<template>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
        <template #title>
            <h6 class="font-semibold m-0">Route Information</h6> <!-- Here will be the progress -->
        </template>
        <a-row :gutter="[24, 24]">
            <a-col :span="24">
                <a-card :bordered="false" class="card-billing-info">
                    <div class="col-info">
                        <div class="divDateProgress">
                            <div><b>{{ routeInfo.date }}</b></div>
                            <div> <a-progress type="dashboard" :percent=replicaOfRoute.progress :width="90" :strokeWidth="10" />
                            </div>
                        </div>
                        <div class="divPoints" v-for="point in routePoints" v-bind:key="point.pointId">
                            <a-descriptions-item>
                                <div class="row">
                                    <a-card>
                                        {{ point.sortingPosition }}
                                    </a-card>
                                    <a-card class="cardAdress">
                                        {{ point.address }}
                                    </a-card>
                                </div>
                                <div class="row">
                                    <a-button type="primary" class="done" 
                                        @click="done(point.pointId, point.sortingPosition)" :disabled="point.isCompleted == 'false'">
                                        {{ point.isDisabled ? 'Loading...' : 'DONE' }}
                                    </a-button>
                                    <a-button type="primary" class="noDone" 
                                        @click="notdone(point.pointId, point.sortingPosition)" :disabled="point.isCompleted == 'true'" >
                                        {{ point.isDisabled ? 'Loading...' : 'NOT DONE' }}
                                    </a-button>
                                </div>

                            </a-descriptions-item>
                        </div>
                    </div>
                </a-card>
                <a-card :bordered="false" class="card-billing-info rightText">
                    <div class="totalKm" v-if=routeInfo.totalKm>Total: {{ routeInfo.totalKm }} km </div>
                </a-card>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
import axios from 'axios';

export default ({
    props: [
        "routeInfo",
    ],
    data() {
        return {
            routePoints: [],
            valueToIncrease : 0,
            replicaOfRoute:{
                routeId:this.routeInfo.routeId,
                driverId:this.routeInfo.driverId,
                managerId:this.routeInfo.managerId,
                totalKm:this.routeInfo.totalKm,
                originalMapUrl:this.routeInfo.originalMapUrl,
                progress:Number(this.routeInfo.progress),
                vehiclePlate:this.routeInfo.vehiclePlate,
                date:this.routeInfo.date,
                origin:this.routeInfo.origin,
                destination:this.routeInfo.destination
            },
        }
    },
    methods: {
        getRoutePoints() {
            axios({
                method: "PUT",
                url:"http://onboard.daw.institutmontilivi.cat/api/get-route-points",
                // url: "http://localhost/api/get-route-points",
                data: {
                    "accessToken": localStorage.getItem("accessToken"),
                    "routeId": this.routeInfo.routeId
                }

            }).then((response) => {
                console.log(this.routeInfo.routeId);
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        // console.log("get-routes response",response);
                        this.routePoints = response.data;
                        console.log(response.data);
                    }
                    else if (response.data == "0") {
                        this.noRoutesWarning();
                    }
                }
            })
        },
        noWarning() {
			this.$notification["warning"]({
				message: "Error",
				description:
				"Error to update values",
			});
        },
        done(pointId, sortingPosition) {

            this.routePoints[sortingPosition].isCompleted = 'false'

            // Decrease progress and update
            this.valueToIncrease = parseInt(100/this.routePoints.length)
            this.replicaOfRoute.progress = this.replicaOfRoute.progress - this.valueToIncrease;
            if(this.replicaOfRoute.progress == 1) {
                this.replicaOfRoute.progress = 0
            }
            this.updateProgressPoint(pointId,this.routePoints[sortingPosition].isCompleted = 'false')
        },
        notdone(pointId, sortingPosition) {
            this.routePoints[sortingPosition].isCompleted = 'true'
            // Increase progress and update
            this.valueToIncrease = parseInt(100/this.routePoints.length)
            this.replicaOfRoute.progress = this.replicaOfRoute.progress + this.valueToIncrease;
            if(this.replicaOfRoute.progress == 99) {
                this.replicaOfRoute.progress = 100
            }
            this.updateProgressPoint(pointId,this.routePoints[sortingPosition].isCompleted = 'true')

        },
        updateProgressPoint(pointId, isCompleted){
            axios({
                method: "PUT",
                url:"http://onboard.daw.institutmontilivi.cat/api/route-status-update",
                // url: "http://localhost/api/route-status-update",
                data: {
                    "accessToken": localStorage.getItem("accessToken"),
                    "routeId": this.routeInfo.routeId,
                    "progress": this.replicaOfRoute.progress,
                    "pointId": pointId,
                    "isCompleted": isCompleted
                }

            }).then((response) => {
                // if (response.data != null && response.data != "0")
                // {
                // }
                if (response.data !== null) {
                    if (response.data == "0") {
                        this.noWarning();
                    }
                }
                this.$emit("updateValues");
                console.log("fill del fill")

            })
        }
    },
    created() {
        this.getRoutePoints()
    }
})

</script>

<style lang="scss">
.row {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
}

.cardAdress {
    width: 100%;
}

.divPoints {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width:991px) {
        flex-direction: column;
        width: 100%
    }
}

.divPoint {
    margin-bottom: 10px;
}

.divDateProgress {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px
}

.done {
    background-color: rgb(0, 255, 0);
    border-color: rgb(0, 255, 0);
    margin-left: 10px;
    color: white;

    @media screen and (max-width:991px) {
        width: 100%
    }
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

    @media screen and (max-width:991px) {
        width: 100%
    }
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
}</style>