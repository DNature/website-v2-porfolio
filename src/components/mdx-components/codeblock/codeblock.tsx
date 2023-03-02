import { Box } from "@nature-ui/core";
import { CodeContainer } from "./code-container";
import { CopyButton } from "./copy-button";
import { Highlight } from "./highlight";
import { Pre } from "./pre";

const Code = (props) => {
  const { className, children, viewlines, ln } = props.children.props;

  const language = className?.replace(/language-/, "");
  const rawCode = children.trim();

  return (
    <Box className="relative z-0 editor__component">
      <CodeContainer className="p-4 overflow-hidden">
        <Highlight
          codeString={rawCode}
          language={language}
          metaString={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton className="top-2" code={rawCode} />
    </Box>
  );
};

export const CodeBlock = (props) => {
  if (typeof props.children === "string") return <Pre {...props} />;
  return <Code {...props} />;
};
