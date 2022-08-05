import styled from "@emotion/styled";
export const StylesNavbar = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  height: 50px;
  background: white;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid gray;
  .contain {
    display: flex;
    align-items: center;
    width: 90%;
  }
  
  .title {
    display: flex;
    max-height: 40px;
    font-size: 30px;
    text-align: center;
    color: #3cc44d;
    align-items: center;
    justify-content: center;
    width: 75%;
  }

  .menu {
    position: absolute;
    background: #076d77;
    width: 100%;
    padding-bottom: 50px;
    top: 34px;
    list-style: none;
    transition: 0.4s;
    padding: 0;
    padding-bottom: 20px;
  }
  .li-link {
    color: white;
    font-weight: bolder;
    margin-bottom: 10px;
    border-top: 1px solid #31919a;
  }
  .li-link a {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .show-menu {
    left: 0;
    transform: translate(0);
  }
  .hidden-menu {
    right: 0;
    transform: translate(100%);
  }
  .menu-logo-contain {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 1024px) {
    height: 100vh;
    background: white;
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    width: 15vw;
    justify-content: center;
    align-items: flex-start;
    .contain {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .menu-logo-contain {
      display: none;
    }
    .title {
      margin-top: 50px;
      color: #3cc44d;
      width: 100%;
      text-align: center;
    }
    .hidden-menu {
      transform: translate(0);
    }

    nav {
      width: 100%;
      height: 80%;
      display: flex;
    }
    .menu {
      display: flex;
      flex-direction: column;
      position: static;
      height: 70%;
      padding: 0;
      margin: 0;
      background: white;

      width: 100%;
      justify-content: space-around;
    }

    .li-link {
      list-style: none;
      width: 100%;
      height: 50px;
      border: none;
      cursor: pointer;
      font-weight: bolder;
      font-size: 20px;
      color: #000;
      cursor-select: none;
    }
    .li-link:hover {
      border-bottom: 1px solid black;
    }
    a {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
`;
