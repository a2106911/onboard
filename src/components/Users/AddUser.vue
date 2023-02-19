<template>
    <!-- <p>{{ JSON.stringify(user) }}</p> -->

    <a-form @submit="handleAddUser">
        <div  class="oneUserContainer">
        <!-- GENERAL USER INFO -->
        <a-card :bordered="true" class="infoAntCard">
            <h5>NEW USER FORM</h5>
            <!-- national ID -->
            <a-form-item class="container-login-item" label="DNI" :colon="false">
                <input class="ant-input" type="text" v-model="this.user.nationalId">
            </a-form-item>
            <!-- Name -->
            <a-form-item class="container-login-item" label="Name" :colon="false">
                <input class="ant-input" type="text" v-model="this.user.name">
            </a-form-item>
            <!-- Surnames -->
            <a-form-item class="container-login-item" label="Surnames" :colon="false">
                <input class="ant-input" type="text" v-model="this.user.surnames">
            </a-form-item>
            <!-- Password -->
            <a-form-item class="container-login-item" label="Password" :colon="false">
                <input class="ant-input" type="text" v-model="this.user.password">
            </a-form-item>
            <!-- Email -->
            <a-form-item class="container-login-item" label="Email" :colon="false">
                <input class="ant-input" type="text" v-model="this.user.email">
            </a-form-item>
            <!-- SocSecNum -->
            <a-form-item class="container-login-item" label="SocSecNum" :colon="false">
                <input class="ant-input" type="text" v-model="this.user.socSecNum">
            </a-form-item>
            <!-- Phone -->
            <a-form-item class="container-login-item" label="Phone" :colon="false">
                <input class="ant-input" type="text" v-model="this.user.phone">
            </a-form-item>
            <!-- IsActive -->
            <a-form-item class="container-login-item" label="Active" :colon="false" style="display:flex;flex-direction:row;">
                <a-switch size="big" v-model:checked="this.user.isActive" :colon="false" checkedValue="true" unCheckedValue="false"/>
                <!-- <input class="ant-input" type="text" v-model="this.replicaOfUser.isActive"> -->
            </a-form-item>
        </a-card>
        <!-- SPECIFIC USER INFO -->
        <a-card :bordered="true" class="infoAntCard">
            <h5>ROLE SPECIFIC DETAILS</h5>
            <div style="height:80%">
                    <!-- role -->
                <a-form-item class="container-login-item" label="Role" :colon="false">
                    <a-select v-model:value="user.role">
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
                <div v-if="user.role=='driver'">
                    <!-- Linked manager -->
                    <a-form-item class="container-login-item" label="Linked manager" :colon="false">
                        <div style="display:flex;align-items: flex-end;justify-content: center;">
                            <a-select
                                placeholder="-"
                                v-model:value="user.linkedManagerInput"
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
                        <input class="ant-input" type="text" :value="user.driverInfo.defaultVehiclePlate">
                    </a-form-item>
                </div>
                <!-- manager -->
                <div v-else-if="user.role=='manager'">
                    <a-form-item class="container-login-item" label="Linked drivers" :colon="false">
                        <a-select
                            mode="multiple"
                            v-model:value="user.linkedDriversInput"
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
                <a-button type="danger" :size="size" class="buttonDiscardSave" @click="handleDiscardAddUser()">
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
// import crypto from "crypto"

export default ({
    name: "AddUser",
    data() {
        return {
            //replicaOfUser is a copy of the user prop that will enable us to modify its values and read them before submitting.
            user:{
                email:"",
                isActive:"true",
                name:"",
                password:"",
                nationalId:"",
                phone:"",
                role:"driver",
                socSecNum:"",
                surnames:"",
                // userId:null,
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
            },
            availableManagers:[]
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
        handleDiscardAddUser() {
            this.$emit("discardAddUser");
        },
        handleAddUser(e) {
            e.preventDefault();
            //first, we need to check if the password has been  changed:
            console.log("password encryptation process.")
                // console.log("1", this.password)
                // this.password = CryptoJS.AES.encrypt(this.password, "2").toString();
                // console.log("2", this.password)
                // console.log(this.md5Hash)
                

            this.addUser();
        },
        clearDriverLinkedManager () {
            this.user.linkedManagerInput = null;
        },
        getAvailableManagers() {
            axios({
                method:"PUT",
                // url:"http://onboard.daw.institutmontilivi.cat/api/get-available-managers",
                url:"http://localhost/api/get-available-managers",
                // url:"192.1681.67:8080/api/get-available-managers",
                data: {
                    "accessToken":localStorage.getItem("accessToken")
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        console.log("get-available-managers response",response);
                        this.availableManagers = response.data;
                    }
                    else if (response.data == "0") {
                        this.notification("warning", "No routes found", "You don't have any routes.");
                    }
                }
                console.log("available managers",this.availableManagers)
            })
        },
        getAvailableDrivers() {
            axios({
                method:"PUT",
                // url:"http://onboard.daw.institutmontilivi.cat/api/get-available-drivers",
                url:"http://localhost/api/get-available-drivers",
                // url:"192.1681.67:8080/api/get-available-drivers",
                data: {
                    "accessToken":localStorage.getItem("accessToken")
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data != "0" && response.data != false) {
                        console.log("get-available-drivers response",response);
                        this.availableDrivers = response.data;
                    }
                    else if (response.data == "0") {
                        this.notification("warning", "No available drivers...", "We currently do not have any free drivers available.");
                    }
                }
            })
        },
        addUser() {
            console.log(this.user)
            axios({
                method:"PUT",
                // url:"http://onboard.daw.institutmontilivi.cat/api/create-user",
                url:"http://localhost/api/create-user",
                // url:"192.1681.67:8080/api/create-user",
                data: {
                    "accessToken":localStorage.getItem("accessToken"),
                    "name":this.user.name,
                    "surnames":this.user.surnames,
                    "password":this.user.password,
                    "nationalId":this.user.nationalId,
                    "socSecNum":this.user.socSecNum,
                    "phone":this.user.phone,
                    "email":this.user.email,
                    "role":this.user.role,
                    "isActive":this.user.isActive,
                    "managerId":this.user.linkedManagerInput,
                    "defaultVehiclePlate":this.user.driverInfo.defaultVehiclePlate,
                    "linkedDrivers":this.user.linkedDriversInput
                }
            }).then((response)=> {
                if (response.data !== null) {
                    if (response.data == true) {
                        this.notification("success", "Success!", `The user has been added correctly. ${this.user.name} ${this.user.surnames} has been added correctly.`);
                        this.handleDiscardAddUser();
                        this.$emit("addUser");
                    }
                    else {
                        this.notification("error", "Error...", `The user couldn't be added. Check your parameters and try again.`);
                    }
                }
                else 
                    this.notification("error", "Error...", `The user couldn't be added. Check your parameters and try again.`);
            })
        }
    },
    mounted() {        
        this.getAvailableManagers();
        this.getAvailableDrivers();
    },
    created () {

    },
//     computed: {
//         md5Hash() {
//         const hash = crypto.createHash('md5');
//         hash.update(this.replicaOfUser.password);
//         return hash.digest('hex');
//         },
//   },
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