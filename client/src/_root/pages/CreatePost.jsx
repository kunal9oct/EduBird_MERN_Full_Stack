import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "bad-words";
import FileUploader from "../../components/shared/FileUploader";
import { UserContext } from "../../store/user-context";
import Loader from "../../components/shared/Loader";

const CreatePost = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [showError, setShowError] = useState(false);
  const [loader, setLoader] = useState(false);
  const maxSize = 25 * 1024 * 1024; // 25 MB

  // Filter out abusive and bad words
  const filter = new Filter();

  function filterAbusiveWords(text) {
    return filter.clean(text);
  }

  const handleVideoChange = (event) => {
    const file = event.target.files[0];

    if (file.size > maxSize) {
      alert("File size exceeds the maximum limit of 25MB");
      setShowError(true);
      return;
    } else {
      setVideo(file);
      setShowError(false);
    }
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const onSubmit = async () => {
    setLoader(true);
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("post", true);

    if (user.id) {
      formData.append("userId", user.id);
    }

    if (user.name) {
      formData.append("name", user.name);
    }

    if (user.avatarImgURL) {
      formData.append("avatarImgURL", user.avatarImgURL);
    }

    if (user.profileImgURL) {
      formData.append("profileImgURL", user.profileImgURL);
    }

    if (location) {
      const filteredLocation = filterAbusiveWords(location);
      formData.append("location", filteredLocation);
    }

    if (text) {
      const filteredText = filterAbusiveWords(text);
      formData.append("text", filteredText);
    }

    if (image) {
      formData.append("image", image);
    }

    if (video) {
      formData.append("video", video);
    }

    if (
      !formData.has("text") &&
      !formData.has("image") &&
      !formData.has("video")
    ) {
      setLoader(false);
      alert("You are not uploading anything");
      return;
    }

    const addPost = async () => {
      try {
        const response = await fetch(
          `https://edubird-mern-server.onrender.com/createPost/${user.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          navigate(-1);
        }

        if (response.status === 401) {
          alert(result.message);
        }

        if (response.status === 403) {
          alert(result.message);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(
          "status: " +
            error.status +
            " || " +
            "Error creating Post: " +
            error.message
        );
        alert(
          "status: " +
            error.status +
            " || " +
            "Error creating Post: " +
            error.message
        );
      }
    };

    addPost();
  };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  const inputCSS =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-9 w-full max-w-5xl"
        >
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
              htmlFor="caption"
            >
              Caption
            </label>

            <textarea
              id="caption"
              className="shad-textarea text-sm px-3 py-2 w-full custom-scrollbar"
              value={text}
              onChange={handleText}
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
              htmlFor="addPhoto"
            >
              Add Photos
            </label>
            <FileUploader id="addPhoto" setImage={setImage} />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="video-upload"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
            >
              Add Video
            </label>
            <div className="shad-textarea text-sm px-3 py-2 w-full">
              <input
                type="file"
                id="video-upload"
                accept="video/*"
                onChange={handleVideoChange}
              />
            </div>
            {showError ? (
              <span style={{ color: "red" }}>File Size Exceeds 25MB</span>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
              htmlFor="addLocation"
            >
              Add Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`${inputCSS} shad-textarea`}
            />
          </div>

          <div className="flex gap-4 items-center justify-end">
            <button
              type="button"
              className={`${buttonCSS} shad-button_dark_4`}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSubmit}
              className={`${buttonCSS} shad-button_primary`}
              disabled={loader}
            >
              {loader ? <Loader /> : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
