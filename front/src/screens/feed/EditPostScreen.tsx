import PostForm from '@/components/post/PostForm';
import {feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>;

const EditPostScreen = ({route}: EditPostScreenProps) => {
  const {location} = route.params;

  return <PostForm location={location} isEdit={true} />;
};

export default EditPostScreen;
