<template>
    <!-- <p>{{ JSON.stringify(user) }}</p> -->

    <a-form @submit="handleSaveChanges">
        <div  class="oneUserContainer">
        <!-- GENERAL USER INFO -->
        <a-card :bordered="true" class="infoAntCard">
            <h5>General User Details - user {{ user.userId }}</h5>
            <!-- national ID -->
            <a-form-item class="container-login-item" label="DNI" :colon="false">
                <input class="ant-input" type="text" v-model="this.replicaOfUser.nationalId">
            </a-form-item>
            <!-- Name -->
            <a-form-item class="container-login-item" label="Name" :colon="false">
                <input class="ant-input" type="text" v-model="this.replicaOfUser.name">
            </a-form-item>
            <!-- Surnames -->
            <a-form-item class="container-login-item" label="Surnames" :colon="false">
                <input class="ant-input" type="text" v-model="this.replicaOfUser.surnames">
            </a-form-item>
            <!-- Password -->
            <a-form-item class="container-login-item" label="Password" :colon="false">
                <div style="display:flex;align-items: flex-end;justify-content: center;">
                    <input class="ant-input" type="text" v-model="this.replicaOfUser.password" :disabled="!editPasswordMode">
                    <a-button type="primary" @click="editPasswordToggle">Edit</a-button>
                </div>
                </a-form-item>
            <!-- Email -->
            <a-form-item class="container-login-item" label="Email" :colon="false">
                <input class="ant-input" type="text" v-model="this.replicaOfUser.email">
            </a-form-item>
            <!-- SocSecNum -->
            <a-form-item class="container-login-item" label="SocSecNum" :colon="false">
                <input class="ant-input" type="text" v-model="this.replicaOfUser.socSecNum">
            </a-form-item>
            <!-- Phone -->
            <a-form-item class="container-login-item" label="Phone" :colon="false">
                <input class="ant-input" type="text" v-model="this.replicaOfUser.phone">
            </a-form-item>
            <!-- IsActive -->
            <a-form-item class="container-login-item" label="Active" :colon="false" style="display:flex;flex-direction:row;">
                <a-switch size="big" v-model:checked="this.replicaOfUser.isActive" :colon="false" checkedValue="true" unCheckedValue="false"/>
                <!-- <input class="ant-input" type="text" v-model="this.replicaOfUser.isActive"> -->
            </a-form-item>
        </a-card>
        <!-- SPECIFIC USER INFO -->
        <a-card :bordered="true" class="infoAntCard">
            <h5>Role Specific Details</h5>
            <div style="height:80%">
                    <!-- role -->
                <a-form-item class="container-login-item" label="Role" :colon="false">
                    <a-select v-model:value="selectedRole" disabled>
                        <a-select-option value="driver">
                            Driver
                        </a-select-option>
                        <a-select-option value="manager">
                            Manager
                        </a-select-option>
                        <a-select-option value="admin">
                            Admin
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <!-- driver -->
                <div v-if="selectedRole=='driver'">
                    <!-- Linked manager -->
                    <a-form-item class="container-login-item" label="Linked manager" :colon="false">
                        <div style="display:flex;align-items: flex-end;justify-content: center;">
                            <a-select
                                placeholder="-"
                                v-model:value="linkedManagerInput"
                                clearIcon
                                style="justify-content: center;"
                            >
                                <a-select-option v-for="m in availableManagers" v-bind:key="m.userId" :value="m.userId">
                                    {{m.name}} {{ m.surnames }}
                                </a-select-option>
                            </a-select>
                            <a-button type="ghost" style="height:30px;" @click="clearDriverLinkedManager">Clear</a-button>
                        </div>
                    </a-form-item>
                    <!-- Default vehicle plate -->
                    <a-form-item class="container-login-item" label="Default vehicle plate" :colon="false">
                        <input class="ant-input" type="text" v-model="this.driverInfo.defaultVehiclePlate">
                    </a-form-item>
                </div>
                <!-- manager -->
                <div v-else-if="selectedRole=='manager'">
                    <a-form-item class="container-login-item" label="Linked drivers" :colon="false">
                        <a-select
                            mode="multiple"
                            v-model:value="linkedDriversInput"
                            :options="linkedDrivers"
                        >
                            <a-select-option 
                                v-for="ad in availableDrivers" 
                                v-bind:key="ad.driverId" 
                                :value="ad.driverId"
                                >
                                    {{ad.name}} {{ad.surnames}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>

            <div class="buttonsContainer">
                <a-button type="danger" :size="size" class="buttonDiscardSave" @click="handleDiscardChanges()">
                    Discard
                </a-button>
                <a-button type="primary" :size="size" class="buttonDiscardSave" htmlType="submit">
                    Save
                </a-button>
            </div>
        </a-card>
    </div>
    </a-form>
</template>

<script>
import axios from "axios"
import { MD5 } from 'crypto-js';

export default ({
    props: ["user"],
    data() {
        return {
            //replicaOfUser is a copy of the user prop that will enable us to modify its values and read them before submitting.
            replicaOfUser:{
                email:this.user.email,
                isActive:this.user.isActive,
                name:this.user.name,
                password:this.user.password,
                nationalId:this.user.nationalId,
                phone:this.user.phone,
                role:this.user.role,
                socSecNum:this.user.socSecNum,
                surnames:this.user.surnames,
                userId:this.user.userId
            },
            selectedRole:null,
            password:"",
            availableManagers:[],
            availableDrivers:[],
            linkedManagerInput:null,
            linkedDriversInput:[],
            driverInfo:{
                driverId:"",
                managerId:"",
                defaultVehiclePlate:"",
                managerName:"",
                managerSurnames:""
            },
            editPasswordMode:false
        }
    },
    methods: {
        //This method enables us to display dynamic notifications to the user.
        notification(type, message, description="") {
            this.$notification[type]({
                message: message,
                description: description
            })
        },
        handleDiscardChanges() {
            this.$emit("discardChanges");
        },
        handleSaveChanges(e) {
            e.preventDefault();
            //first, we need to check if the password has been  changed:
            if (this.user.password == this.replicaOfUser.password) {
                this.password = this.user.password;
            } 
            else 
                this.password = MD5(this.replicaOfUser.password).toString();
            
            this.updateUser();
        },
        clearDriverLinkedManager () {
            this.linkedManagerInput = null;
        },
        editPasswordToggle() {
            if (this.editPasswordMode) {
                this.editPasswordMode = false;
                this.replicaOfUser.password = this.user.password;
            }
            else {
                this.editPasswordMode = true;
                this.replicaOfUser.password = "";
            }
        },
        getAvailableManagers() {
            axios({
                method:"PUT",
                url:"http://onboard.daw.institutmontilivi.cat/api/get-available-managers",
                // url:"http://localhost/api/get-available-managers",
                // url:"192.1681.67:8080/api/get-available-managers",
                data: {
                    "accessToken":localStorage.getItem("accessToken")
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        this.availableManagers = response.data;
                    }
                    else if (response.data == "0") {
                        this.notification("warning", "No routes found", "You don't have any routes.");
                    }
                }
            })
        },
        getDriverInfo() {
            axios({
                method:"PUT",
                url:"http://onboard.daw.institutmontilivi.cat/api/get-driver",
                // url:"http://localhost/api/get-driver",
                // url:"192.1681.67:8080/api/get-driver",
                data: {
                    "accessToken":localStorage.getItem("accessToken"),
                    "driverId":this.user.userId
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        //In order to prevent js crashes, we need to make sure no entries in the response have null as a value.
                        if (response.data.defaultVehiclePlate === null) response.data.defaultVehiclePlate = "";
                        if (response.data.managerId === null) response.data.managerId = "";
                        if (response.data.managerName === null) response.data.managerName = "";
                        if (response.data.managerSurnames === null) response.data.managerSurnames = "";
                        this.driverInfo = response.data;

                        this.linkedManagerInput = response.data.managerId;
                    }
                    else if (response.data == "0") {
                        this.notification("warning", "Warning", "The driver specific information hasn't been found.");
                    }
                }
            })
        },
        getManagerInfo() {
            axios({
                method:"PUT",
                url:"http://onboard.daw.institutmontilivi.cat/api/get-linked-drivers",
                // url:"http://localhost/api/get-linked-drivers",
                // url:"192.1681.67:8080/api/get-linked-drivers",
                data: {
                    "accessToken":localStorage.getItem("accessToken"),
                    "managerId":this.user.userId
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        //Here we'll add any drivers that may already be linked to this manager to the select form data fields.
                        //This way we'll be able to see what drivers are already linked to the user from the form.
                        for(let i in response.data) {
                            this.availableDrivers.push(response.data[i])
                            this.linkedDriversInput.push(response.data[i].driverId);
                        }
                    }
                    else if (response.data == "0") {
                        this.notification("warning", "Warning", "The driver specific information hasn't been found.");
                    }
                }
            })
        },
        getAvailableDrivers() {
            axios({
                method:"PUT",
                url:"http://onboard.daw.institutmontilivi.cat/api/get-available-drivers",
                // url:"http://localhost/api/get-available-drivers",
                // url:"192.1681.67:8080/api/get-available-drivers",
                data: {
                    "accessToken":localStorage.getItem("accessToken")
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        this.availableDrivers = response.data;
                    }
                    else if (response.data == "0") {
                        this.notification("warning", "No available drivers...", "We currently do not have any free drivers available.");
                    }
                }
            })
        },
        updateUser() {
            axios({
                method:"PUT",
                url:"http://onboard.daw.institutmontilivi.cat/api/modify-user",
                // url:"http://localhost/api/modify-user",
                // url:"192.1681.67:8080/api/modify-user",
                data: {
                    "accessToken":localStorage.getItem("accessToken"),
                    "userId":this.user.userId,
                    "name":this.replicaOfUser.name,
                    "surnames":this.replicaOfUser.surnames,
                    "password":this.password,
                    "nationalId":this.replicaOfUser.nationalId,
                    "socSecNum":this.replicaOfUser.socSecNum,
                    "phone":this.replicaOfUser.phone,
                    "email":this.replicaOfUser.email,
                    "role":this.replicaOfUser.role,
                    "isActive":this.replicaOfUser.isActive,
                    "managerId":this.linkedManagerInput,
                    "defaultVehiclePlate":this.driverInfo.defaultVehiclePlate,
                    "linkedDrivers":this.linkedDriversInput
                }
            }).then((response)=> {
                if (response.data !== null) {

                    if (response.data.driverModificationStatus && response.data.managerModificationStatus && response.data.userModificationStatus) {
                        this.notification("success", "Changes applied successfully")
                    }
                    else {
                        if (response.data.driverModificationStatus == "0") {
                        this.notification("warning", "No changes.", "The data you've sent is the same we already had.")
                        }                    
                        else if (response.data.driverModificationStatus == false) {
                            this.notification("error", "Error", "The driverModificationStatus modification operation failed.")
                        }
                        else if (response.data.driverModificationStatus == true) {
                            this.notification("success", "Changes applied successfully")
                        }
                        if (response.data.managerModificationStatus == "0") {
                            this.notification("warning", "No changes.", "The data you've sent is the same we already had.")
                        }
                        else if (response.data.managerModificationStatus == false) {
                            this.notification("error", "Error", "The managerModificationStatus modification operation failed.")
                        }
                        else if (response.data.managerModificationStatus == true) {
                            this.notification("success", "Changes applied successfully")
                        }
                        if (response.data.userModificationStatus == "0") {
                            this.notification("warning", "No changes.", "The data you've sent is the same we already had.")
                        }
                        else if (response.data.userModificationStatus == false) {
                            this.notification("error", "Error", "The userModificationStatus modification operation failed.")
                        }
                        else if (response.data.userModificationStatus == true) {
                            this.notification("success", "Changes applied successfully")
                        }
                    }
                        this.$emit("updateValues");
                }
                else {
                    this.notification("error", "Error.", "Your changes couldn't be applied.");
                }
            })
        }
    },
    mounted() {        
        //Driver information in case the selected user is a driver:
        if (this.user.role == "driver") {
            this.getDriverInfo();
            this.getAvailableManagers();
        }
        else if (this.user.role == "manager") {
            this.getManagerInfo();
            this.getAvailableDrivers();
        }
        
    },
    created () {
        this.selectedRole = this.user.role;
    },
    computed: {
        md5Hash() {
        const hash = crypto.createHash('md5');
        hash.update(this.replicaOfUser.password);
        return hash.digest('hex');
        },
  },
})
</script>

<style lang="scss">
    .oneUserContainer {
        display:flex;
        flex-direction:row;
        justify-content: space-evenly;
        // gap:5px;
        @media screen and (max-width:991px) {
            flex-direction:column;
        }
    }
    .infoAntCard {
        width:100%;
        height:100%;
    }
    .inputContainer {
        display:flex;
        align-items:center;
    }

    .buttonsContainer {
        position:relative;
        height:20%;
        // bottom:10px;
        // padding-top:20px;
        // left:50%;
        // transform:translateX(-50%);
        width:100%;
        margin-top:20px;
        display:flex;
        flex-direction:row;
        justify-content: space-evenly;
        
        @media screen and (max-width:991px) {
            justify-content: space-between;
        }
    }

    .buttonDiscardSave, .buttonDiscardSave {
        width:30%;
        @media screen and (max-width:991px) {
            width:45%;
        }
    }
    
    .ant-form-item-control {
        justify-content: center;
    }
</style>