import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { Comment, Pagination, Post } from '../types';

export default function Comments({ post }: { post: Post }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setComments] =
    useState<{ data: Comment[]; pagination: Pagination }>();

  useEffect(() => {
    fetch(`${Config.API_URL}posts/${post.id}/comments`)
      .then((response: any) => response.json())
      .then(
        (json: {
          success: boolean;
          data: Comment[];
          pagination: Pagination;
        }) => {
          if (json.success) {
            setComments(json);
          }
        },
      )
      .catch((error: any) => console.error(error));
  }, [post.id]);

  return <View />;
}
