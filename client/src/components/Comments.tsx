import React, { FC, useReducer, ChangeEvent } from "react";
import {
  Comment,
  useGetAllCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  GetAllCommentsDocument,
} from "../codeGenFE";
import AddComment from "./addComment";

interface Props {
  userId: string;
}

interface State {
  commentToEdit: Comment | null;
}

export type Actions =
  | { type: "start editing comment"; comment: Comment }
  | { type: "cancel editing comment" }
  | { type: "changing comment text"; payload: string }
  | { type: "finished editing comment" };

const commentsReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "start editing comment":
      return {
        ...state,
        commentToEdit: action.comment,
      };
    case "changing comment text":
      console.log("state :>> ", state);
      const updated = {
        ...state.commentToEdit!,
        comment: action.payload!,
      };
      console.log("updated", updated);
      return {
        ...state,
        commentToEdit: updated,
      };
    case "finished editing comment":
      return {
        ...state,
        commentToEdit: null,
      };
    default:
      return state;
  }
};

const initState = {
  commentToEdit: null,
};

const Comments: FC<Props> = ({ userId }) => {
  const { data, loading, error } = useGetAllCommentsQuery({});
  const [commentState, commentDispatch] = useReducer(
    commentsReducer,
    initState
  );

  const { commentToEdit } = commentState;

  const [deleteCommentMutation, { data: delData }] = useDeleteCommentMutation({
    onError(error) {
      console.log("error :>> ", error);
    },
  });

  // ======================= Editing ======================= //

  const [
    updateCommentMutation,
    // { data: data2, loading: loading2, error: error2 },
  ] = useUpdateCommentMutation({});

  function editMode(comment: Comment) {
    commentDispatch({ type: "start editing comment", comment });
  }

  function submitEdit(id: string, content: string) {
    updateCommentMutation({
      variables: {
        id: id,
        comment: content,
      },
      update(cache, { data }) {
        commentDispatch({ type: "finished editing comment" });
      },
    });
  }

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
          if (commentToEdit?._id === c?._id) {
            return (
              <div key={c?._id}>
                <input
                  type="text"
                  value={commentToEdit?.comment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    commentDispatch({
                      type: "changing comment text",
                      payload: e.target.value,
                    });
                  }}
                />
                <button
                  onClick={() =>
                    submitEdit(commentToEdit?._id!, commentToEdit?.comment!)
                  }
                >
                  Change It
                </button>
              </div>
            );
          }

          return (
            <p key={c?._id}>
              {c?.comment}
              {c?.userId === userId && (
                <button onClick={() => editMode(c!)}>edit</button>
              )}
              {c?.userId === userId && (
                <button onClick={() => deleteComment(c?._id, userId)}>
                  Del
                </button>
              )}
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
