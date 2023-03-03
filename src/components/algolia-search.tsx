import {
  Badge,
  Box,
  HTMLNatureProps,
  Modal,
  Stack,
  clsx,
} from "@nature-ui/core";
import { SearchIcon } from "@nature-ui/icons";
import data from "configs/search-metadata.json";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import { Ref, forwardRef, useCallback, useRef, useState } from "react";
import { getNChars } from "utils/get-n-chars";

function Hit(props) {
  const { hit, children } = props as any;
  return <Link href={hit.url}>{children}</Link>;
}

export const SearchButton = forwardRef(
  (props: HTMLNatureProps<"button">, ref: Ref<HTMLButtonElement> | null) => {
    return (
      <Box
        as="button"
        ref={ref}
        {...props}
        variant="none"
        className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300"
      >
        <SearchIcon className="mr-3 ml-1" size="md" />
        <p className="text-gray-500">Quick search...</p>
      </Box>
    );
  }
);

SearchButton.displayName = "SearchButton";

export const SearchInput = ({ className = "", onChange, ...props }) => {
  return (
    <Box
      className={clsx(
        className,
        "px-4 py-3 border flex items-center rounded-xl"
      )}
      {...props}
    >
      <SearchIcon className="text-dark-200" />
      <input
        onChange={onChange}
        className="ml-3 focus:outline-none bg-transparent w-full"
        placeholder="Search"
      />
    </Box>
  );
};

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [initialQuery, setInitialQuery] = useState<string>("");

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleChange = useCallback(
    (e) => {
      setInitialQuery(e.target.value);
    },
    [setInitialQuery]
  );

  const result =
    initialQuery.length && data
      ? matchSorter(data, initialQuery, {
          keys: ["title", "description", "tags"],
        })
      : [];

  return (
    <>
      <SearchButton onClick={onOpen} ref={searchButtonRef} />
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <>
            <SearchInput onChange={handleChange} />
            {result.map((item) => (
              <Link href={item.url} key={item.title}>
                <Box className="hover:bg-primary-600 my-2 bg-opacity-20 bg-gray-300 p-4 rounded-xl group group">
                  <h4 className="group-hover:text-gray-100">
                    {getNChars(item.title, 55)}
                  </h4>
                  {item.tags && (
                    <Stack row spacing="8px" className="my-2">
                      {item.tags.map((tag, i) => (
                        <Badge
                          className="bg-accent-700 text-dark-800"
                          key={tag + i}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </Stack>
                  )}
                  <p className="group-hover:text-gray-200">
                    {getNChars(item.title, 75)}
                  </p>
                </Box>
              </Link>
            ))}
          </>
        </Modal>
      )}
    </>
  );
}
