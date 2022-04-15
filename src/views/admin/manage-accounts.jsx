import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../actions/auth";
import { authHeader, logOut } from "../../helper/utils";
import Footer from "../../components/footer";
import UserRow from "../../components/admin/user-row";
function ManageAccounts() {
  const API_URL = process.env.REACT_APP_API_URL;
  const user = useSelector((state) => state.auth.currentUser);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [sort, setSort] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/users?search=${search}&sortAsc=${sort}`,
          authHeader()
        );
        if (result.data) {
          setUsers(result.data);
        }
      } catch (error) {
        console.log("err", error);
        if (error.response.status === 401) {
          const logoutAction = userLogout();
          logOut();
          dispatch(logoutAction);
        }
      }
    };
    fetchData();
  }, [sort, search, reload]);
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSort = (event) => {
    setSort(!sort);
  };
  const reloadPage = () => {
    setReload(!reload);
  };
  if (user.role === "admin")
    return (
      <div className="wrapper">
        <div className="sa4d25">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="st_title">
                  <i className="uil uil-user" /> Quản lý tài khoản
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ul className="more_options_tt">
                  <li>
                    <button
                      className={`more_items_14 ${
                        sort === true ? "active" : ""
                      }`}
                      onClick={handleSort}
                    >
                      Ngày tạo <i className="uil uil-arrow-up icon icon8" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSort}
                      className={`more_items_14 ${
                        sort === false ? "active" : ""
                      }`}
                    >
                      Ngày tạo <i className="uil uil-arrow-down icon icon8" />
                    </button>
                  </li>
                  <li>
                    <div className="explore_search">
                      <div className="ui search focus">
                        <div className="ui left icon input swdh11 swdh15">
                          <input
                            className="prompt srch_explore"
                            type="text"
                            placeholder="Tìm kiếm"
                            onChange={handleChange}
                          />
                          <i className="uil uil-search-alt icon icon8" />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div>
                  <div className="table-cerificate">
                    <div className="table-responsive">
                      <table className="table ucp-table" id="content-table">
                        <thead className="thead-s">
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Email</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">MSSV</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {users &&
                            users.map((user, index) => (
                              <UserRow
                                key={user.id}
                                user={user}
                                index={index}
                                reload={reloadPage}
                              />
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  else
    return (
      <div className="wrapper coming_soon_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="cmtk_group">
                <div className="cmtk_dt">
                  <h1 className="title_404">404</h1>
                  <h4 className="thnk_title1">Trang không tìm thấy</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ManageAccounts;
