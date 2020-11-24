import React, { FC } from "react";
import {
  useGetAllCommentsQuery,
  useDeleteCommentMutation,
  GetAllCommentsDocument,
} from "../codeGenFE";
import AddComment from "./addComment";

interface Props {
  userId: string;
}

const Comments: FC<Props> = ({ userId }) => {
  const { data, loading, error } = useGetAllCommentsQuery({});

  const [deleteCommentMutation, { data: delData }] = useDeleteCommentMutation({
    onError(error) {
      console.log("error :>> ", error);
    },
  });

  function deleteComment(id: string | undefined, userId: string) {
    deleteCommentMutation({
      variables: {
        id: `${id}`,
        userId,
      },
      update(cache, { data }) {
        // also checkout https://dev.to/lucis/update-apollo-cache-after-a-mutation-and-get-instant-benefits-on-your-ui-1c3b
        cache.modify({
          fields: {
            getAllComments() {
              cache.evict({ id: id });
              cache.gc();
            },
          },
        });
      },
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("error", error);
    return <p>ERROR</p>;
  }
  console.log("data :>> ", data);
  if (data) {
    const { getAllComments: comments } = data;
    return (
      <div>
        {comments?.map((c) => {
          return (
            <p key={c?._id}>
              {c?.comment}
              <button onClick={() => deleteComment(c?._id, userId)}>
                delete
              </button>
            </p>
          );
        })}
        <AddComment userId={userId} />
      </div>
    );
  }
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Comments;
