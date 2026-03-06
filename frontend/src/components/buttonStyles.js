import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
    color: #fff;
    border-radius: 10px;
    text-transform: none;
    font-weight: 600;
    &:hover {
      background: linear-gradient(135deg, #0F766E 0%, #115E59 100%);
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
    color: #fff;
    border-radius: 10px;
    text-transform: none;
    font-weight: 600;
    &:hover {
      background: linear-gradient(135deg, #0F766E 0%, #115E59 100%);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
    color: #fff;
    box-shadow: 0 4px 14px rgba(13, 148, 136, 0.25);
    &:hover {
      background: linear-gradient(135deg, #0F766E 0%, #115E59 100%);
      box-shadow: 0 6px 20px rgba(13, 148, 136, 0.35);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
    color: #fff;
    border-radius: 10px;
    text-transform: none;
    font-weight: 600;
    &:hover {
      background: linear-gradient(135deg, #34D399 0%, #22C55E 100%);
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #2c1006;
    color: white;
    &:hover {
      background-color: #40220c;
      border-color: #40220c;
      box-shadow: none;
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
    color: white;
    border-radius: 10px;
    text-transform: none;
    font-weight: 600;
    &:hover {
      background: linear-gradient(135deg, #0F766E 0%, #115E59 100%);
    }
  }
`;
