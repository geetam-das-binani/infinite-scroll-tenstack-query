import React, { useEffect } from "react";
import TodoCard from "./components/TodoCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const App = () => {
  const { ref, inView } = useInView();
  const fetchTodos = async (props) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${props.pageParam}`
    );
    return response.json();
  };
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: (props) => fetchTodos(props),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = !lastPage.length ? undefined : allPages.length + 1;
      return nextPage;

      //whenever getNextPageParams has a number hasNextpage
      // is true else false 
    },

    initialPageParam: 1,  //this initialPageParams is going to be used in props of fetchTodos function inside of an object


  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div className="app">
      {data?.pages?.map((todos) =>
        todos?.map((todo, index) => {
          if (index === todos.length - 1){
          return <TodoCard innerRef={ref} key={todo.id} {...todo} />
          }
          return <TodoCard key={todo.id} {...todo} />
        })
      )}
      {/* <button
      
        ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading more.."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button> */}

      {/* <p ref={ref}></p>  */}
      {/* if button not to be shown at all
      p tag is empty because we dont want to show anything but we want it to be in view */}

      {isFetchingNextPage && <h3>Loading...</h3>}
    </div>
  );
};

export default App;
