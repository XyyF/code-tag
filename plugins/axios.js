export default function ({ $axios }) {
    $axios.credentials = true
    $axios.defaults.baseURL = '/'
}
