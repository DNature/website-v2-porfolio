import { createRef, forwardRef, useEffect } from "react";

const CommentBox = forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
  return <div ref={ref} className="comments" {...props} />;
});

const Comments = ({ ...props }) => {
  const commentBox = createRef<HTMLDivElement>();

  useEffect(() => {
    const commentScript = document.createElement("script");
    commentScript.async = true;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("repo", "DNature/divinehycenth.com");
    commentScript.setAttribute("issue-term", "pathname");
    commentScript.setAttribute("label", "discuss");
    commentScript.setAttribute("theme", "preferred-color-scheme");
    commentScript.setAttribute("crossorigin", "anonymous");

    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript);
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, [commentBox]);

  return <CommentBox {...props} ref={commentBox} />;
};

export default Comments;
