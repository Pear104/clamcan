import { sAuth } from "app/stores/authStore";
import PrivateRoute from "../components/PrivateRoute";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import JobList from "../pages/JobList";
import JobDetail from "../pages/JobDetail/JobDetail";
import NormalLayout from "../layouts/NormalLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Authentication/Login/Login";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import Register from "../pages/Authentication/Register/Register";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import PageNotFound from "../layouts/PageNotFound";
import CampaignList from "../pages/Worker/CampaignManager/CampaignList";
import CampaignDetail from "../pages/Worker/CampaignManager/CampaignDetail";
import PostList from "../pages/Worker/PostManager/PostList";
import PostDetail from "../pages/Worker/PostManager/PostDetail";
import UserList from "../pages/Worker/UserManager/UserList";
import UserDetail from "../pages/Worker/UserManager/UserDetail";
import Dashboard from "../pages/Worker/Dashboard";
import Profile from "../pages/User/Profile";
import ChangePassword from "app/pages/User/ChangePassword";
import AppliedHistory from "app/pages/User/AppliedHistory";
import Favorite from "app/pages/User/Favorite";
import ProfileLayout from "app/layouts/ProfileLayout";
import CV from "app/pages/User/CV";
import Landing from "app/pages/Landing";
import WorkerAuthenticationLayout from "app/layouts/WorkerAuthenticationLayout";
import SucceedConfirm from "app/components/SucceedConfirm";
import AccountList from "app/pages/Worker/AccountManager/AccountList";
import AccountDetail from "app/pages/Worker/AccountManager/AccountDetail";
import { Role } from "app/enums/Role";
import WorkerProfile from "app/pages/Worker/WorkerProfile";
import GlobalLayout from "app/layouts/GlobalLayout";
import Play from "app/pages/Play";
import Quake from "app/pages/Quake";
import Test from "app/pages/Test/Test";
import Video from "app/pages/TestVideoChat/Video";
import LabelList from "app/pages/Worker/LabelManager";
import PlayList from "app/pages/PlayList";

export default function MainRoutes() {
  const auth = sAuth.use();
  return (
    <>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="/">
            <Route path="/" element={<NormalLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="video" element={<Video />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/:id" element={<JobDetail />} />
              <Route path="play" element={<PlayList />} />
              <Route path="playId" element={<Play />} />
            </Route>
            <Route
              path="profile"
              element={
                <PrivateRoute
                  allowedRoles={[Role.USER]}
                  redirectUrl="/auth/login"
                  children={<ProfileLayout />}
                />
              }
            >
              <Route path="" element={<Profile />} />
              <Route path="cv" element={<CV />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="applied-history" element={<AppliedHistory />} />
              <Route path="favorite" element={<Favorite />} />
            </Route>

            <Route
              path="auth"
              element={
                auth?.isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <AuthenticationLayout />
                )
              }
            >
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="reset-password"
                element={<ResetPassword endpoint={"reset"} />}
              />
            </Route>
          </Route>

          <Route path="worker">
            <Route
              path=""
              element={
                <PrivateRoute
                  allowedRoles={[Role.ADMIN, Role.MANAGER, Role.INTERVIEWER]}
                  redirectUrl="/worker/auth/login"
                  children={<DashboardLayout />}
                />
              }
            >
              <Route path="" element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="campaigns">
                <Route path="" element={<CampaignList />} />
                <Route path=":id" element={<CampaignDetail />} />
              </Route>
              <Route path="posts">
                <Route path="" element={<PostList />} />
                <Route path=":id" element={<PostDetail />} />
              </Route>
              <Route path="labels" element={<LabelList />} />
              <Route
                path="accounts"
                element={
                  <PrivateRoute
                    allowedRoles={[Role.ADMIN, Role.MANAGER]}
                    redirectUrl="/worker"
                    children={<Outlet />}
                  />
                }
              >
                <Route path="" element={<AccountList />} />
                <Route path=":id" element={<AccountDetail />} />
              </Route>
              <Route
                path="users"
                element={
                  <PrivateRoute
                    allowedRoles={[Role.ADMIN, Role.MANAGER, Role.INTERVIEWER]}
                    redirectUrl="/worker"
                    children={<Outlet />}
                  />
                }
              >
                <Route path="" element={<UserList />} />
                <Route path=":id" element={<UserDetail />} />
              </Route>
              <Route path="profile" element={<WorkerProfile />} />
              <Route
                path="profile/change-password"
                element={<ChangePassword />}
              />
            </Route>

            <Route
              path="auth"
              element={
                auth?.isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <WorkerAuthenticationLayout />
                )
              }
            >
              <Route path="login" element={<Login worker={true} />} />
              <Route
                path="reset-password"
                element={<ResetPassword worker={true} />}
              />
            </Route>
          </Route>
        </Route>

        <Route path="/test" element={<Test />} />

        <Route path="/landing" element={<Landing />} />
        <Route path="/succeed-confirm" element={<SucceedConfirm />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
