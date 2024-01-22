const App = {
data(){
    return { 
        apiUrl : 'https://ec-course-api.hexschool.io/v2',
        apiPath : 'milktea',
        products: [],
        tempProduct: {},
    }
},
methods: {
    //驗證登入
    checkAdmin(){
        const url = `${this.apiUrl}/api/user/check`;
        axios.post(url)
            .then((res)=>{
                console.log('驗證成功')
                this.getProducts(); // 驗證成功就取得產品列表
            })
            .catch((err)=>{
                alert(err.response.data.message)
                location.href = "login.html";// 失敗就導回login頁面
            })
    },
    //取得管理員才能看到的產品列表
    getProducts(){
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
        axios.get(url)
            .then((res)=>{
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err.response.data.message)  
            })
    }, 
},
mounted(){
    //取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    axios.defaults.headers.common.Authorization = token;// 之後每次發出請求時會自動把headers加進去，每次重新整理還是會維持登入狀態
    this.checkAdmin()
}
};
Vue.createApp(App).mount('#app');