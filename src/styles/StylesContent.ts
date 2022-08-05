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
  }
`;
