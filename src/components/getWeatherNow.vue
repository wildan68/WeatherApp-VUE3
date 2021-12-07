<template>
    <div class="clouds_info">
        <h3>Saat ini</h3>
        <div class="clouds">
            <div v-for="i in weather.slice(0, 1)" :key="i.id">
                <img src="~@/assets/panas.png" v-if="i.main == 'Clear'">
                <img src="~@/assets/panas_berawan.png" v-if="i.main == 'Clouds'">
                <img src="~@/assets/hujan_badai.png" v-if="i.main == 'Thunderstorm'">
                <img src="~@/assets/hujan_ringan.png" v-if="i.main == 'Drizzle'">
                <img src="~@/assets/hujan.png" v-if="i.main == 'Rain'">
                <img src="~@/assets/salju.png" v-if="i.main == 'Snow'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Haze'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Fog'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Mist'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Smoke'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Dust'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Ash'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Squall'">
                <img src="~@/assets/haze.png" v-if="i.main == 'Tornado'">
            </div>
        </div>
        <div class="desc" v-for="i in weather" :key="i.id">
            {{ capitalize(i.description) }}
        </div>
        <div class="temp">
            {{ toInt(toCelcius(temp)) }}&deg; C
        </div>
    </div>
</template>

<script>
    export default {
        name: 'get-weather-now',
        props: {
            weather: Array,
            temp: String,
        },
        methods: {
            getCountry(id) {
                let d = eval('this.country.' + id)
                return d
            },
            forecastMobile() {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return 4
                } else {
                    return 7
                }
            },
            toInt(x) {
                return Math.floor(x)
            },
            toCelcius(x) {
                return x - 273;
            },
            capitalize(text) {
                return text.charAt(0).toUpperCase() + text.slice(1);
            },
        }
    }
</script>