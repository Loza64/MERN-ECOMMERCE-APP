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
.sidebar .login-buttom a .react-icon{
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
}
.btn-menu:active{
  background: rgb(0, 194, 26);
}


@media only screen and (max-width:1130px){
  .sidebar{
    position:fixed;
    top:4.45rem;
    background:rgba(0, 0, 0, 0.69);
    flex-direction:column;
    width:20rem;
    left:${({ menu }) => (menu ? "0px" : "-25rem")};
    padding:20px;
    height:100vh;
    transition: all 0.4s ease-in-out;
    overflow:scroll;
  }
  .sidebar .content-search .txt-search{
    background:rgba(49, 48, 48, 1);
    color:white;
  }
  .sidebar .content-search .txt-search::placeholder{
    color:lightgray;
  }
  nav{
    flex-direction:column-reverse;
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
  flex-direction: column;
  align-items: end;
  width:100%;
.react-icon{
  color:greenyellow;
  font-size:33px;
  transition:all 0.05s ease-in-out;
}
.react-icon:active{
  color:green;
}
`;