const loginForm = document.querySelector(".login-form")
const errorMessage = document.querySelector(".errorMessage")

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    errorMessage.textContent = "";
    const formData = {
        username: e.target.username.value,
        password: e.target.password.value
    }
  
  
  
    axios.get(`http://localhost:3000/users?login=${formData.username}&password=${formData.password}`).then(res=> {
        if(res.data.length > 0){
            errorMessage.nextElementSibling.textContent = "Loading..."
            setTimeout(()=>{
                location.href = "dashboard.html"
                localStorage.setItem("userInfo", JSON.stringify(res.data[0]))
            },1000)
        }else{
            errorMessage.textContent = "Username or password is wrong.Try again"
            errorMessage.className = "text-red-500 text-center "
        }
        
    }).catch(err => {
        console.error(err);
        errorMessage.textContent = "Server error. Try again later.";
    })
})