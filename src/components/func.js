export const func = {
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