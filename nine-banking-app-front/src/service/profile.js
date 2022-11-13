import {
    computed
} from "vue";


const profile = computed(() => {
    return JSON.parse(localStorage.getItem("profile"))
});
const isLogin = computed(() => localStorage.getItem("profile") !== null);


export const checkData = () => {
    return isLogin
};

export const getProfileData = () => {
    return profile

};