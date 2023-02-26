import styles from 'styled-components'

export const NavBar = styles.div`
position:fixed;
z-index: 100000;
width:100%;
background:rgba(2, 1, 71, 1);
padding:15px 10px;
display:flex;
align-items:center;
justify-content:space-between;
border-bottom:5.5px solid #2AFF00;
transition:all 2s ease-in-out;
animation-name: load;
animation-duration: 2s;
animation-iteration-count: 1;
@keyframes load {
  0% {
    opacity:0%;
  }

  100% {
    opacity:110%;
  }
}

color:white;
.title-business{
  font-weight:900;
  font-size:25px;
}
.sidebar{
  width:100%;
  display:flex;
  align-items:center;
}
.sidebar .content-search{
  display:flex;
  margin:0 10px;
  width:100%;
  text-align:center;
  justify-content:center;
}
.sidebar .content-search .txt-search{
  font-weight:800;
  outline:none;
  border:0;
  padding:7px 15px;
  border-radius: 6px 0 0 6px;
  transition:all 0.3s ease-in-out;
  background: white;
  width:100%;
  max-width:465px;
  color:black;
}
.sidebar .content-search .txt-search::placeholder{
  color:gray;
}
.sidebar .content-search .btn-search{
  background: greenyellow;
  color:black;
  outline:none;
  border:0;
  padding:7px 10px;
  font-size:20px;
  display:flex;
  align-items:center;
  border-radius: 0 6px 6px 0;
  transition:all 0.2s ease-in-out;
}
.sidebar .content-search .btn-search:active{
  background: rgb(0, 194, 26);
}
.sidebar nav{
  display:flex;
  align-items:center;
  font-weight:800;
}
.sidebar nav a{
  color:white;
  padding:0 5px;
  text-decoration:none;
  display:flex;
  align-items:center;
  transition:all 0.3s ease-in-out;
}
.sidebar nav a:hover{
  color:#2AFF00
}
.sidebar nav a .react-icon{
  font-size:18px
}
.sidebar .login-buttom a{
  color:white;
  margin:0 5px;
  text-decoration:none;
  display:flex;
  align-items:center;
  font-weight:800;
  transition:all 0.3s ease-in-out;
}
.sidebar .login-buttom a label{
  display:flex;
  align-items:center
}
.sidebar .login-buttom a label .react-icon{
  font-size:18px
}
.sidebar .login-buttom a:hover{
  color:#2AFF00
}
.btn-menu{
  transition:all 0.001s ease-in-out;
  background:#2AFF00;
  font-size:35px;
  padding:3px;
  border-radius:5px;
  display:none;
  cursor: pointer;
}
.btn-menu:active{
  background: rgb(0, 194, 26);
}


@media only screen and (max-width:1130px){
  .sidebar{
    position:fixed;
    top:4.59rem;
    background:rgba(0, 0, 0, 0.69);
    flex-direction:column;
    width:20rem;
    transition: all 0.5s ease-in-out;
    animation-name: ${({ menu }) => (menu ? "openmenu" : "closemenu")};
    animation-duration:0.6s;
    left: ${({ menu }) => (menu ? "0px" : "-21rem")};
    padding:20px;
    height:100vh;
    overflow:scroll;
  }
  @keyframes openmenu {
    0% {
      left:-21rem;
    }
    50% {
      left:70px;
    }
    100% {
      left:0px;
    }
  }
  @keyframes closemenu {
    0% {
      left:0px;
    }
    50% {
      left:-200px;
    }
    100% {
      left:-21rem;
    }
  }
  .sidebar .content-search .txt-search{
    background:rgba(49, 48, 48, 1);
    color:white;
  }
  .sidebar .content-search .txt-search::placeholder{
    color:lightgray;
  }
  nav{
    flex-direction:column;
    width:100%;
  }
  nav a{
    width:100%;
    margin:15px 0;
  }
  .login-buttom{
    width:100%;
    margin-top:15px;
    margin-bottom:3rem;
  }
  .btn-menu{
    display:block;
  }
}
@media only screen and (max-width:280px){
  .sidebar{
    width:100%
  }
}
`;

export const BtnCart = styles.div`
  display: flex;
  flex-direction: crow;
  align-items: center;
  justify-content:space-between;
  width:100%;
.react-icon{
  color:green;
  font-size:27px;
  transition:all 0.05s ease-in-out;
  cursor: pointer;
  text-align:end;
}
.react-icon:active{
  transform:scale(115%);
}
`;

export const LoginContainer = styles.div`
position:fixed;
width:100%;
height:100vh;
display:flex;
align-items:center;
justify-content:center;

.container-form-login{
  width:100%;
  max-width:767px;
  display:flex;
  margin-top:-73px;
  height:440px;
  box-shadow: 4px 4px 4px blue;
  overflow:hidden;
  border-radius:10px;
}

.container-form-login .content{
  width:50%;
  background:url(https://res.cloudinary.com/ufostart-development/image/upload/v1677258133/ECOMMERCE/pxoai4jkuieew8wartj2.jpg);
  background-size:cover;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  flex-direction:column;
  padding:10px;
}
.container-form-login .content label{
  color:white;
  font-weight:900;
  font-size:30px
}
.container-form-login form{
  width:50%;
  display:flex;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  padding:0px 20px;
}
.container-form-login form .topic{
  font-weight:900;
  font-size:40px
}
.container-form-login form input[type=text]{
  width:100%;
  margin:15px 0;
  text-align:center;
  border:none;
  outline:none;
  background:rgb(237, 237, 237);
  padding:7px;
  font-weight:bold;
  border-radius:30px;
}
.container-form-login form input[type=password]{
  width:100%;
  margin:15px 0;
  text-align:center;
  border:none;
  outline:none;
  background:rgb(237, 237, 237);
  padding:7px;
  font-weight:bold;
  border-radius:30px;
}
.container-form-login form input[type=submit]{
  width:100%;
  margin:15px 0;
  text-align:center;
  border:none;
  background:linear-gradient(to left, blue, greenyellow);
  color:white;
  padding:7px;
  font-weight:900;
  border-radius:10px;
  transition:all .1s ease-in-out;
}
.container-form-login form input[type=submit]:active{
  transform:scale(95%);
}
.container-form-login form .errormessage{
  color:red;
  font-weight:bold;
}
@media only screen and (max-width: 834px){
  .container-form-login{
    margin: 0 25px;
  }
  .container-form-login .content label{
    font-size:24px
  }
  .container-form-login form .topic{
    font-size:30px
  }
}
@media only screen and (max-width: 610px){
  .container-form-login{
    flex-direction:column;
    height:auto;
    margin-top:-100px;
  }
  .container-form-login .content{
    width:100%
  }
  .container-form-login form{
    width:100%;
    padding: 20px 20px;
  }
}
@media only screen and (max-width: 610px){
  .container-form-login .content label{
    font-size:18px
  }
}
@media only screen and (max-width: 430px){
  .container-form-login{
    margin-top:-150px
  }
}
@media only screen and (max-width: 280px){
  .container-form-login{
    margin-top:-130px
  }
  .container-form-login .content label{
    font-size:15px
  }
  .container-form-login form .topic{
    font-size:20px
  }
  .container-form-login form input{
    font-size:15px;
    font-weight:900;
  }
  .container-form-login form a{
    font-size:13px;
  }
}
`;

export const ButtomTransparent = styles.button`
background:transparent;
color:white;
width:100%;
max-width:18rem;
font-size:15px;
font-weight:900;
border:solid 3px white;
margin:20px 10px;
padding: 6px 30px;
border-radius: 20px;
transition:all .07s ease-in-out;
outline:none;
:hover{
  color:greenyellow;
  border-color:greenyellow;
}
:active{
  transform:scale(98%);
}
@media only screen and (max-width: 610px){
  font-size:13px;
  padding: 6px 15px;
}
@media only screen and (max-width: 280px){
  font-size:11px;
}
`;

export const SignupContainer = styles.div`
form{
  display:flex;
  flex-direction:column;
}
form input{
  margin-top:20px;
}
`;