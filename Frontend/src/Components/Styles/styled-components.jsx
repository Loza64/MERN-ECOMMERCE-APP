import styles from 'styled-components'

export const NavBar = styles.div`
position: fixed;
z-index: 50;
width:100%;
background:rgba(2, 1, 71, 1);
padding:15px 8px;
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
  justify-content:space-between;
}

.sidebar .content-search{
  display:flex;
  margin:0 40px;
  width:100%;
  text-align:center;
  justify-content:center;
}
.sidebar .content-search .txt-search{
  font-weight:700;
  outline:none;
  border:0;
  padding:7px 15px;
  transition:all 0.3s ease-in-out;
  background: white;
  width:100%;
  max-width:465px;
  color:black;
}
.sidebar .content-search select{
  border: none;
  outline: none;
  width:85px;
  font-size:13px;
  font-weight:700;
  text-align: center;
  background: white;
  border-radius: 6px 0 0 6px;
  border-right: 2px solid greenyellow;
}
.opcion{
  color: black;
  font-weight: 800;
  font-size:15px;
  background-color:white;
  width:600px;
}
.option-none{
  display: none;
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
  font-size:18px;
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
  font-weight:700;
  font-size:14px;
}
.sidebar nav a{
  color:white;
  padding:0 10px;
  text-decoration:none;
  display:flex;
  align-items:center;
  transition:all 0.3s ease-in-out;
}
.sidebar nav a:hover{
  color:#2AFF00
}
.sidebar nav a .react-icon{
  font-size:18px;
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
    top:4.57rem;
    background:rgba(0, 0, 0, 0.69);
    font-size:12px;
    flex-direction:column;
    justify-content:start;
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
  .sidebar .content-search{
    padding: 0 10px
  }
  .sidebar .content-search .txt-search{
    background:black;
    color:white;
  }
  .sidebar .content-search .txt-search::placeholder{
    color:lightgray;
  }
  .sidebar .content-search select{
    background:black;
    color:white;
    font-size:12px;
  }
  .opcion{
    background:black;
    color:white;
    font-size:12px;
  }
  nav{
    flex-direction:column;
    width:100%;
  }
  nav a{
    width:100%;
    margin:15px 0;
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
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
  width:100%;

.react-icon{
  color:green;
  font-size:27px;
  transition:all 0.05s ease-in-out;
  cursor: pointer;
  text-align:end;
  &:active{
    transform:scale(115%);
  }
}

.disable{
  color:grey;
  &:active{
    transform:scale(1);
  }
}
.incart{
  color:greenyellow;
  &:active{
    transform:scale(1);
  }
}
.no-product{
  font-weight:900;
  color:red;
}
`;

export const LoginContainer = styles.div`
position:fixed;
width:100%;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
z-index:20;
top:40px;

.container-form-login{
  width:100%;
  max-width:767px;
  margin: 0 15px;
  display:flex;
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
  background:white;
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
  .container-form-login .content label{
    font-size:24px
  }
  .container-form-login form .topic{
    font-size:30px
  }
}
@media only screen and (max-width: 610px){
  top:75px;
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

@media only screen and (max-width: 280px){
  top:20px;
  margin-top:60px;
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

export const SignupContainer = styles.div`
position:fixed;
width:100%;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
z-index:${({ open }) => (open ? "100" : "0")};
background:${({ open }) => (open ? "rgba(0, 0, 0, 0.5)" : "transparent")};
opacity:${({ open }) => (open ? "1" : "0")};
transition:all 0.7s ease-in-out;

.container-form-signup{
  width:100%;
  max-width:500px;
  background:white;
  padding:10px 17px;
  border-radius:10px;
  margin:0 10px;
  transform: scale(${({ open }) => (open ? "1" : "0")});
  transition:all 0.7s ease-in-out;
}
.container-form-signup form .closebuttom{
  display:flex;
  justify-content: end;
  margin-top:-10px;
  margin-bottom:-20px;
  width:100%;
  padding:0;
}
.container-form-signup form .closebuttom .buttom{
  color:red;
  font-weight:900;
  cursor: pointer;
  font-size:20px;
}
.container-form-signup form{
  width:100%;
  display:flex;
  flex-direction:column;
}
.container-form-signup form input{
  margin-top:23px;
  border:none;
  outline:none;
  background:rgb(237, 237, 237);
  padding:6px 12px;
  font-weight:900;
  border-radius:50px;
  font-size:15px;
}
.container-form-signup form .flex{
  width:100%;
  display:flex;
}
.container-form-signup form .flex div{
  width:100%;
}
.container-form-signup form .flex div input{
 width:100%;
}
.container-form-signup form input[type=submit]{
  width:100%;
  margin-top:27px;
  text-align:center;
  border:none;
  background:linear-gradient(to left, blue, greenyellow);
  color:white;
  padding:7px;
  font-weight:900;
  border-radius:10px;
  transition:all .1s ease-in-out;
}
.container-form-signup form input[type=submit]:active{
  transform:scale(95%);
}
.container-form-signup form .errormessage{
  color:red;
  margin: 0 12px;
  font-weight:900;
  font-size:12px;
  margin-bottom:-16px;
  margin-top:-2px;
}
@media only screen and (max-width: 450px){
  .container-form-signup form .errormessage{
    font-size:10px;
  }
  .container-form-signup form input{
    font-size:12px;
  }
}

@media only screen and (max-width: 388px){
  .container-form-signup form .errormessage{
    font-size:9px;
  }
  .container-form-signup form input{
    font-size:11.5px;
  }
}
@media only screen and (max-width: 320px){
  .container-form-signup form .errormessage{
    font-size:7.4px;
  }
  .container-form-signup form input{
    font-size:10.5px;
  }
}
@media only screen and (max-width: 300px){
  .container-form-signup form input{
    font-size:10px;
  }
  .container-form-signup form .errormessage{
    font-size:10px;
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
transition:all .2s ease-in-out;
outline:none;
&:hover{
  color:greenyellow;
  border-color:greenyellow;
}
&:active{
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

export const ShoppingCartList = styles.div`
overflow:hidden;
width:100%;
.item{
  display:flex;
  align-items:center;
  padding: 2px 10px;
  background:white;
  border:solid 3px rgb(231,231,231);
  border-radius:10px;
  margin-right:16px;
  margin-bottom:6px;
  transition: all .05s ease-in-out;
  animation-name: showitemcart;
  animation-iteration-count:1;
  animation-duration: .8s;
  z-index:2;
}
@keyframes showitemcart{
  0%{
    transform:translateX(1000px)
  }
  50%{
    transform:translateX(-80px)
  }
  100%{
    transform:translateX(0px)
  }
}
.item .image{
  width:100%;
  height:100%;
  max-width:5rem;
  margin: 4px 10px;
  cursor: pointer;
}
.item .image img {
  width:100%;
  height:100%;
}
.item .detailproduct{
  width:100%;
  display:flex;
  flex-direction:column;
}
.item .detailproduct .price{
  color:green;
}
.item .detailproduct .subtotal-none{
  color:grey;
  text-decoration:line-through;
  text-decoration-color: red;
  text-decoration-thickness: 2.47px;
}
.item .detailproduct .flex-product{
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.item .detailproduct .flex-product .subtotal{
  color:green;
  text-decoration:none
}
.item .detailproduct .flex-product .name{
  cursor:pointer;
}
@media only screen and (max-width: 960px){
  .item{
    flex-direction:column;
    text-align:center;
    padding: 10px 0;
  }
  
  .item .detailproduct .flex-product{
    flex-direction:column;
    text-align:center;
  }
  .item .detailproduct .subtotal-none{
    display:none;
  }
  .item .detailproduct .subtotal{
    display: none;
  }

  .item .detailproduct .flex-buttoms{
    flex-direction:column;
  }
  
  .item .detailproduct .flex-product .subtotal{
    display:none;
  }

  
  .item .detailproduct .flex-buttoms .quantity-buttoms{
    margin-bottom:5px;
  }
}
.item .detailproduct .flex-buttoms{
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.item .detailproduct{
  font-weight:900;
  font-size:14px;
}
.item .detailproduct .flex-buttoms .quantity-buttoms{
  display:flex;
  flex-direction:row;
  align-items:center;
  text-align:center;
}
.item .detailproduct .flex-buttoms .quantity-buttoms button{
  background:rgba(225, 225, 225, 1);
  font-size:16px;
  font-weight:900;
  border:none;
  margin:5px; 
  padding:0 5px;
  border-radius:100%;
  color:rgba(2, 1, 71, 1);
  transition: all .05s ease-in-out;
}
.item .detailproduct .flex-buttoms .quantity-buttoms button:active{
  background:rgba(2, 1, 71, 1);
  color:white;
}
.item .detailproduct .flex-buttoms .quantity-buttoms label{
  font-size:15px;
  margin:0 10px;
  font-weight:900;
}
.item .detailproduct .flex-buttoms .remove-buttom{
  display:flex;
  align-items:center;
  background:none;
  color:red;
  border-radius:7px;
  transition: all .05s ease-in-out;
  display:flex;
  algin-items:center;
  justify-content:center;
  font-size:19px;
  cursor:pointer;
}
.item .detailproduct .flex-buttoms .remove-buttom:active{
  transform:scale(112%);
}
.item .detailproduct .flex-buttoms .remove-buttom .react-icon{
  margin: 0 3px;
}
.item .detailproduct .flex-buttoms .remove-buttom label{
  margin: 0 3px;
}
@media only screen and (max-width:600px){
  .item{
    margin: 12px 0;
  }
}
`;

export const DetailProducts = styles.div`
.content-detail-product {
  width: 100%;
  padding: 0.5rem 5rem;
}

.content-detail-product h2 {
  text-align: center;
  margin: 10px 0;
  color: blue;
  font-weight: 700;
  font-size: 28px;
}
@media only screen and (max-width: 780px){
  .content-detail-product h2{font-size: 25px;}
}
@media only screen and (max-width: 450px){
  .content-detail-product h2{font-size: 18px;}
}
.content-detail-product .flex-detail-product {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
@media only screen and (max-width: 980px){
  .content-detail-product .flex-detail-product{
    flex-direction: column;
    align-items:center;
  }
}

.content-detail-product .flex-detail-product .image {
  width: 50%;
  text-align:center;
}
@media only screen and (max-width: 600px){
  .content-detail-product .flex-detail-product .image {
    width: 100%;
  }
}

.content-detail-product .flex-detail-product .info {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding :10px;
}

.content-detail-product .flex-detail-product .image img {
  width: 100%;
  padding: 4px;
}
@media only screen and (max-width: 600px){
  .content-detail-product .flex-detail-product .image img {
    padding: 0px;
  }
}


.content-detail-product .flex-detail-product .info .company,
.price,
.price-none,
.status,
.discount {
  font-weight: 900;
  font-size: 15px;
  margin: 3px 0;
}

.content-detail-product .flex-detail-product .info .company .detail {
  color: blue;
}

.content-detail-product .flex-detail-product .info .price .detail {
  color: green;
}

.content-detail-product .flex-detail-product .info .price-none .detail {
  color: grey;
  text-decoration: line-through;
  text-decoration-color: red;
  text-decoration-thickness: 2.35px;
}

.content-detail-product .flex-detail-product .info .status .detail {
  background-color: ${({ status }) => (status ? "blue" : "red")};
  color: white;
  padding: 0 10px;
  border-radius: 10px;
}

.content-detail-product .flex-detail-product .info .discount .detail {
  background-color: greenyellow;
  color: blue;
  padding: 0 10px;
  border-radius: 10px;
}
.content-detail-product .flex-detail-product .info .description p{
  color:grey;
  font-weight: 700;
  font-size:13px;
  width : 100%;
  overflow: hidden;
  margin-bottom: 0px
}
.content-detail-product .flex-detail-product .info  .view-less p{
  ${({ data }) => (data ? null : "height:100px;")}
} 
@media only screen and (max-width: 980px){
  .content-detail-product .flex-detail-product .info  .view-less p{
    ${({ data }) => (data ? null : "height:160px;")}
  }
}
.content-detail-product .flex-detail-product .info .description .view-more{
  color:blue;
  font-weight: 700;
  font-size:13px;
}
.content-detail-product .flex-detail-product .buttoms{
  display:flex;
  justify-content: space-between;
  margin: 10px 0;
}
@media only screen and (max-width: 780px){
  .content-detail-product .flex-detail-product .buttoms{
    flex-direction:column;
  }
}
.content-detail-product .flex-detail-product .buttoms .buttom{
  border:none;
  background:transparent;
  width:100%;
  margin: 5px;
  border-radius:5px;
  padding:5px 15px;
  transition: all 0.1s ease-in-out;
  font-size:18px;
  font-weight:700;
  display:flex;
  align-items:center;
  justify-content: center
}
@media only screen and (max-width: 450px){
  .content-detail-product .flex-detail-product .buttoms .buttom{
    font-size:15px;
  }
}
.content-detail-product .flex-detail-product .buttoms  .cart{
  background : linear-gradient(to right, blue, greenyellow);
  color:white;
}

.content-detail-product .flex-detail-product .buttoms  .cart .react-icon{
  font-size:25px;
  margin: 0 10px
}
@media only screen and (max-width: 450px){
  .content-detail-product .flex-detail-product .buttoms  .cart .react-icon{
    font-size:20px;
  }
}
.content-detail-product .flex-detail-product .buttoms  .cart:active{
  transform:scale(105%);
}
.content-detail-product .flex-detail-product .buttoms  .buy:active{
  transform:scale(105%);
}
.content-detail-product .flex-detail-product .buttoms  .buy{
  background :blue;
  color:white;
}
.content-detail-product .flex-detail-product .buttoms  .buy .react-icon{
  font-size:25px;
  margin: 0 10px
}
@media only screen and (max-width: 450px){
  .content-detail-product .flex-detail-product .buttoms  .buy .react-icon{
    font-size:20px;
  }
}
`
