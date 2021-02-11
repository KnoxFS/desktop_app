import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';

const Text = styled.p`
  color: #333;
  font-size: 10px;
  text-align: center;
`;

const StorageProgress: React.FC = () => {
  return (
    <div>
      <ProgressBar now={40} />
      <Text className="mt-2">Storage : 402MB / 1GB</Text>
    </div>
  );
};

export default StorageProgress;
