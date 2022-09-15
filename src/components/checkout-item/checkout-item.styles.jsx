import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 28%;
  padding-right: 15px;
  img {
    width: 90%;
  }
`;

export const BaseSpan = styled.span`
  width: 18%;
  &:nth-child(2) {
    width: 28%;
  }
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 8px;
  min-width: 22px;
  text-align: center;
`;

export const RemoveButton = styled.div`
  margin-left: 16px;
  font-size: 26px;
  cursor: pointer;
`;
