import styled, { createGlobalStyle, css, keyframes } from "styled-components";
// import { lighten } from "polished";
// import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import AsyncSelect from "react-select/async";
// import { headShake } from "react-animations";


import { device } from "./mediaQuery";

export default createGlobalStyle`
  .text-center{
    text-align: center;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar-thumb {
      background: rgba(98,9,139,0.50);
      border-radius: 8px;
      right: 2px;
      position: absolute;
    }
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
    overflow: hidden;
  }

  body {
    height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 97%;
  margin: 0 auto;

  ::-webkit-scrollbar-thumb {
    background: rgba(98, 9, 139, 0.5);
    border-radius: 8px;
    right: 2px;
    position: absolute;
  }

  ::-webkit-scrollbar {
    background: transparent;
    width: 8px !important;
  }

  .MuiInputBase-root {
    font-size: 14px;
    color: #544a57;
    font-weight: bold;
  }

  .MuiTypography-root {
    padding: 1px;
  }

  .MuiPaper-elevation4,
  .MuiTabs-flexContainer {
    box-shadow: none;
    background: #fff;
    border-bottom: solid 1px #61098a;
  }

  .MuiTabs-indicator {
    background-color: #61098a;
  }

  .MuiTab-textColorPrimary {
    color: #61098a;
  }

  .MuiTab-textColorPrimary.Mui-selected {
    color: #420264;
  }
  .MuiCheckbox-colorPrimary.Mui-checked {
    color: #420264;
  }

  select {
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    background: #f6f8ff;
    border: solid 1px #d8dbea;
    border-radius: 4px;
    height: 32px;
    padding-left: 5px;
    padding-right: 7px;
    color: #544a57;

    transition: background 0.3s;
    width: 100%;

    &:focus {
      border: solid 1px #ccc;
      box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
      background: #fcffd3;
    }
  }

  option {
    color: #544a57;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 500;
    line-height: 150;
    background-color: #f6f8ff;
    border: solid 1px #d8dbea;
  }
`;

export const CModal = styled.div`
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  margin: 0 auto;
  padding: 10px;
  background: #fafafa;
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  width: ${(props) => props.wd};
  height: 30px;
  background: #fafafa;
  border-bottom: solid 1px #ccc;

  h1 {
    font-weight: 700;
    color: #500569;

    @media ${device.mobileS} {
      font-size: 11px;
    }

    @media ${device.tablet} {
      font-size: 11px;
    }

    @media ${device.laptop} {
      font-size: 13px;
    }

    @media ${device.laptopL} {
      font-size: 15px;
    }
  }

  button {
    border: 0;
    background: none;

    svg {
      @media ${device.mobileS} {
        font-size: 18px;
      }

      @media ${device.tablet} {
        font-size: 18px;
      }

      @media ${device.laptop} {
        font-size: 21px;
      }

      @media ${device.laptopL} {
        font-size: 26px;
      }
    }
  }
`;

export const Linha = styled.div`
  background: #500569;
  margin-bottom: 20px;
  height: 1px;
  width: 100%;
`;

export const AreaComp = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  flex-direction: ${(props) =>
    props.fDirection ? props.fDirection : "column"};
  justify-content: ${(props) => props.jContent ?? "center"};
  justify-items: left;
  align-self: ${(props) => (props.algSelf ? props.algSelf : "center")};
  align-items: ${(props) => (props.algItems ? props.algItems : "unset")};
  padding-left: ${(props) => props.pleft};
  padding-top: ${(props) => props.ptop};
  padding-right: ${(props) => props.pright};
  padding-right: ${(props) => (props.noPd ? "0" : "5px")};
  padding-bottom: ${(props) => (props.noPd ? "0" : "5px")};
  margin: ${(props) => (props.mg ? props.mg : 0)};
  width: ${(props) => props.wd}%;
  font-size: 14px;
  font-weight: 400;
  min-height: 35px;
  color: #500569;
  font-size: 12px;
  color: #232c4f;
  min-width: ${(props) => (props.minWd ? props.minWd : "auto")};
  gap: ${(props) => props.gap ?? 0};

  ${(props) =>
    props.hver &&
    css`
      &:hover {
        label,
        span {
          font-size: 12px;
          transition: font-size 0.4s;
        }
      }
    `}
  ${(props) =>
    props.bright &&
    css`
      border-right: solid 1px #ccc;
    `}
    ${(props) =>
    props.btn &&
    css`
      button {
        border: 0;
        background: none;
      }
    `}
    h1 {
    color: #fa7d00;
    font-weight: 700;
    font-size: 14px;
  }

  h3 {
    width: 100%;
    text-align: right;
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #61098a;
  }

  h2 {
    width: 100%;
    text-align: center;
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #61098a;
  }

  label {
    color: #6b6565;
    font-weight: 500;
    font-size: 13px;
  }

  @media ${device.mobileS} {
    width: ${(props) => (props.wdr ? `${props.wdr}%` : "100%")};
  }

  @media ${device.tablet} {
    width: ${(props) => (props.wdr ? `${props.wdr}%` : "100%")};
  }

  @media ${device.laptop} {
    width: ${(props) => props.wd}%;
  }

  @media ${device.laptopL} {
    width: ${(props) => props.wd}%;
  }
`;

export const AreaCad = styled.div`
  width: 100%;
`;

export const AreaConsult = styled.div`
  width: 100%;
  padding-left: ${(props) => props.pleft};
  padding-right: ${(props) => props.pright};
  padding-top: ${(props) => props.ptop};
  padding-bottom: ${(props) => props.pbottom};
  padding: ${(props) => props.pd};
`;

export const CustomSelect = styled(Select)`
  & .Select__single-value {
    font-weight: bold;
    color: #495057;
  }

  @media ${device.mobileS} {
    & .Select__control {
      height: 26px;
      min-height: 26px;
      height: auto;
    }
    & .Select__indicator {
      margin-top: -6px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.tablet} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }
    .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptop} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }

    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptopL} {
    & .Select__control {
      height: 32px;
      min-height: 32px;
    }
    & .Select__indicator {
      margin-top: -3px;
    }
    & .Select__single-value {
      font-size: 15px;
      top: 50%;
    }
    & .Select__indicator-separator {
      margin-top: 8px;
    }
  }
  & .Select__control {
    ${(props) =>
      props.isMulti &&
      css`
        height: auto;
      `}
  }
`;

export const AsyncCustomSelect = styled(AsyncSelect)`
  & .Select__single-value {
    font-weight: bold;
    color: #495057;
  }

  @media ${device.mobileS} {
    & .Select__control {
      height: 26px;
      min-height: 26px;
    }
    & .Select__indicator {
      margin-top: -6px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.tablet} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }
    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptop} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }

    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptopL} {
    & .Select__control {
      height: 32px;
      min-height: 32px;
    }
    & .Select__indicator {
      margin-top: -3px;
    }
    & .Select__single-value {
      font-size: 15px;
      top: 50%;
    }
    & .Select__indicator-separator {
      margin-top: 8px;
    }
  }
`;

export const ToolbarContainer = styled.div`
  width: 100%;
  height: 40vh;
  background-color: ${(props) => (props.bckColor ? props.bckColor : "#4d2679")};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: auto;
  z-index: 152;

  @media ${device.mobileS} {
    margin-bottom: 6px;
  }

  @media ${device.tablet} {
    margin-bottom: 6px;
  }

  @media ${device.laptop} {
    margin-bottom: 8px;
  }

  @media ${device.laptopL} {
    margin-bottom: 13px;
  }
`;

export const ToolbarButton = styled.button`
  text-align: center;
  padding: 3px 16px 0px 16px;

  background: transparent;
  font-weight: bold;
  color: #fff;
  border: 0;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #723ead;
  }
`;

export const ToolbarButtonWarning = styled(ToolbarButton)`
  &:hover {
    background: #e42a3c;
  }
`;

export const ToolbarButtonConfirm = styled(ToolbarButton)`
  &:hover {
    background: #149918;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.jcontent ? props.jcontent : "flex-start"};
  align-items: ${(props) => (props.jcontent ? props.jcontent : "flex-start")};
  margin-left: ${(props) => props.mleft}px;
  margin-top: ${(props) => props.mtop}px;
  width: ${(props) => props.wd}%;
  background: ${(props) => (props.bg ? props.bg : "#eee9f4")};
  height: ${(props) => props.hg}px;

  border: 0;
  border-radius: 3px;

  @media ${device.mobileS} {
    padding: 4px;
    margin-bottom: 10px;
  }

  @media ${device.tablet} {
    padding: 4px;
    margin-bottom: 10px;
  }

  @media ${device.laptop} {
    padding: 6px;
    margin-bottom: 12px;
  }

  @media ${device.laptopL} {
    padding: 8px;
    margin-bottom: 14px;
  }

  h2 {
    color: #4d2679;
    font-weight: bold;

    @media ${device.mobileS} {
      font-size: 15px;
    }

    @media ${device.tablet} {
      font-size: 15px;
    }

    @media ${device.laptop} {
      font-size: 16px;
    }

    @media ${device.laptopL} {
      font-size: 18px;
    }

    small {
      font-size: 13px;
      margin-left: 10px;
    }
  }

  h3 {
    color: #4d2679;
    font-weight: bold;

    @media ${device.mobileS} {
      font-size: 14px;
    }

    @media ${device.tablet} {
      font-size: 14px;
    }

    @media ${device.laptop} {
      font-size: 15px;
    }

    @media ${device.laptopL} {
      font-size: 17px;
    }

    small {
      font-size: 12px;
      margin-left: 10px;

      svg {
        position: relative;
        bottom: -3px;
      }
    }
  }

  h4 {
    color: #4d2679;
    font-weight: bold;

    @media ${device.mobileS} {
      font-size: 11px;
    }

    @media ${device.tablet} {
      font-size: 11px;
    }

    @media ${device.laptop} {
      font-size: 12px;
    }

    @media ${device.laptopL} {
      font-size: 14px;
    }

    small {
      font-size: 11px;
      margin-left: 10px;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ToolbarBtn = styled(ToolbarButton)`
  padding: 5px 10px 3px 10px;
  transition: background 0.4s;

  &:hover {
    background-color: #a13a93;
  }

  svg {
    font-size: 25px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: ${(props) => props.jContent};
  justify-items: center;
  flex-wrap: ${(props) => (props.flwrap ? "wrap" : "unset")};
  margin: ${(props) => props.mg};
  margin-top: ${(props) => props.mgtop}px;
  margin-bottom: ${(props) => props.mgbottom}px;
  padding-top: ${(props) => props.pdtop}px;
  padding-bottom: ${(props) => props.pdbottom}px;
  padding-left: ${(props) => (props.pdleft ? props.pdleft : 2)}px;
  padding-right: ${(props) => (props.pdright ? props.pdright : 2)}px;
  padding: ${(props) => props.pd ?? 0};
  width: ${(props) => props.maxWd || "100%"};
  max-width: ${(props) => props.maxWd};
  gap: ${({ gp }) => gp ?? "0"};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.jContent};
  justify-items: center;
  flex-wrap: ${(props) => (props.flwrap ? "wrap" : "unset")};
  margin: ${(props) => props.mg};
  margin-top: ${(props) => props.mgtop}px;
  margin-bottom: ${(props) => props.mgbottom}px;
  padding-top: ${(props) => props.pdtop}px;
  padding-bottom: ${(props) => props.pdbottom}px;
  padding-left: ${(props) => (props.pdleft ? props.pdleft : 2)}px;
  padding-right: ${(props) => (props.pdright ? props.pdright : 2)}px;
  padding: ${(props) => props.pd ?? 0};
  width: ${(props) => props.maxWd || "100%"};
  max-width: ${(props) => props.maxWd};
  gap: ${({ gp }) => gp ?? "0"};
`;

export const Toolbar = styled(ToolbarContainer)`
  justify-content: space-between;
  margin-bottom: 0;
  background-color: #fafafa;
  border-bottom: solid 1px #ccc;
  color: #543676;
  height: 31px;

  .title {
    margin: auto;
    font-size: 16px;
    padding-top: 4px;
    font-weight: bold;
  }

  ${({ colorInverterDefault }) =>
    colorInverterDefault &&
    css`
      color: #fff;
      border-bottom: 1px solid #543676;
      background-color: #543676;
    `}
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 3px;
`;
