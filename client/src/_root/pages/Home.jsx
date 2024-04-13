import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import PostCard from "../../components/shared/PostCard";

const Home = () => {
  const [questionsAndPosts, setQuestionsAndPosts] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoader(true);

    const fetchAll = async () => {
      try {
        const response = await fetch(`https://edubird-mern-server.onrender.com/getAll`);

        const result = await response.json();

        if (result.success) {
          setQuestionsAndPosts(result.all);
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setError(true);
        console.log('status: ' + error.status + ' || ' + 'Error: ' + error.message);
      }
    };

    fetchAll();
  }, []);

  if (error) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Retry! Something bad happened</p>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  return (
    <>
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            {loader ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full ">
                {questionsAndPosts?.map((questionAndPost) => (
                  <li
                    key={questionAndPost.createdAt}
                    className="flex justify-center w-full"
                  >
                    <PostCard questionAndPost={questionAndPost} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
