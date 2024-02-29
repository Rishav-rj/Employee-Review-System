const signup = document.getElementById("sign-up")
const login = document.getElementById("log-in")
const loginBtn = document.getElementById("login-btn")
const signupBtn = document.getElementById("sign-btn")
const signuppassword = document.querySelector(".signuppassword")
const loginpassword = document.getElementById("loginpassword")
const signupShow = document.querySelector(".opensignup")
const signupHide = document.querySelector(".closesignup")
const loginShow = document.querySelector(".openlogin")
const loginHide = document.querySelector(".closelogin")
const signupFormBtn = document.querySelector("#signup-form")

function loginform(){
    signup.classList.add("remove-signup-input")
    login.classList.add("move-up-login")
}

function signupform(){
    signup.classList.remove("remove-signup-input")
    login.classList.remove("move-up-login")
}


loginBtn.addEventListener("click", loginform)

signupBtn.addEventListener("click", signupform)

signupShow.addEventListener("click", ()=>{
    signupShow.classList.add("hide")
    signupHide.classList.remove("hide")  
    signuppassword.type = "text"
    
})
signupHide.addEventListener("click", ()=>{
    signupHide.classList.add("hide")  
    signupShow.classList.remove("hide")
    signuppassword.type = "password"
})

loginShow.addEventListener("click", ()=>{
    loginShow.classList.add("hide")
    loginHide.classList.remove("hide")  
    loginpassword.type = "text"
    
})  
loginHide.addEventListener("click", ()=>{
    loginHide.classList.add("hide")  
    loginShow.classList.remove("hide")
    loginpassword.type = "password"
})

signupFormBtn.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const fullname = document.getElementById("fullname").value
    const designation = document.getElementById("designation").value
    const email = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value

    try{
        const res = await fetch("/signup", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fullname,
                designation,
                email,
                password
            })
        })

        if(res.ok){
            alert("Registered successfully!")
            loginform()
        }else{
            alert("Email already exist!")
        }
    }catch(err){
        console.error("Error", err);
    }
})


function goback(){
    window.history.back()
}

