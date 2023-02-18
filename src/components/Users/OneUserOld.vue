<template>
    <p>{{ JSON.stringify(user) }}</p>

<a-row type="flex" :gutter="24">
    <a-col :span="24" :md="20" class="mb-24">
        <UserInformation></UserInformation>
    </a-col>
</a-row>

</template>

<script>
import UserInformation from "@/components/Users/UserInformation.vue"

export default ({
props: ["user"],
components: {
    UserInformation
},
data() {
    return {

    }
},
})
</script>

<style lang="scss">

</style>