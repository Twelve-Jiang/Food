//设置token方法
export const setToken=(token)=>{
    return localStorage.setItem('token',token);
}

//获取token的方法
export const getToken=()=>{
    return localStorage.getItem('token');
}

//判断是否登录
export const isLogin=()=>{
    if(localStorage.getItem('token')){
        return true
    }
    return false
}
