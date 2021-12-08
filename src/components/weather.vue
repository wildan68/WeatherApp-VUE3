<template>
    <div class="wrapper">
        <div class="container">
            <div class="search">
                <input type="text" placeholder="Mau cek cuaca kota apa?" v-model="searchCity">
                <button class="ripple" @click="searchCityBtn">
                    <ion-icon name="search"></ion-icon>
                </button>
            </div>
            <div v-if="load_anim" class="loading">
                <img src="~@/assets/loading.svg">
            </div>
            <!-- Mengambil data kota awal user -->
            <get-my-city :city_name="info.name" :info_country="info_sys.country.toLowerCase()" :country="country"></get-my-city>
            <!-- Mengambil data cuaca -->
            <get-weather-now :weather="info_weather" :temp="info_main.temp"></get-weather-now>
        
            <div class="forecast">
                Prediksi Cuaca Rata-Rata Per Hari<br>
                <div class="swiper-container">
                <swiper :slidesPerView="forecastMobile()" :spaceBetween="10" class="mySwiper" :pagination='{"clickable": true}'>
                    <swiper-slide v-for="(f, index) in forecast" :key="f.id" class="">
                        <strong v-if="index == 0">Hari ini</strong>
                        <strong v-if="index == 1">Besok</strong>
                        <strong v-if="index > 1">{{ getDays(index) }}</strong>
                        <div class=" img " v-for="w in f.weather.slice(0, 1)" :key="w.id">
                            <img src="~@/assets/panas.png" v-if="w.main == 'Clear'">
                            <img src="~@/assets/panas_berawan.png" v-if="w.main == 'Clouds'">
                            <img src="~@/assets/hujan_badai.png" v-if="w.main == 'Thunderstorm'">
                            <img src="~@/assets/hujan_ringan.png" v-if="w.main == 'Drizzle'">
                            <img src="~@/assets/hujan.png" v-if="w.main == 'Rain'">
                            <img src="~@/assets/salju.png" v-if="w.main == 'Snow'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Haze'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Fog'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Mist'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Smoke'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Dust'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Ash'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Squall'">
                            <img src="~@/assets/haze.png" v-if="w.main == 'Tornado'">
                        </div>
                        <p>{{ capitalize(f.weather[0].description) }}</p>
                        <p class="temp ">{{ toInt(toCelcius(f.main.temp)) }}&deg; C</p>
                    </swiper-slide>
                </swiper>
                </div>
            </div>
        </div>
        <div v-if="not_found" class="not-found-overlay">
                <div class="not-found">
                    Kota yang kamu cari tidak tersedia
                    <button class="btnClose ripple" @click="notFoundClose()">OK</button>
                </div>
        </div>
        <div class="footer " id="footer ">
            Powered By @wldan.rzky_ | www.wildanrizky.tech
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {
        Swiper,
        SwiperSlide
    } from "swiper/vue";
    import "swiper/swiper.min.css";

    import SwiperCore, {
        Pagination
    } from 'swiper';

    SwiperCore.use([Pagination]);

    import getMyCity from "./getMyCity.vue"; /*DataKotaUser*/
    import getWeatherNow from "./getWeatherNow.vue"; /*DataCuaca*/

    export default {
        name: 'Weather',
        components: {
            Swiper,
            SwiperSlide,
            getMyCity,
            getWeatherNow,
        },
        data() {
            return {
                api_key: 'ea8535a0ff11a4e50f1a25f6cedfa299',
                info_main: [],
                info_sys: {
                    country: ''
                },
                info_weather: [],
                info: [],
                loading: true,
                load_anim: true,
                errored: false,
                searchCity: '',
                default_city: true,
                ip: [],
                ip_data: [],
                ip_me: '',
                not_found: false,
                country: [],
                forecast: [],
                days: [
                    'Minggu',
                    'Senin',
                    'Selasa',
                    'Rabu',
                    'Kamis',
                    "Jum'at",
                    'Sabtu',
                ],
            }
        },
        methods: {
            getWeather(city) {
                this.load_anim = true;
                axios
                    .get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=id&appid=' + this.api_key)
                    .then(response => {
                        this.info_main = response.data.main
                        this.info_sys = response.data.sys
                        this.info_weather = response.data.weather
                        this.info = response.data
                    })
                    .catch(error => {
                        console.log(error)
                        this.not_found = true
                    })
                    .finally(() => {
                        this.load_anim = false
                    })
            },
            getForecast(city) {
                axios
                    .get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=id&cnt=7&appid=' + this
                        .api_key)
                    .then(response => {
                        this.forecast = response.data.list
                    })
                    .catch(error => {
                        console.log(error)
                        this.erored = true
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },
            getDays(i) {
                /*var d = new Date().getDate() + 2 + i
                if (d > 6) {
                    d = i - 1
                    return this.days[new Date().getDay()]
                } else {
                    return this.days[new Date().getDay()]
                }*/
                var d = new Date().getDay() + i
                if (d > 6) {
                    d =  i-4
                    return this.days[d]
                } else {
                    return this.days[d]
                }
            },
            getCountry(id) {
                let d = eval('this.country.' + id)
                return d
            },
            forecastMobile() {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return 3
                } else {
                    return 4
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
            searchCityBtn() {
                this.getWeather(this.searchCity)
                this.getForecast(this.searchCity)
            },
            notFoundClose() {
                this.not_found = false;
            }
        },
        mounted() {
            axios
                .get('https://api.ipify.org/?format=json')
                .then(response => {
                    this.ip = response.data,
                        this.ip_me = this.ip.ip
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
            axios
                .get('https://ipapi.co/' + this.ip_me + '/json/')
                .then(response => {
                    this.ip_data = response.data,
                        this.getWeather(this.ip_data.city),
                        this.getForecast(this.ip_data.city)
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
            axios
                .get('https://flagcdn.com/en/codes.json')
                .then(response => {
                    this.country = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.erored = true
                })
                .finally(() => {
                    this.load_anim = false
                })
        },
        setup() {
            const onSwiper = (swiper) => {
                console.log(swiper);
            };
            const onSlideChange = () => {
                console.log("slide change");
            };
            return {
                onSwiper,
                onSlideChange,
            };
        },
    }
</script>