<template>

    <!-- Billing Information Card -->
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
        <template #title>
            <h6 class="font-semibold m-0">User Information</h6> <!-- Here will be the progress -->
        </template>
        <a-row :gutter="[24, 24]">
            <a-col :span="24">
                <a-card :bordered="false" class="card-billing-info">
                    <div class="col-info">
                        <div class="divClass1">
                            <a-row :gutter="8" class="valuesUser">
                                <a-col :span="8">
                                    <a-input default-value="DNI" disabled/>
                                </a-col>
                                <a-col :span="10">
                                    <a-input default-value="26888888" />
                                </a-col>
                            </a-row>
                            <a-row :gutter="8" class="valuesUser">
                                <a-col :span="8">
                                    <a-input default-value="Nom" disabled/>
                                </a-col>
                                <a-col :span="10">
                                    <a-input default-value="26888888" />
                                </a-col>
                            </a-row>
                            <a-row :gutter="8" class="valuesUser">
                                <a-col :span="8">
                                    <a-input default-value="Cognom" disabled/>
                                </a-col>
                                <a-col :span="10">
                                    <a-input default-value="26888888" />
                                </a-col>
                            </a-row>
                            <a-row :gutter="8" class="valuesUser">
                                <a-col :span="8">
                                    <a-input default-value="Phone" disabled/>
                                </a-col>
                                <a-col :span="10">
                                    <a-input default-value="26888888" />
                                </a-col>
                            </a-row>
                            <a-row :gutter="8" class="valuesUser">
                                <a-col :span="8">
                                    <a-input default-value="Email" disabled/>
                                </a-col>
                                <a-col :span="10">
                                    <a-input default-value="26888888" />
                                </a-col>
                            </a-row>
                            <a-row :gutter="8" class="valuesUser">
                                <a-col :span="8">
                                    <a-input default-value="SocSecNum" disabled/>
                                </a-col>
                                <a-col :span="10">
                                    <a-input default-value="26888888" />
                                </a-col>
                            </a-row>
                        </div>
                        <div class="divClass2">
                            <div class="valuesUser">
                                Role:
                                <a-select default-value="Driver" style="width: 120px" @change="handleChange">
                                    <a-select-option value="Driver">
                                        Driver
                                    </a-select-option>
                                    <a-select-option value="Manager">
                                        Manager
                                    </a-select-option>
                                    <a-select-option value="Admin">
                                        Admin
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="valuesUser">
                                Vehicle Plate:
                                <a-select default-value="BT30MOV" style="width: 120px" @change="handleChange">
                                    <a-select-option value="BT30MOV">
                                        BT30MOV
                                    </a-select-option>
                                    <a-select-option value="BT12DPJ">
                                        BT12DPJ
                                    </a-select-option>
                                    <a-select-option value="AG31KML">
                                        AG31KML
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="valuesUser">
                                Manager:
                                <a-select default-value="Miquel" style="width: 120px" @change="handleChange">
                                    <a-select-option value="Miquel">
                                        Miquel
                                    </a-select-option>
                                    <a-select-option value="Alberto">
                                        Alberto
                                    </a-select-option>
                                    <a-select-option value="Algun manager">
                                        Algun manager
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="valuesUser">
                                Active:
                                <a-select default-value="Yes" style="width: 120px" @change="handleChange">
                                    <a-select-option value="Yes">
                                        Yes
                                    </a-select-option>
                                    <a-select-option value="No">
                                        No
                                    </a-select-option>
                                </a-select>
                            </div>

                        </div>
                        <div></div>
                        <!-- <div class="divDateProgress">
                        </div>
                        <div class="divClass">
                            Date:
                            <a-date-picker @change="onChange" />
                            <br />
                        </div>
                        <div class="divClass">
                            Truck:
                            <a-select default-value="BT12ACA" style="width: 120px" @change="handleChange">
                                <a-select-option value="BT12ACA">
                                    BT12ACA
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="divClass">
                            Drivers:
                            <a-select default-value="Miquel" style="width: 120px" @change="handleChange">
                                <a-select-option value="Miquel">
                                    Miquel
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="div-autocomplate">
                            <div class="divAutocomplete">
                                <GMapAutocomplete @place_changed="setPlace" class="autocomplate divClass">
                                </GMapAutocomplete><a-button type="primary" icon="-" :size="size"
                                    class="buttonSumMinus" />
                            </div>
                            <div class="divAutocomplete">
                                <GMapAutocomplete @place_changed="setPlace" class="autocomplate divClass">
                                </GMapAutocomplete><a-button type="primary" icon="-" :size="size"
                                    class="buttonSumMinus" />
                            </div>
                            <div class="divAutocomplete">
                                <GMapAutocomplete @place_changed="setPlace" class="autocomplate divClass">
                                </GMapAutocomplete><a-button type="primary" icon="-" :size="size"
                                    class="buttonSumMinus" />
                            </div>
                            <div class="divAutocomplete">
                                <GMapAutocomplete @place_changed="setPlace" class="autocomplate divClass">
                                </GMapAutocomplete><a-button type="primary" icon="-" :size="size"
                                    class="buttonSumMinus" />
                            </div>
                            <a-button type="primary" icon="+" :size="size" class="buttonSumMinus" />
                        </div> -->
                    </div>
                    <div class="col-accept-edit-delete">
                        <a-button type="link" size="small" class="buttonDiscardSave">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path class="fill-danger" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
                                    fill="#111827" />
                            </svg>
                            <span class="text-danger">DELETE</span>
                        </a-button>
                        <a-button type="danger" :size="size" class="buttonDiscardSave">
                            Discard
                        </a-button>
                        <a-button type="primary" :size="size" class="buttonDiscardSave">
                            Save
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
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
        }
    },
    methods: {
    }
}

</script>

<style>
.col-info {
    display: flex;
    flex-direction: row;
}

.divClass1 {
    width: 50%;
    display: flex;
    flex-direction: column;
}

.divClass2 {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.valuesUser {
    margin-bottom: 15px;
}

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