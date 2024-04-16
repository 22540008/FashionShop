import React from "react"
import UserLayout from "../UserLayout"
import { useSelector } from "react-redux"

const Profile = () => {
  const { user } =useSelector((state) => state.auth)

  return (
    <UserLayout>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <img
              className="rounded-circle img-fluid"
              src={
                user?.avatar ? user?.avatar?.url
                : "/images/default_avatar.jpg"
              }
              alt={user?.name}
            />
          </figure>
        </div>

        <div className="col-12 col-md-5">
          <h4>Họ tên</h4>
          <p>{user?.name}</p>

          <h4>Email</h4>
          <p>{user?.email}</p>

          <h4>Số điện thoại</h4>
          <p>{user?.phone}</p>

          <h4>Địa chỉ</h4>
          <p>{user?.address}</p>
        </div>
      </div>
    </UserLayout>
  )
}

export default Profile;