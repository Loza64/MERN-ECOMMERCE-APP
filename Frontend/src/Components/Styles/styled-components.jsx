import styles from 'styled-components'

export const NavBar = styles.div`
position:absolute;
width:100%;
background:black;
padding:15px 10px;
display:flex;
align-items:center;
justify-content:space-between;
border-bottom:4px solid #2AFF00;

color:white;
.title-business{
  font-weight:900;
  font-size:25px
}
.sidebar{
  width:100%;
  display:flex;
  align-items:center;
}
.sidebar .content-search{
  display:flex;
  margin:0 20px;
  width:100%;
}
.sidebar .content-search .txt-search{
  font-weight:800;
  outline:none;
  border:0;
  padding:7px 13px;
  border-radius: 6px 0 0 6px;
  transition:all 0.3s ease-in-out;
  background: rgba(49, 48, 48, 1);
  width:100%;
  color:white;
}
.sidebar .content-search .txt-search::placeholder{
  color:lightgray;
}
.sidebar .content-search .txt-search::-webkit-search-cancel-button {
  color: green;
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
  justify-content:space-between;
  font-weight:800;
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
  font-size:18px
}
.sidebar .login-buttom a{
  color:white;
  margin:0 10px;
  text-decoration:none;
  display:flex;
  align-items:center;
  font-weight:800;
  transition:all 0.3s ease-in-out;
}
.sidebar .login-buttom a .react-icon{
  font-size:18px
}
.sidebar .login-buttom a:hover{
  color:#2AFF00
}
.btn-menu{
  transition:all 0.2s ease-in-out;
  background:#2AFF00;
  font-size:35px;
  padding:3px;
  border-radius:5px;
  display:none;
}
.btn-menu:active{
  background: rgb(0, 194, 26);
}
`