<template>
    <h2>{{ city_name }},
        <span v-for="(key, d) in country" :key="d">
            <span v-if="d == info_country"> {{ key }} </span>
        </span>
        <img :src="'https://flagcdn.com/'+info_country+'.svg'" :style="'height: 24px; margin-left: 5px'">
    </h2>
</template>

<script>
export default {
    name: 'get-my-city',
    props: {
        city_name: String,
        country: Array,
        info_country: String,
    }
}
</script>