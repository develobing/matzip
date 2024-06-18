import React from 'react';
import HeaderButton from './HeaderButton';

interface AddPostHeaderRightProps {
  onSubmit: () => void;
}

const AddPostHeaderRight = ({onSubmit}: AddPostHeaderRightProps) => {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
};

export default AddPostHeaderRight;
