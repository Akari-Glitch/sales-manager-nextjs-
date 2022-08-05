import styled from "@emotion/styled";
export const StylesInventory = styled.div`
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
    border: 1px solid black;
    padding: 10px;
    margin: 0;
  }
  table span {
    font-size: 18px;
    font-weight: bolder;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .button-container button {
    background: white;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
  }
`;
