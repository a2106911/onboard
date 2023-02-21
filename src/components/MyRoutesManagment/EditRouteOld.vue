<template>

    <!-- Billing Information Card -->
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
        <template #title>
            <h6 class="font-semibold m-0">Route Information</h6> <!-- Here will be the progress -->
        </template>
        <a-row :gutter="[24, 24]">
            <a-col :span="24">
                <a-card :bordered="false" class="card-billing-info">
                    <div class="col-info">
                        <div class="divDateProgress">
                            <div><b>{{ route.date }}</b></div>
                            <div> <a-progress type="dashboard" :percent="route.progress" :width="90" :strokeWidth="10" /></div>
                        </div>
                        <div class="divClass">
                            Date:
                            <!-- <a-date-picker :default-value="moment(route.date, dateFormat)" :format="dateFormat" /> -->
                            <a-date-picker v-model="date" :format="dateFormat" />
                            <br />
                        </div>
                        <!-- <div class="divClass">
                            Truck:
                            <a-select :default-value=route.vehiclePlate style="width: 120px" @change="handleChange">
                                <a-select-option :value=route.vehiclePlate>
                                    {{ route.vehiclePlate }}
                                </a-select-option>
                            </a-select>
                        </div> -->
                        <div class="divClass">
                            Drivers:
                            <a-select :default-value=route.driverName style="width: 120px" @change="handleChange">
                                <a-select-option :value=route.driverName>
                                    {{ route.driverName }}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="div-autocomplate">
                            <div class="divAutocomplete">
                                <GMapAutocomplete @place_changed="setPlace" class="autocomplate divClass" :placeholder="route.origin"></GMapAutocomplete>
                                <!-- <a-button type="primary" icon="-" :size="size" class="buttonSumMinus" /> -->
                            </div>
                            <div class="divAutocomplete">
                                <GMapAutocomplete @place_changed="setPlace" class="autocomplate divClass" :placeholder="route.destination"></GMapAutocomplete>
                                <!-- <a-button type="primary" icon="-" :size="size" class="buttonSumMinus" /> -->
                            </div>
                            <!-- <a-button type="primary" icon="+" :size="size" class="buttonSumMinus" /> -->
                        </div>
                    </div>
                    <div class="col-accept-edit-delete">
                        <a-button type="link" size="small">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path class="fill-danger" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
                                    fill="#111827" />
                            </svg>
                            <span class="text-danger">DELETE</span>
                        </a-button>
                        <!-- <a-button type="link" size="small">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path class="fill-muted"
                                    d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
                                    fill="#111827" />
                                <path class="fill-muted"
                                    d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
                                    fill="#111827" />
                            </svg>
                            <span class="text-dark">EDIT</span>
                        </a-button> -->
                        <a-button type="danger" :size="size" class="buttonDiscardSave" @click="handleDiscardChanges()">
                            Discard
                        </a-button>
                        <a-button type="primary" :size="size" class="buttonDiscardSave">
                            Save
                        </a-button>
                    </div>
                </a-card>
                <a-card :bordered="false" class="card-billing-info rightText">
                    <div class="totalKm">Total: {{route.totalKm}} km </div>
                </a-card>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
import moment from 'moment';
import axios from "axios"

export default {

    name: 'App',
    props: {
        route: {},
        user: Object
    },
    data() {
        return {
            dateFormat: 'YYYY/MM/DD',
            monthFormat: 'YYYY/MM',
            dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
            userData: {}
        };
    },
    methods: {
        moment,
        setPlace(e) {
            console.log(e)
        },
        handleDiscardChanges() {
            this.$emit("discardChanges");
        },
    },
    created() {
        // Get Manager Id to have vehiclePlates and drivers associated to manager
		axios({
			method: "PUT",
			url:"http://onboard.daw.institutmontilivi.cat/api/get-routes",
			// url: "http://localhost/api/getUserInformation",
			data: {
				"accessToken": localStorage.getItem("accessToken")
			}
		}).then((response) => {
			if (response.data !== null) {
				if (response.data != "0" && response.data != false) {
					this.userData = response.data;
                    console.log(this.userData);
				}
			}
		})
    },
    computed: {
        userProps() {
            return Object.assign({}, this.user, this.userData);
        }
    }
}
</script>

<style>
.buttonDiscardSave{
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