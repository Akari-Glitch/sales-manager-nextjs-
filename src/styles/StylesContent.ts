import styled from "@emotion/styled";

export const StylesContent = styled.main`
  position: static;
  margin-top: 100px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  .content {
    margin: 0;
    width: 100%;
  }

  .title {
    font-size: 30px;
    text-align: center;
  }
  .table-container {
    display: flex;
    justify-content: center;
  }
  table {
    border-collapse: collapse;
  }

  table td {
    border: none;
    text-align: center;
    margin: 0;
    padding: 5px;
  }
  table span {
    font-size: 18px;
    font-weight: bolder;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .button-container button {
    background: white;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
  }
  input {
    border-radius: 10px;
    padding: 5px;
  }

  @media only screen and (min-width: 1024px) {
    margin: 0;
    position: absolute;
    right: 0;
    width: 85vw;

    .content {
      margin-top: 100px;
      width: 95%;
      margin-right: auto;
      margin-left: auto;
    }
    table span {
      font-size: 25px;
    }

    .button-container button {
      padding: 15px;
    }
  }
`;
