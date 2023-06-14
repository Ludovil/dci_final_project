nav {
background-color: black;
display: flex;
justify-content: space-between;
align-items: center;
font-family: "sans-serif";
}

nav ul {
display: flex;
justify-content: space-between;
margin: 0;
padding: 20px;
}

nav ul li {
list-style-type: none;
text-decoration: none;
}

.navlink {
text-decoration: none;
font-size: 1.1rem;
font-weight: 600;
color: white;
transition: 0.3s ease-in-out;
position: relative;
}
.navlink:hover {
color: #fa4353;
cursor: pointer;
}
.navlink::after {
content: "";
width: 0;
height: 2px;
background: #fa4353;
position: absolute;
bottom: -2px;
left: 0;
transition: width 0.3s ease-in-out;
}
.navlink:hover::after {
content: "";
width: 100%;
height: 2px;
background: #fa4353;
position: absolute;
bottom: -2px;
left: 0;
}

.map,
.about,
.contact {
margin-left: 150px;
}
.contact {
margin-right: 150px;
}
.register {
margin-left: 300px;
}
.login {
margin-left: 50px;
}
.profile {
margin-right: 100px;
}
.profile-link {
position: relative;
}

.profile-link.active .submenu {
display: flex;
}

/_ postbox / logout _/
.submenu {

position: absolute;
top: 120%;
left: 10px;
flex-direction: column;
display: none;
background-color: black;
width: 200%;
border: 2px solid white;
z-index: 1;

}

.submenu .navlink {
color: white;
margin-top: 25px;
}
.allconversations {
display: inline-block;
margin-top: 25px;
}
.logout {
display: inline-block;
margin-top: 25px;
color: white;
text-decoration: none;
}

/_ Add this CSS for the hamburger menu icon _/
.menu-icon {
display: none; /_ Hide by default _/
color: white;
font-size: 1.5rem;
cursor: pointer;
margin-right: 10px;
}

/_ Add this CSS for the responsive menu _/

.menu li {
margin: 0 10px;
}

/_ responsive _/
@media (max-width: 1530px) {
.map,
.about,
.contact {
margin-left: 100px;
}
.register {
margin-left: 150px;
}
.login {
margin-left: 50px;
}
}
@media (max-width: 1237px) {
.map,
.about,
.contact {
margin-left: 40px;
}
.register {
margin-left: 65px;
}
.login {
margin-left: 40px;
}
}
@media (max-width: 959px) {
.map,
.about,
.contact {
margin-left: 25px;
}
.register {
margin-left: 50px;
}
.login {
margin-left: 25px;
}
}
/_ Add this CSS for the responsive menu _/
.menu {
display: flex;
justify-content: space-around;
margin: 0;
padding: 20px;
list-style-type: none;
margin-top: 32px;
}

.menu li {
margin: 0 10px;
}

/_ Mobile view _/
#mobile {
display: none;
}
#mobile i {
color: white;
padding-right: 20px;
cursor: pointer;
font-size: 24px;
}

@media (max-width: 881px) {
/_ Show the mobile icons and hide the rest of the links _/
nav ul {
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
position: fixed;
top: 30px;
right: -300px;
width: 300px;
height: 50vh;
background-color: black;
transition: 0.3s ease-in-out;
}
.show {
right: 0px;
}
.navlink {
margin: 24px;
}
nav ul li {
margin-bottom: 25px;
}
#mobile {
display: block;
}
.submenu {
position: absolute;
left: 0;
flex-direction: column;
display: none;
background-color: black;
height: 200px;
width: 270px;
}

.submenu li {
margin-top: 8px;
}

.submenu .navlink {
color: white;
}
.logout {
display: inline-block;
padding: 8px;
color: white;
text-decoration: none;
}
}
