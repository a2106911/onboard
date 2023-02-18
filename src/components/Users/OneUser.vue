<template>
    <p>{{ JSON.stringify(user) }}</p>

    <div  class="oneUserContainer">
        <!-- GENERAL USER INFO -->
        <a-card :bordered="true" class="infoAntCard">
            <!-- national ID -->
            <a-form-item class="container-login-item" label="DNI" :colon="false">
                <input class="ant-input" type="text" :value="user.nationalId">
            </a-form-item>
            <!-- Name -->
            <a-form-item class="container-login-item" label="Name" :colon="false">
                <input class="ant-input" type="text" :value="user.nameInput">
            </a-form-item>
            <!-- Surnames -->
            <a-form-item class="container-login-item" label="Surnames" :colon="false">
                <input class="ant-input" type="text" :value="user.surnamesInput">
            </a-form-item>
            <!-- Email -->
            <a-form-item class="container-login-item" label="Email" :colon="false">
                <input class="ant-input" type="text" :value="user.emailInput">
            </a-form-item>
            <!-- SocSecNum -->
            <a-form-item class="container-login-item" label="SocSecNum" :colon="false">
                <input class="ant-input" type="text" :value="user.socSecNum">
            </a-form-item>
            <!-- Phone -->
            <a-form-item class="container-login-item" label="Phone" :colon="false">
                <input class="ant-input" type="text" :value="user.phone">
            </a-form-item>
        </a-card>
        <!-- SPECIFIC USER INFO -->
        <a-card :bordered="true" class="infoAntCard">
            <!-- role -->
            <a-form-item class="container-login-item" label="Role" :colon="false">
                <a-select default-value="Driver" :value="user.selectedRole">
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
            </a-form-item>
            <div v-if="selectedRole=='driver'">
                <a-form-item class="container-login-item" label="Linked manager" :colon="false">
                    <a-select
                        show-search
                        placeholder="-"
                        @change="handleLinkedManager"
                        v-model:value="linkedManagerInput"
                    >
                        <a-select-option 
                            v-for="m in availableManagers" 
                            v-bind:key="m.userId" 
                            :value="m.id"
                            >
                            {{m.name}} {{ m.surnames }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </div>
        </a-card>
    </div>
</template>

<script>
import axios from "axios"

export default ({
    props: ["user"],
    // components: {
    // },
    data() {
        return {
            selectedRole:"driver",
            availableManagers:[],
            linkedManagerInput:null
        }
    },
    methods: {
        noAvailableManagersWarning() {
			this.$notification["warning"]({
				message: "No routes found",
				description:
				"You don't have any routes.",
			})
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
            )
        },
        handleLinkedManager() {
            // console.log(this.linkedManagerInput)
        }
    },
    mounted() {
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
                    this.noAvailableManagersWarning();
                }
            }
            console.log("available managers",this.availableManagers)
        })

        console.log("user", this.user)
    }
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
    }
    .inputContainer {
        display:flex;
        align-items:center;
    }
</style>