import styled from "@emotion/styled";
export const StylesLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;

  .form-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .title-symbol {
    color: #f08321;
    color: #000;

    font-weight: bolder;
  }
  h1 {
    color: black;
    width: 100%;
    text-align: center;
    font-size: 28px;
  }
  .text-admin {
    color: #059b15;
    font-weight: bolder;
    font-size: 32px;
  }

  .form-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .submit-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }

  .form-container input[type="submit"] {
    color: white;
    box-shadow: 0px 1px 31px 0px rgba(5, 155, 21, 0.75);
    -webkit-box-shadow: 0px 1px 31px 0px rgba(5, 155, 21, 0.75);
    -moz-box-shadow: 0px 1px 31px 0px rgba(5, 155, 21, 0.75);
    outline: none;
    border: none;
    background: #059b15;

    font-size: 15px;
    font-weight: bolder;
    padding: 10px 70px;
    border-radius: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justif-content: center;
  }

  .inputs-container input {
    outline: none;
    border: 1px gray solid;
    margin-top: 5px;
    width: 70vw;
    height: 30px;
    border-radius: 15px;
    padding: 20px;
  }

  .inputs-container label {
    font-size: 15px;
  }
  .input-container {
    display: flex;
    margin-bottom: 15px;
    justify-content: center;
    flex-direction: column;
  }

  @media (min-width: 700px) {
    margin-top: 50px;
    .inputs-container input {
      width: 300px;
    }

    .img-huevo {
      height: 250px;
      width: 300px;
    }
  }

  @media (min-height: 800px) {
    margin-top: 80px;
  }
`;
