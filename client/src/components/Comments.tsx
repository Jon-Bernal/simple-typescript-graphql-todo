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
    update(cache, { data }) {
      console.log("data :>> ", data);
      const existingComments: any = cache.readQuery({
        query: GetAllCommentsDocument,
      });
      console.log("existingComments", existingComments);
      // const newComments = existingComments!.Comments((c: any) => (c._id !== Comment._id))
      const newComments = existingComments.filter(
        (c: any) => c.userId !== userId
      );
      console.log("newComments", newComments);
      // cache.modify({
      //   fields: {
      //     deleteComment() {

      //       if (data) {
      //         cache.evict({ id: id });
      //         cache.gc();
      //       }
      //     },
      //   },
      // });
    },
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
