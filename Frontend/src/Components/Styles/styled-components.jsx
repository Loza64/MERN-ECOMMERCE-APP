import styles from 'styled-components'

export const NavBar = styles.div`
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
  display:flex;
  align-items:center;
}
.sidebar div {
  display:flex;
  margin:0 20px;
}
.sidebar div .txt-search{
  font-weight:800;
  outline:none;
  border:0;
  padding:5px 10px;
  border-radius: 6px 0 0 6px;
  transition:all 0.3s ease-in-out;
}
.sidebar div .btn-search{
  background: #2AFF00;
  outline:none;
  border:0;
  font-size:20px;
  padding:5px 8px;
  display:flex;
  align-items:center;
  border-radius: 0 6px 6px 0;
  transition:all 0.3s ease-in-out;
}
.sidebar div .btn-search:hover{
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
  margin:0 10px;
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
`