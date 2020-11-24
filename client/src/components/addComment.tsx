import React, { FC, useState } from "react";
import { CommentFragmentDoc, useMakeCommentMutation } from "../codeGenFE";

interface addCommentProps {
  userId: string;
}

const AddComment: FC<addCommentProps> = ({ userId }) => {
  const [comment, setComment] = useState("");
  const [
    makeCommentMutation,
    { data, error, loading },
  ] = useMakeCommentMutation({
    variables: {
      userId: userId,
      comment: comment,
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          getAllComments(existingComments = []) {
            const newCommentRef = cache.writeFragment({
              data: data?.makeComment,
              fragment: CommentFragmentDoc,
            });
            return [...existingComments, newCommentRef];
          },
        },
      });
    },
    onError(error) {
      console.log("error :>> ", error);
    },
  });

  const addComment = () => {
    makeCommentMutation();
  };

  if (loading) <div>Loading Comments...</div>;
  if (error) {
    console.log("error", error);
    return <div>ERROR</div>;
  }
  return (
    <div>
      <label htmlFor="comment">Add Comment</label>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => addComment()}>Add Comment</button>
    </div>
  );
};

export default AddComment;
