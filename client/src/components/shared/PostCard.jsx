import { multiFormatDateString } from "../../utils/index";
import VideoPlayer from "./VideoPlayer";

const PostCard = ({ questionAndPost }) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <img
            src={
              questionAndPost.avatarImgURL ||
              (questionAndPost.profileImgURL &&
                `https://edubird-mern-server.onrender.com/uploads/images/${questionAndPost.profileImgURL}`) ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="creator"
            className="rounded-full w-12 lg:h-12"
          />

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {questionAndPost.name}
            </p>
            <div className="flex items-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(questionAndPost.createdAt)}
              </p>
              {questionAndPost.location && (
                <p className="subtle-semibold lg:small-regular">
                  - {questionAndPost.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="small-medium lg:base-medium py-5">
        {questionAndPost.rteText && (
          <div
            id="show_text_div"
            style={{
              marginTop: "10px",
              border: "1px solid #ddd",
              minHeight: "100px",
              padding: "20px",
            }}
            dangerouslySetInnerHTML={{ __html: questionAndPost.rteText }}
            className="rounded-md"
          ></div>
        )}

        {questionAndPost.text && (
          <p className="whitespace-pre-wrap">{questionAndPost.text}</p>
        )}
      </div>

      {questionAndPost.code && (
        <div className="small-medium lg:base-medium py-5 whitespace-pre-wrap">
          <p>{questionAndPost.code}</p>
        </div>
      )}

      {questionAndPost.image && (
        <div>
          <img
            src={`https://edubird-mern-server.onrender.com/uploads/images/${questionAndPost.image}`}
            alt="post image"
            className="post-card_img"
          />
        </div>
      )}

      {questionAndPost.video && <VideoPlayer srcURL={questionAndPost.video} />}
    </div>
  );
};

export default PostCard;
