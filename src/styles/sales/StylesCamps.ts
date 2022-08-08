import styled from "@emotion/styled";

export const StylesCamps = styled.tr`
  .article {
    position: relative;
  }
  .list {
    position: absolute;
    width: 99%;
    top: 5px;
    z-index: 1;
  }
  .list-none {
    display: none;
  }

  .li {
    background: green;
  }

  @media only screen and (min-width: 1024px) {
  }
`;
