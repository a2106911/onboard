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
                            <div><b>{{ routeInfo.date }}</b></div>
                            <div> <a-progress type="dashboard" :percent=routeInfo.progress :width="90" :strokeWidth="10" /></div>
                        </div>
                        <div class="divPoints">
                            <div class="divPoint">
                                <a-descriptions-item>
                                    {{ routeInfo.origin }}
                                    <a-button type="primary" class="done">
                                        DONE
                                    </a-button>
                                    <a-button type="primary" class="noDone">
                                        NOT DONE
                                    </a-button>
                                </a-descriptions-item>
                            </div>
                            <div class="divPoint">
                                <a-descriptions-item>
                                {{ routeInfo.destination }}
                                <a-button type="primary" class="done">
                                    DONE
                                </a-button>
                                <a-button type="primary" class="noDone">
                                    NOT DONE
                                </a-button>
                            </a-descriptions-item>
                            </div>

                        </div>
                    </div>
                </a-card>
                <a-card :bordered="false" class="card-billing-info rightText">
                    <div class="totalKm" v-if=routeInfo.totalKm>Total: 1001 km </div>
                </a-card>
            </a-col>
        </a-row>
    </a-card>
</template>

<script>

export default ({
    props: [
		"routeInfo"
	],
    data() {
        return {
        }
    },
})

</script>

<style>
.divPoints {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.divPoint{
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