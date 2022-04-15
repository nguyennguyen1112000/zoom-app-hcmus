import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
ClassItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  topic: PropTypes.string,
  numOfStudents: PropTypes.number,
  isMyClasses: PropTypes.bool,
};
ClassItem.defaultProps = {
  code: null,
  name: "",
  topic: "",
  numOfStudents: 0,
  isMyClasses: false,
};

function ClassItem(props) {
  const { code, name, topic, isMyClasses } = props;
  let link;
  if (isMyClasses) link = `/my-classes/${code}`;
  else link = `classrooms/${code}`;
  const history = useHistory();
  function handleClick() {
    return history.push(link);
  }
  return (
    <div
      key={code}
      className="col-xl-3 col-lg-4 col-md-6 d-flex align-items-stretch"
    >
      <div className="fcrse_1 mt-30">
        <div className="tutor_img">
          <Link to={link}>
            <img src="/images/courses/img.jpg" alt="" />
          </Link>
        </div>
        <div className="tutor_content_dt">
          <div className="tutor150">
            <Link to={link} className="tutor_name">
              {name}
            </Link>
            
          </div>
          <div className="tutor_cate">{topic}</div>
          <button className="live_link" onClick={handleClick}>
            Vào lớp học
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassItem;
